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
          <o-button class="button" @click="register">
            {{button}}
          </o-button>
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
    }
  },
  data() {
    return {
      button: 'Register/ Login'
    }
  }
}
</script>

<style scoped>
.button {
    background-color: #F16308;
    margin: 15px;
    border-radius: 25px;
    width: 330px;
    height: 72px;
    font-size: 32px;
    position: absolute;
    right: 20px;
}

.logo {
    padding-top: 60px;
    object-fit: cover;
    width: 500px;
    display: flex;
    justify-content: center;
}
</style>