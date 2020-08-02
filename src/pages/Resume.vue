<template>
  <Layout>
    <div class="flex w-full flex-wrap mt-6 md:mt-0">
      <resume-section v-for="edge in $page.sections.edges" :key="edge.node.id" :section="edge.node"/>
    </div>
  </Layout>
</template>

<page-query>
query {
	sections: allSection(sortBy: "weight", order: ASC) {
    edges {
      node {
        id
        name
        weight
        positions {
          id
          org
          position
          period
          color
          content
        }
      }
    }
  }
}
</page-query>

<script>
import ResumeSection from '~/components/ResumeSection'

export default {
  components: { ResumeSection },
  metaInfo: {
    title: 'Resume'
  }
}
</script>

<style>
</style>
