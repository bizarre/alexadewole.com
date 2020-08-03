---
title: Replays in Minecraft
description: I describe how I designed and implemented player replays in the scope of a Minecraft server.
date: 2020-06-27
published: true
---
I was recently tasked with creating a system within [Bukkit](https://hub.spigotmc.org/javadocs/spigot/) that would allow players to playback "replays" of their fights.

Before starting on this project, I knew that I needed a medium to actually *replay* a player's actions. Specifically, I needed something that would allow me to spawn and control my own [NPC](https://en.wikipedia.org/wiki/Non-player_character)'s. 

The simplest drop-in library/plugin that would've filled this role is [Citizens](https://github.com/CitizensDev/Citizens2). Citizens is described as "the premier plugin and API for creating server-side NPCs in Minecraft"

This is *mostly* true, however, like most public/open-source software -- it's built to encompass a wide array of use-cases, and a large portion of Citizens' features were things we didn't need. 

*I also, kind of, just wanted to make an NPC library...*

I won't delve too much into how this library works (as this post is specifically about the replay system), but it involved a lot of obfuscated Minecraft server code (NMS). It wrapped all the ugly obfuscated code into a neat OOP API and let me run logic specific to an NPC, *such as replaying a player's actions*.

## Recording
I recorded a player's actions in two ways: packet interception and event listeners. In retrospect, I *could* have got away using only event listeners but intercepting packets *was* a little faster. A recordable player action, `ReplayableAction` in code, represented a single player-originating action that could be re-enacted on a `Bot`.


```java
/**
 * Represents a recorded player action that can
 * be replayed on a specified {@link Bot} at a later time
 */
public interface ReplayableAction {

    /**
     * Replays the recorded action on the specified bot.
     * @param bot the bot to replay the action on
     */
    void replay(@NotNull Bot bot);

}
```

Anything that a player did during a fight that we wanted to record + replay had a corresponding implementation of `ReplayableAction`. There was one for movement, animations, meta (such as sneaking or sprinting) and more.

Here is an implementation of `ReplayableAction` for when a player died:

```java
public class PlayerDeathEventAction extends ReplayableEventAction<PlayerDeathEvent> {

    /**
     * Replayable actions are constructed using a {@link Event} type
     * where values are extrapolated to be used later in {@link #replay(Bot)}
     *
     * @param event an instance of {@link PlayerDeathEvent}
     */
    public PlayerDeathEventAction(PlayerDeathEvent event) {
        super(event);
    }

    @Override
    public void replay(@NotNull Bot bot) {
        bot.setHealth(0);
    }

}
```

`ReplayableAction`'s were then grouped together into a frame. This was important because it was possible for a player to commit more than one action in quick succession (<100ms). These frames were then mapped to an integer representing a timestamp that was relative to the time the recording started.

```rust
// pseudo structure of a recording
recording: {
  0: [player left-clicked, player crouched],
  24: [player uncrouched],
  39: [player started sprinting, player moved to x,y,z],
  90: [player stopped sprinting]
}
```

## Playback
Each `ReplayableAction` exposed a `#replay(Bot)` function that made playback relatively simple. I created a type that essentially served as a queue against the previously recorded frames. Playback started by spawning an `NPC` with logic that would poll the frame queue to get a frame. Each time the queue was polled, a timestamp variable, `x`, would be incremented by 1. `x` was in the same time space as the mapped frames so the rate of playback matched the rate of recording.

Everytime the `Bot` logic received a frame, it would iterate over the embedded `ReplayableActions`'s and invoke the respective `#replay(Bot)` function.

Because of `x`, players were also able to skip forward or backwards in time during playback. Introducing a `paused:bool` variable that would prevent the queue from incrementing `x` also allowed players to pause.


> <video style="width: 100%; max-height: 100%;" src="https://imgur.com/7D6JmbV.mp4" muted autoplay loop /> 

<p style="text-align: center;">Skipping forwards, backwards and pausing playback.</p>

That's about everything related to playback. One thing to note, though, is that **each replay is essentially a collection of player-specific recordings**. No recording is dependant on another, so we could play back one player in a fight and see them taking damage from an invisible source -\- *It's kinda cool*.

> <video style="width: 100%; max-height: 100%;" src="https://imgur.com/8T3YvyC.mp4" muted autoplay loop />

<p style="text-align: center;">A replay consisting of only <strong>one</strong> player in a fight</p>

## Persisting Replays
Okay, we've got recording and playback done, but now we need to actually save the replays so they can be played back after the server reboots. 

My first instict was to just serialize the recordings to JSON and throw them into [Mongo](https://www.mongodb.com).

But... replays could consist of **tens of thousands** of frames, and the J/BSON structure introduced a ton of extra bloat that increased the size. On top of that, there was the additional overhead of parsing huge fucking J/BSON<sup>[1](#1)</sup> documents and the extra time of transfering this data.

Our use-case was pretty specific in that we only needed replays to be played back on a single stateful machine/server. This meant that we could consider solutions that only made saved replays accessible *locally*. 

I opted, then, to create a custom [file format](https://en.wikipedia.org/wiki/File_format) specifically for replays and store them on the machine's drive. So, instead of writing/parsing to/from J/BSON, I could write (non UTF) bytes directly to a file. Unfortunately, it also meant that I had to manually write writers and parsers for each `ReplayableAction`.

I introduced a `#write(DataOutputStream)` function to the `ReplayableAction` interface:

```java
  /**
    * Writes this action to a ${@linkplain DataOutputStream stream}.
    * @param stream the stream to write to
    * @throws IOException if stream fails to be written to
    */
  void write(@NotNull DataOutputStream stream) throws IOException;
```

This made each implemention of `ReplayableAction` responsible for writing itself to a stream and kept things a little cleaner. After implementing that function for all the action types, I started on the reading stuff. I'll go more into the details of the custom file format's specification in a bit, but specifically for `ReplayableActions`:

I decided to create an [Enum](https://en.wikipedia.org/wiki/Enumerated_type){:target="_blank"} with variants bound to a specific `ReplayableAction` type and a functional type that would use an input stream as context. *This also had the added benefit of letting me write a single byte representing an action type (the ordinal of the variant) instead of the fully qualified String name of the class or implementing some other identifieer.*

The structure of this was more or less like this:
```java
public interface Provider<T> {
    T get(DataInputStream stream) throws IOException;
}

public enum ReplayableActionType {
  ...
  DAMAGE(stream -> new EntityDamageEventAction(stream.readInt())),

  private Provider<? extends ReplayableAction> provider;

  <T extends ReplayableAction> ReplayableActionType(Provider<T> provider) {
    this.provider = provider;
  }

}
```

However, there's still some extra data outside of the `ReplayableAction`'s that need to be stored. I'm not going to go too much into how they're written/read but I will outline the file format spec:

>
*File Header*

>| byte count&nbsp;      | description                              | value |
|-----------------|------------------------------------------|-------|
| 1 byte          | magic                                    | 0xf   |
| 2 bytes         | (ushort) length of bytes in replay id     &nbsp;| ?     |
| ? bytes         | UTF-8 replay id                          | ?     |

>*File Content*

>| byte count&nbsp; | description           | value |
|------------|-----------------------|-------|
| 1 byte          | (ubyte) number of recordings in this replay&nbsp;         | ?     |
| ? bytes    | \<array of recordings\>&nbsp; | ?     |

>*Recording Element*

>| byte count&nbsp; | description                                   | value |
|------------|-----------------------------------------------|-------|
| 8 bytes    | (ulong) most significant bits of player uuid  | ?     |
| 8 bytes    | (ulong) least significant bits of player uuid&nbsp; | ?     |
| 4 bytes    | (uint) length of recording (in milliseconds)  | ?     |
| 4 bytes    | (uint) amount of frames in this recording     | ?     |
| ? bytes    | \<array of frames\>                             | ?     |

>*Frame Element*

>| byte count&nbsp; | description                            | value |
|------------|----------------------------------------|-------|
| 8 bytes    | (ulong) timestamp of this frame        | ?     |
| 4 bytes    | (uint) amount of actions in this frame&nbsp; | ?     |
| ? bytes    | \<array of actions\>                     | ?     |

>*Action Element*

>| byte count&nbsp; | description                                                     | value |
|------------|-----------------------------------------------------------------|-------|
| 1 byte     | ordinal of the enum variant for this action&nbsp; | ?     |
| ? bytes    | extra data specific to this action type                         | ?     |

## Conclusion
All-in-all this was an extremely fun project to work on. In hindsight there's a couple things I would do differently, like not using packet interception for actions, throwing the binary `.replay` file in MongoDB, etc. There's one *slight* caveot with my design though:

Essentially each recorded player is on their own track. Frames are recorded and timestamped relative to when the recorder started. The difference in time (due to server performance or other factors) between starting the recorder for x amount of players in a fight can be enough to offset their tracks so that when they're played back they're out of sync. The solution to this would be to use a metric that isn't relative to each track (such as unix epoch) to find the time difference and re-align all the tracks. I initially implemented the recorders to use unix epoch as the key for frames but having to reindex them and convert to ticks, etc introduced a ton of overhead and wasted computation.

I plan on writing more posts like this. I write a lot of code and I want to look back on this blog five years from now and see how far I've come *(or not come)*. 


<h1 style="opacity: 0; height: 0; margin: 0;" id="1">1</h1>
<small style="opacity: 0.5">1. Yes, I know it's possible to store binary content inside MongoDB. If our requirements were different and we needed replays to be accessible externally then this is what I would've done. Although, in retrospect, I probably should've done this anyways and just run the Mongo server locally, that way we could switch to a remote database in the future (if we wanted/needed to) without any code changes.