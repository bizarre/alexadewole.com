<template>
    <div class="w-full flex mt-1 md:mt-10 flex-wrap">
        <h1 class="text-xl md:w-3/12 md:text-2xl text-gray-500 md:ml-auto light:text-gray-800">{{ section.name }}</h1>
        <div class="md:w-7/12">
            <resume-position v-for="position in section.positions" :key="position.id" :position="position"></resume-position>
        </div>
    </div>
</template>

<script>
import ResumePosition from './ResumePosition'

export default {
    components: { ResumePosition },
    props: ['section']
}
</script>