<template>
    <div class="profile">
        <div class="container">
          <h1 class="msg">Your Profile</h1>
        </div>
      <div class="grid">
        <div class="content">
          <h2 class="username">Username</h2>
        </div>
        <div class="content">
          <b>{{ username }}</b>
        </div>
        <div class="content">
          <h2 class="email">Email Address</h2>
        </div>
        <div class="content">
          <b>{{ email }}</b>
        </div>
        <div class="content">
          <h2 class="survey">Latest Survey Response</h2>
        </div>
        <div class="content">
          <p> Sunscreen frequency: <b v-if="loaded">{{ sunscreen_freq }} </b></p>
          <p> Skin type: <b v-if="loaded">{{ skin_type }} </b></p>
        </div>

        </div>
        <button @click="goToEdit()">EDIT PROFILE</button> 
        <button @click="changePw()">CHANGE PASSWORD</button> 
        <button @click="redoSurvey()">REDO SURVEY</button>
      </div>
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
      };
    },
    methods: {
      goToEdit() {
        console.log("go to edit")
        this.$emit('clicked', true, false);
      },
      changePw() {
        this.$emit('clicked', false, true);
      },
      redoSurvey() {
        this.$router.push("/survey")
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

  .profile {
  text-align: center;
  width: 70%;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px 50px 20px 50px;
  background-color: #FCF5E8;
  }

  .grid {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 2px;
  }

  .content {
  display: flex;
  justify-content: center;
  align-content: left;
  flex-direction: column;
  }

  button {
  background-color: #F16308;
  border: none;
  margin-right: 10px;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffcc00;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
.msg {
  color: white;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 0;
}
.container {
  font-family: var(--font-family-epilogue);
  text-align: center;
      background-color: #F16308;
      width: 25%;
      height: 100%;
      border-radius: 20px;
      padding: 1px 1px 1px 1px;
      margin: auto;
}

.username, .email, .survey {
  font-size: 20px;
  float: left;
  font-weight: 700;
  color: #ffc400;
}
.content {
  float: left;
}
  </style>
  