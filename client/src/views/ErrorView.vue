<template>
  <div class="home">
    <HeaderBar />
    <div class="error-msg">
      <div class="container"></div>
      <h1 class="header1">Error!</h1>
      <h1 class="header2">The page you're looking for doesn't exist!</h1>
      <div class="button-div">
        <o-button class="button" @click="home">BACK TO HOME</o-button>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';

export default {
  components: {
    HeaderBar
  },
  methods: {
    home() {
      this.$router.push({ name: "about" })
    }
  },
  data() {
    return {
      button: 'BACK TO HOME'
    }
  }
}
</script>

<style scoped>
.error-msg {
  align-items: center;
}

.header1 {
  font-weight: 700;
  font-size: 70px;
  text-align: center;
  margin: 3px;
}

.container {
  height: 150px;
}

.button {
  background-color: #F16308;
  margin: 15px;
  right: 5px;
  border-radius: 25px;
  width: 250px;
  height: 60px;
  font-size: 20px;
  border: none;
  font-family: "Nunito Sans", sans-serif;
}

.button:hover {
  background: #ffcc00;
  color: black;
  cursor: pointer;
}

.button:focus {
  outline: none;
}
</style> 