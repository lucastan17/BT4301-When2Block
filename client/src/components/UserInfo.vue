<template>
    <section class="hero">
      <div id="profile-div">
        <h3 class="profile-info">{{ name }}</h3>
        <h3 class="profile-info">{{ email }}</h3>
        <h3 class="profile-info">Singapore {{ postalcode }}</h3>
        <button @click="goToEdit()">EDIT PROFILE</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "CustInfo",
    data() {
      return {
        name: "",
        email: "",
        postalcode: "",
      };
    },
    props: {
      user: Object,
    },
    methods: {
      goToEdit() {
        this.$router.push("./EditCustomerParticulars");
      },
    },
    created() {
      this.name = this.user.name;
      this.email = this.user.email;
      this.postalcode = this.user.postalcode;
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
  