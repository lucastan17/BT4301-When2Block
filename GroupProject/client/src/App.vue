<template>
  <!--HelloWorld msg="Welcome to Your Vue.js App"/-->
  <HeaderBar2/>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderBar2 from './components/HeaderBar2.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HeaderBar2
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
