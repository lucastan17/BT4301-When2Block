<template>
  <div class="form">
    <form @submit.prevent="update">
      <h2 class="msg">Welcome Back!</h2>
      <o-row>
        <o-input
          id="name"
          v-model="name"
          type="text"
          placeholder="Full Name"
          required="true"
          ><template #prefix>
            <o-icon pack="fas" icon="user" size="small"></o-icon> </template
        ></o-input>
      </o-row>
      <o-row>
        <o-input
          id="email"
          v-model="email"
          type="text"
          placeholder="Email Address"
          required="true"
          ><template #prefix>
            <o-icon pack="fas" icon="user" size="small"></o-icon> </template
        ></o-input>
      </o-row>
      <o-row>
        <o-input
          id="password"
          v-model="password"
          type="text"
          placeholder="Password"
          required="false"
          ><template #prefix>
            <o-icon pack="fas" icon="user" size="small"></o-icon> </template
        ></o-input>
      </o-row>
      <div id="centre">
        <button type="submit">SAVE CHANGE</button>
      </div>
      <h4 id="back" @click="goToProfile()">BACK TO MY PROFILE</h4>
      <div class="error" v-if="err">{{err}}</div>
    </form>
  </div>
</template>

<script>

export default {
  name: "EditProfileForm",
  components: { },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async update() {
      // await setDoc(doc(db, "Customers", this.email), {
        // name: this.name,
        // email: this.email,
        // postalcode: this.postalcode,
      // });
      alert("Profile successfully updated");
      this.$router.push("./Profile");
    },
    goToProfile() {
      this.$router.push("./Profile");
    },
  },
  // async created() {
  //   this.email = sessionStorage.getItem("useremail");
  //   const docRef = doc(db, "Customers", this.email);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists) {
  //     const data = docSnap.data();
  //     this.name = data.name;
  //     this.postalcode = data.postalcode;
  //   }
  // },
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
