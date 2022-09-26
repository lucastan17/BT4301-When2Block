<template>
  <HeaderBar />
  <!-- <HeaderBar2 /> -->
</template>

<script>
// import HeaderBar2 from './components/HeaderBar2.vue';
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    // HeaderBar2,
    HeaderBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
