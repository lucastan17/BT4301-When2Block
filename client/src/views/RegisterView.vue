<template>
  <div class="home">
    <HeaderBar2>
      <template #logo>
        <div class="border align-items-">
          <router-link to="/">
            <img class="logo" src="../assets/logo.png" />
          </router-link>
        </div>
      </template>
      <template #header>
        <div id="header">
          <h3>{{header}}</h3>
        </div>
      </template>
      <template #button>
        <o-button class="button" @click="login">{{button}}</o-button>
      </template>
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
  components: { HeaderBar2, Register },
  methods: {
    login() {
      this.$router.push({ name: "login" })
    }
  },
  data() {
    return {
      header: 'Register',
      button: 'Login'
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

.logo {
    width: 15%;
    position: absolute;
    top: 20px;
    left: 20px;
}

#header {
    color: white;
    margin: 15px;
    display: flex;
    font-size: 40px;
    padding-top: 50px;
}
</style>
