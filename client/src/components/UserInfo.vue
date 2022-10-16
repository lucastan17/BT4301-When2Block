<template>
    <section class="hero">
      <div id="profile-div">
        <h1 class="msg">Your Profile</h1>
            <o-field label="Username">
        <h3 class="profile-info">{{ username }}</h3>
            </o-field>
            <o-field label="Email">
        <h3 class="profile-info">{{ email }}</h3>
            </o-field>
            <o-field label="Latest Survey Response">
        <h3 class="profile-info" v-if="loaded">Sunscreen frequency: {{ sunscreen_freq }}, Skin type: {{ skin_type }}</h3>
            </o-field>
        <button @click="goToEdit()">EDIT PROFILE</button>
        <button @click="redoSurvey()">REDO SURVEY</button>
        <button @click="changePw()">CHANGE PASSWORD</button>
      </div>
    </section>
  </template>
  
  <script>
import { userStore } from '@/store/store'
import SurveyService from '@/services/surveyService'

  export default {
    name: "CustInfo",
    setup() {
        const store = userStore();
        return { store };
      },
    data() {
      return {
        username: "",
        email: "",
        loaded: false,
        sunscreen_freq:"",
        skin_type: "",
        editting: null,
        user_id: null,
        //user_id: this.store.user.user_id
      };
    },
    props: {
      user: Object,
    },
    methods: {
      goToEdit() {
        this.$emit('clicked', true);
      },
      async survey() {
        try {
          const response = await SurveyService.answer(this.store.user)
          console.log(response.data.answer)
          this.loaded = true
          this.sunscreen_freq = response.data.answer.sunscreen_freq
          this.skin_type = response.data.answer.skin_type
        } catch (err) {
          console.log(err.response.data.error)
        }
      }
    },
    created() {
      this.username = this.store.user.username;
      this.email = this.store.user.email;
      this.editting = false;
      this.survey()
      } 
    };

  </script>
  <style scoped>

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
    font-weight: 1;
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
    background: #F16308;
    color: black;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  </style>
  