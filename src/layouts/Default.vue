<template>
  <div class="w-full flex">
    <div class="p-4 w-full md:w-2/3 md:m-auto md:px-0 md:pt-40">
      <site-header/>
      <slot/>
    </div>
  </div>
</template>

<script>
import SiteHeader from '~/components/Header'

export default {
  components: { SiteHeader }
}
</script>

<style>
body {
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(155.36deg, #11101D 28.15%, #142124 59.77%, #1C1D10 91.4%);
}

@media(prefers-color-scheme: light) {
  body {
    background: linear-gradient(155.36deg, #F2F1FF 28.15%, #EDFCFF 62.08%, #FEFFE2 91.4%)
  }
}
</style>
