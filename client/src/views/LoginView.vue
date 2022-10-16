<template>
    <div>
        <HeaderBar2>
            <template #logo>
                <div class="border align-items-">
                <router-link to="/">
                    <img class="logo" src="../assets/logo.png" />
                </router-link>
            </div>
            </template>
            <template #header>
                <div id="header">
                    <h3>{{header}}</h3>
                </div>
            </template>
            <template #button>
                <o-button class="button" @click="register" size="medium">{{button}}</o-button>
            </template>
        </HeaderBar2>
        <br />
        <LogIn />
    </div>
</template>
    
<script>
import HeaderBar2 from '@/components/HeaderBar2.vue';
import LogIn from '@/components/LogIn.vue';

export default {
    components: { HeaderBar2, LogIn },
    methods: {
        register() {
            this.$router.push({ name: "register" })
        }
    },
    data() {
        return {
        header: 'Log In',
        button: 'Register'
        }
    }
}
</script>
    
<style scoped>
.button {
    margin: 15px;
    border-radius: 5px;
    position: absolute;
    right: 5px;
    background-color: rgb(241, 99, 9);
    color: white;
    border-radius: 5px;
    border-color: rgb(241, 99, 9);
    top: 10px;
}

.logo {
    width: 15%;
    position: absolute;
    top: 20px;
    left: 20px;
}

#header {
    color: white;
    margin: 15px;
    display: flex;
    font-size: 40px;
    padding-top: 50px;
}

</style>
    