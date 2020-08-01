<template>
    <div class="flex justify-between w-full">
        <div>
            <h1 class="text-2xl text-white font-medium">{{ $static.metadata.name }}</h1>
            <h2 class="text-gray-500">{{ $static.metadata.tagline }}</h2>
        </div>
        <ul class="flex text-gray-500 font-bold uppercase tracking-widest text-sm items-start">
            <g-link to="/" tag="li" class="transition duration-200 hover:opacity-50 cursor-pointer">About me</g-link>
            <g-link to="/blog" tag="li" class="ml-4 transition duration-200 hover:opacity-50 cursor-pointer">Blog</g-link>
            <g-link to="/resume" tag="li" class="ml-4 transition duration-200 hover:opacity-50 cursor-pointer">Resume</g-link>
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
li {
    opacity: 0.25;
}

li.active--exact {
    opacity: 0.8;
}
</style>