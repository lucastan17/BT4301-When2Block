<template>
  <div class="home">
    <About />
  </div>
  
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue';

export default {
  name: 'AboutView',
  components: {
    About,
  }
}
</script>