<template>
    <div class="">
        <div class="parent">
            <div class="float-child-left">
                <h1 class="msg">Welcome Back!</h1>
                <br />
                <o-field label="Email">
                    <o-input type="email" v-model="email"></o-input>
                </o-field>
                <br />
                <o-field label="Password">
                    <o-input type="password" v-model="password">
                    </o-input>
                </o-field>
                <br />
                <o-button @click="login" expanded class="button">LOG IN</o-button>
                <a href="/register">I don't have an account</a>
            </div>

            <div class="float-child-right">
                <img class="pic_1" src="../assets/login_pic.png">

            </div>

        </div>
    </div>
</template>
    
<script>
import AuthenticationService from '@/services/authService'

export default {
    name: 'LogIn',
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        async login() {
            const response = await AuthenticationService.login({
                email: this.email,
                password: this.password
            })
            console.log(response.data)
            alert("Successful log in!")
            this.$router.push("/")
        }
    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg {
    font-weight: bold;
    font-size: 30pt;
    margin: 0px;
}

.pic_1 {
    width: 95%;
    float: left;
}

.parent {
    height: 400px;
    width: 85%;
    border-radius: 50px;
    /* padding: 20px; */
    margin: auto;
}

.float-child-left {
    width: 50%;
    height: 100%;
    border-radius: 20px;
    float: left;
    padding: 30px 90px 0px 90px;
    background-color: #FCF5E8;
}

.float-child-right {
    width: 50%;
    height: 100%;
    border-radius: 20px;
    float: left;
    margin: 0px;
}

.button {
    background-color: #F16308;
    border: 0;
}
</style>
    