<template>
  <div class="home">
    <HeaderBar2>
      <template #header>
        <div>
          <router-link to="/">
            <img class="logo" alt="When2Block Logo" src="../assets/logo.png" />
          </router-link>
        </div>
      </template>
      <template #button>
        <div class="button-div">
          <o-button class="button" @click="register" size="medium">
            {{button1}}
          </o-button>
          <o-button class="button" @click="login" size="medium">
            {{button2}}
          </o-button>
        </div>
      </template>
    </HeaderBar2>
    <Home />
  </div>

</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue';
import HeaderBar2 from '@/components/HeaderBar2.vue';

export default {
  name: 'HomeView',
  components: { Home, HeaderBar2 },
  methods: {
    register() {
      this.$router.push({ name: "register" })
    },
    login() {
      this.$router.push({ name: "login" })
    }
  },
  data() {
    return {
      button1: 'Register',
      button2: 'Login'
    }
  }
}
</script>

<style scoped>
.button {
  margin: 15px;
  border-radius: 5px;
  background-color: rgb(241, 99, 9);
  color: white;
  border-color: rgb(241, 99, 9);
  border: none;
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
  padding-top: 60px;
  object-fit: cover;
  width: 500px;
  display: flex;
  justify-content: center;
}

.button-div {
  position: absolute;
  right: 5px;
  top: 10px;
}
</style>