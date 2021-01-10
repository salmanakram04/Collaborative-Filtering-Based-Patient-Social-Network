<template>
  <div>
    <site-header />
    <nuxt />
    <site-footer />
  </div>
</template>

<script>

import site_header from '@/components/website/header.vue'
import site_footer from '@/components/website/footer.vue'
export default {
  components: {
    "site-header": site_header,
    "site-footer": site_footer
  }
}
</script>

<style>
</style>
