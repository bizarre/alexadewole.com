<template>
  <Focused>
    <div class="flex flex-wrap p-5 mb-10 md:mb-40">
      <div class="m-auto w-full lg:w-10/12">
        <div id="post" class="flex flex-wrap md:justify-center">
          <div class="text-center leading-tight relative w-full text-gray-700">
            <g-link to="/blog">
              <jam-close class="absolute md:fixed left-0 top-0 md:m-10 w-12 h-12 fill-current opacity-50 transition duration-300 hover:opacity-75"></jam-close>
            </g-link>
            <h2 class="text-2xl text-gray-800">{{ $page.post.date }}</h2>
            <h1 class="text-4xl text-gray-500 light:text-black">{{ $page.post.title }}</h1>
          </div>
          <div class="flex w-full justify-center">
            <div class="prose text-gray-500 light:text-gray-700 mt-5 md:mt-10 w-full" v-html="$page.post.content" />
          </div>
        </div>
      </div>
    </div>
  </Focused>
</template>

<script>
export default {
  metaInfo () {
	 return { title: this.$page.post.title }
  }
}
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "dddd, MMMM Do, YYYY")
    description
    content
  }
}
</page-query>