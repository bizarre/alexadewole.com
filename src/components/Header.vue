<template>
    <div class="flex flex-col-reverse md:flex-row justify-between w-full">
        <div>
            <h1 class="text-2xl text-white font-medium light:text-black">{{ $static.metadata.name }}</h1>
            <h2 class="text-gray-400">{{ $static.metadata.tagline }}</h2>
        </div>
        <ul class="flex pb-2 md:pb-0 text-gray-400 font-bold uppercase tracking-widest text-sm items-start">
            <g-link to="/" tag="li" class="transition opacity-25 light:opacity-50 duration-200 hover:opacity-75 cursor-pointer">About me</g-link>
            <g-link to="/blog" tag="li" class="ml-4 transition opacity-25 light:opacity-50 duration-200 hover:opacity-75 cursor-pointer">Blog</g-link>
            <g-link to="/resume" tag="li" class="ml-4 transition opacity-25 light:opacity-50 duration-200 hover:opacity-75 cursor-pointer">Resume</g-link>
        </ul>
    </div>
</template>

<static-query>
query {
  metadata {
    name
    tagline
  }
}
</static-query>

<style scoped>
li.active--exact {
    opacity: 0.8;
}
</style>