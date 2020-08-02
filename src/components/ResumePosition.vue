<template>
    <div class="leading-tight mt-2 mb-6 md:mt-0 md:mb-10">
        <h1 :style="{color: position.color}" class="text-xl md:text-2xl">{{ position.org }}</h1>
        <h2 class="text-lg md:text-xl text-gray-600">{{ position.position }}</h2>
        <h3 class="text-lg md:text-xl text-gray-800">{{ position.period }}</h3>
        <div v-html="position.content" v-if="position.content" class="prose text-gray-400 light:text-gray-600 w-full mt-4"></div>
    </div>
</template>

<script>
export default {
    props: ['position']
}
</script>