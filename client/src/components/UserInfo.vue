<template>
    <section class="hero">
      <div id="profile-div">
        <h3 class="profile-info">{{ name }}</h3>
        <h3 class="profile-info">{{ email }}</h3>
        <button @click="goToEdit()">EDIT PROFILE</button>
      </div>
    </section>
  </template>
  
  <script>
import profileService from '@/services/profileService'

  export default {
    name: "CustInfo",
    data() {
      return {
        name: "",
        email: "test@gmail.com",
        editting: null,
      };
    },
    props: {
      user: Object,
    },
    methods: {
      goToEdit() {
        this.$emit('clicked', true);
      },
      async getInfo() {
        try {
          const response = await profileService.index({
            email: this.email,
            username: this.username
          })
          console.log(response.data)
          response.data
        }
        catch (err) {
                console.log(err.response.data.error)
                this.err = err.response.data.error
                console.log("err: " + this.err)
            }
      }
    },
    created() {
      this.editting = false;
    },
  };
  </script>
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&display=swap");
  * {
    font-family: "Nunito Sans", sans-serif;
  }
  .hero {
    margin-top: 100px;
  }
  #profile-div {
    text-align: center;
  }
  #logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 30%;
  }
  .profile-info {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  button {
    margin: auto;
    margin-top: 10px;
    background-color: #ffcc00;
    border: none;
    color: black;
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
  }
  button:hover {
    background: #ffc400;
    color: black;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  </style>
  