<template>
    <div class="">
        <div class="parent">
            <div class="float-child-left">
                <img class="pic_1" src="../assets/hat.png" />
                <h1 class="msg">Welcome!</h1>
                <img class="pic_2" src="../assets/sunblock.png" />
            </div>
            <div class="float-child-right">
                <h3>Create your account</h3>

                <o-field>
                    <o-input placeholder="Username" autocomplete="off" v-model="username"></o-input>
                </o-field>

                <o-field>
                    <o-input placeholder="Email" type="email" autocomplete="off" v-model="email"></o-input>
                </o-field>

                <o-field>
                    <o-input placeholder="Password" type="password" autocomplete="off" v-model="password"></o-input>
                </o-field>

                <o-field>
                    <o-input placeholder="Confirm Password" type="password" autocomplete="off" v-model="cfm_password">
                    </o-input>
                </o-field>

                <o-button @click="register" expanded class="button">SIGN UP</o-button>

                <br />
                <br />
                <h1 class="error" v-if="error">{{error}}</h1>

                <a href="/login">I already have an account</a>
            </div>

        </div>
    </div>
</template>
    
<script>
// import AuthenticationService from '@/services/AuthenticationService'

export default {
    name: 'RegisterItem',
    data() {
        return {
            username: "",
            email: "",
            password: "",
            cfm_password: "",
            error: ""
        }
    },
    methods: {
        async register() {
            if (this.username == "" | this.email == "" | this.password == "" | this.password == "" | this.cfm_password == "") {
                this.error = "Fields cannot be empty!"
            } else if (this.password != this.cfm_password) {
                this.error = "Passwords do not match!"
            } else {
                alert("Registered!")
                this.$router.push("/survey")
                // const response = await AuthenticationService.register({
                //   username: this.username,
                //   email: this.email,
                //   password: this.password
                // })
                // console.log(response.data)
            }
        }
    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg {
    font-weight: bold;
    font-size: 50pt;
    margin: 0px;
    position: absolute;
    top: 150px;
    left: 70px;
    bottom: 50px;
    right: 70px;
}

.pic_1 {
    width: 40%;
    margin: 0px 60px 0px 0px;
    float: left;
    position: absolute;
    top: 0;
    left: 0;
}

.pic_2 {
    width: 20%;
    float: right;
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.parent {
    height: 400px;
    width: 85%;
    border-radius: 50px;
    border: 1px solid black;
    /* padding: 20px; */
    margin: auto;
    background-color: white;
}

.float-child-left {
    width: 50%;
    height: 100%;
    border-radius: 50px;
    float: left;
    /* padding: 50px; */
    background-color: white;
    position: relative;
}

.float-child-right {
    width: 50%;
    height: 100%;
    border-radius: 50px;
    float: left;
    padding: 10px 80px 0px 80px;
    background-color: #FCF5E8;
    margin: 0px;
}

.button {
    background-color: #F16308;
    border: 0;
}

.error {
    margin: 0 auto;
    font-size: 15px;
    color: red;
}
</style>
    