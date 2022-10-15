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
                    <h3>Log In</h3>
                </div>
            </template>
            <template #button>
                <o-button class="button" @click="register">Register</o-button>
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
    }
}
</script>
    
<style scoped>
.button {
    background-color: #F16308;
    margin: 15px;
    border-radius: 5px;
    position: absolute;
    right: 5px;
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
    