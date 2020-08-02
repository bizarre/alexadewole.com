<template>
    <Layout>
        <div class="flex flex-wrap w-full">
            <post-stub v-for="edge in $page.posts.edges" :key="edge.node.id" :stub="edge.node"/>
        </div>
    </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true } }, sortBy: "date", order: DESC) {
    edges {
      node {
        id
        title
        date(format: "MMMM D, YYYY")
        description
        path
      }
    }
  }
}
</page-query>

<script>
import PostStub from '~/components/PostStub'

export default {
  components: { PostStub },
  metaInfo: {
    title: 'Blog'
  }
}
</script>