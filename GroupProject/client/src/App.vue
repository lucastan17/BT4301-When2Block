<template>
  <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
  <HeaderBar/>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderBar from './components/HeaderBar.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
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
