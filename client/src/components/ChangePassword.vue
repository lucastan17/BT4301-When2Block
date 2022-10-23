<template>
  <div class="form">
    <form @submit.prevent="update">
      <h2 class="msg">Change Password</h2>
      <br />
      <o-field>
        <o-input
          id="password"
          v-model="password"
          type="password"
          placeholder="Current Password"
          required="false"
          ><template #prefix>
            <o-icon pack="fas" icon="user" size="small"></o-icon> </template
        ></o-input>
      </o-field>
      <o-field>
        <o-input
          id="npassword"
          v-model="newpassword"
          type="password"
          placeholder="New Password"
          required="false"
          ><template #prefix>
            <o-icon pack="fas" icon="user" size="small"></o-icon> </template
        ></o-input>
      </o-field>
      <o-field>
        <o-input
          id="repassword"
          v-model="repassword"
          type="password"
          placeholder="Retype New Password"
          required="false"
          ><template #prefix>
            <o-icon pack="fas" icon="user" size="small"></o-icon> </template
        ></o-input>
      </o-field>
      <div id="centre">
        <button type="submit" @click="updatepw()">SAVE</button>
      </div>
      <div class="error" v-if="err">{{err}}</div>
      <h4 id="back" @click="goToProfile()">BACK TO MY PROFILE</h4>
    </form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/authService'
import ProfileService from '@/services/profileService'
import { userStore } from '@/store/store'

export default {
  name: "ChangePassword",
  setup() {
        const store = userStore();
        return { store };
  },
  components: { },
  data() {
    return {
      password: "",
      newpassword: "",
      repassword: "",
      err: "",
      can: false
    };
  },
  methods: {
    async check() {
      try {
        const response = await AuthenticationService.login({
            email: this.store.user.email,
            password: this.password
        })
        console.log(response.data)
        if (this.newpassword != this.repassword) {
          this.err = "New password do not match"
        } else if (this.newpassword.length < 8) {
          this.err = "New password must be at least 8 characters"
        } else {
          this.can = true
        }

      } catch (err) {
          console.log(err.response.data.error)
          this.err = err.response.data.error
          console.log("err: " + this.err)
      }

    },
    async changepw() {
      if (this.can) {
        try {
            const r = await ProfileService.changepw({
              email: this.store.user.email,
              password: this.newpassword
            })
            await this.store.setUser(r.data.user)
            alert("Password changed")
            this.$router.push("/search")
                  
          } catch (err) {
            console.log(err.response.data.error)
            this.err = err.response.data.error
            console.log("err: " + this.err)
          }
        }
    },
    goToProfile() {
      this.$emit('backed', true);
    },
    updatepw() {
      this.check().then(()=>{
        this.changepw().then((response)=> {
          this.store.setToken(response.data.token)
          this.store.setUser(response.data.user)
        })
        })
    }
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
  padding: 30px 90px 50px 90px;
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
#back {
  font-size: 15px;
}
button {
  margin: 10px;
  margin-top: 10px;
  background-color: #F16308;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}

button:hover {
  background: #ffcc00;
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
