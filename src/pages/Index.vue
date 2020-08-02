<template>
  <Layout>
    <div class="flex flex-wrap flex-col-reverse md:flex-row">
      <div class="text-gray-500 light:text-gray-700 md:w-1/2 mt-6 md:mt-10">
        <div class="prose text-gray-500 light:text-gray-700" v-html="$page.bio.content"/>
        <div class="mt-6 mb-3 md:mb-0 flex text-gray-700">
          <a :href="`https://twitter.com/${$page.metadata.social.twitter}`" class="opacity-50 hover:opacity-100 transition duration-200">
            <jam-twitter class="fill-current"/>
          </a>
          <a :href="`https://github.com/${$page.metadata.social.github}`" class="ml-3 opacity-50 hover:opacity-100 transition duration-200">
            <jam-github class="fill-current"/>
          </a>
          <a :href="`https://linkedin.com/in/${$page.metadata.social.linkedin}`" class="ml-3 opacity-50 hover:opacity-100 transition duration-200">
            <jam-linkedin class="fill-current"/>
          </a>
          <a :href="`mailto:${$page.metadata.social.email}`" class="ml-3 opacity-50 hover:opacity-100 transition duration-200">
            <jam-paper-plane class="fill-current"/>
          </a>
        </div>
      </div>
      <div class="flex-1 flex justify-center select-none pointer-events-none md:ml-10">
        <picture class="w-2/3 mt-6 md:w-auto md:mt-0">
          <source 
            srcset="dark.jpg" 
            media="(prefers-color-scheme: dark)">
          <img src="light.jpg">
        </picture>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
	bio: about(path: "/content/about") {
    content
  }

  metadata {
    social {
      twitter
      github
      linkedin
      email
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About Me'
  }
}
</script>

<style>
</style>
