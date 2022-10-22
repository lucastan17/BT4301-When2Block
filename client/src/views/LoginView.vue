<template>
    <div>
        <HeaderBar2>
            <template #logo>
                <div class="align-items-">
                    <router-link to="/">
                        <img class="logo" src="../assets/logo.png" />
                    </router-link>
                </div>
            </template>
            <template #header>
                <div id="header">
                    <h3 class="header-content">{{header}}</h3>
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
    position: absolute;
    right: 5px;
    background-color: rgb(241, 99, 9);
    color: white;
    top: 10px;
    border: 0px;
}

.button:hover {
    background: #ffcc00;
    color: black;
    cursor: pointer;
}

.button:focus {
    outline: none;
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
    font-size: 70px;
    padding-top: 50px;
}

.header-content {
    display: inline-block;
    align-self: flex-end;
    font-weight: bold;
    font-size: 40pt;
}
</style>
    