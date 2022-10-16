<template>
<HeaderBar></HeaderBar>
  <div class="home">
    <searchoverlay />
  </div>
</template>

<script>
// @ is an alias to /src
import searchoverlay from '@/components/SearchOverlay.vue';
import HeaderBar from '../components/HeaderBar.vue';

export default {
  name: 'SearchPage',
  components: {
    searchoverlay,
    HeaderBar
  }
}
</script>
