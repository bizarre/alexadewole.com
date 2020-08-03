<template>
    <g-link :to=stub.path tag="div" class="mt-10 cursor-pointer transition duration-300 hover:opacity-75 w-full">
        <div>
            <div class="flex justify-between">
                <h1 class="text-gray-500 light:text-gray-700 text-2xl">{{ stub.title }}</h1>
                <h1 class="text-lg md:text-2xl text-gray-700 light:text-gray-600">{{ stub.date }}</h1>
            </div>
            <p class="text-gray-600 md:w-1/2 mt-1">{{ stub.description }}</p>
        </div>
    </g-link>
</template>

<script>
export default {
    props: ['stub']
}
</script>