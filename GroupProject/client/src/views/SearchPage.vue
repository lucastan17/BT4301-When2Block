<template>
  <div class="home">
    <searchoverlay />
  </div>
</template>

<script>
// @ is an alias to /src
import searchoverlay from '@/components/SearchOverlay.vue';

export default {
  name: 'SearchPage',
  components: {
    searchoverlay
  }
}
</script>
