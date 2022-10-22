<template>
  <div class="home">
    <HeaderBar2>
      <template #logo>
        <div class="align-items-">
          <router-link to="/">
            <img class="logo" src="../assets/logo.png" />
          </router-link>
        </div>
      </template>
      <template #header>
        <div id="header">
          <h1 class="header-content">{{header}}</h1>
        </div>
      </template>
      <template #button>
        <o-button class="button" @click="login" size="medium">{{button}}</o-button>
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
  margin: 15px;
  position: absolute;
  right: 5px;
  background-color: rgb(241, 99, 9);
  color: white;
  top: 10px;
  border: 0px;
}

.button:hover {
  background: #ffcc00;
  color: black;
  cursor: pointer;
}

.button:focus {
  outline: none;
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
  font-size: 70px;
  padding-top: 50px;
}

.header-content {
  display: inline-block;
  align-self: flex-end;
  font-weight: bold;
  font-size: 40pt;
}
</style>
