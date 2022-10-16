<template>
  <div class="form">
    <form @submit.prevent="update">
      <h2 class="msg">Edit Profile!</h2>
      <o-field>
        <o-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Full Name"
          required="true"
          >
        </o-input>
      </o-field>
      <o-field>
        <o-input
          id="email"
          v-model="email"
          type="text"
          placeholder="Email Address"
          required="true"
          >
        </o-input>
      </o-field>
      <div id="centre">
        <button @click="profile">SAVE CHANGE</button>
      </div>
      <h4 id="back" @click="goToProfile()">BACK TO MY PROFILE</h4>
      <div class="error" v-if="err">{{err}}</div>
    </form>
  </div>
</template>

<script>
import ProfileService from '@/services/profileService'
import { userStore } from '@/store/store'
export default {
  name: "EditProfileForm",
  components: { },
  setup() {
        const store = userStore();
        return { store };
  },
  data() {
    return {
      name: "",
      email: "",
    };
  },
  methods: {
    async profile() {
      try {
          const r = await ProfileService.profile({
            username: this.name,
            id: this.store.user.user_id,
            email: this.email
          })
          await this.store.setUser(r.data.user)
          alert("Profile updated")
          this.$router.push("/search")
                
        } catch (err) {
          console.log(err)
        }
    },
    goToProfile() {
      this.$emit('backed', true);
    },
  },
};
</script>

<style scoped>
.form {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  text-align: center;
  width: 30%;
  border-radius: 20px;
  padding: 30px 90px 0px 90px;
  background-color: #FCF5E8;
}
.o-input,
.o-row {
  margin-bottom: 10px;
  justify-content: center;
}
.msg {
    font-weight: bold;
    font-size: 30pt;
    margin: 0px;
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
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffc400;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
}
#centre {
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  font-weight: bold;
  margin-top: 10px;
  font-family: "Nunito Sans", sans-serif;
}
h4:hover {
  cursor: pointer;
}
#logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
.error {
    margin: 0 auto;
    font-size: 15px;
    color: red;
    font-weight: bold;
}
</style>
