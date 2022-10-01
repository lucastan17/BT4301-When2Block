<template>
  <div class="home">
    <HeaderBar2 title="Register">
      <o-button class="button" @click="login">Log In</o-button>
    </HeaderBar2>
    <br />
    <Register />
  </div>
</template>

<script>
import HeaderBar2 from '@/components/HeaderBar2.vue';
import Register from '../components/Register.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderBar2,
    Register
  },
  methods: {
    login() {
      this.$router.push({ name: "login" })
    }
  }
}
</script>

<style scoped>
.button {
  background-color: #F16308;
  margin: 15px;
  border-radius: 5px;
  position: absolute;
  right: 10px;
}
</style>
