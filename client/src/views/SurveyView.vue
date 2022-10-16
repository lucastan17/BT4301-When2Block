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
                <o-button class="button" @click="logOut">{{button}}</o-button>
            </template>
        </HeaderBar2>
        <br />
        <SurveyItem />
    </div>
</template>
    
<script>
import { userStore } from '../store/store'

import HeaderBar2 from '@/components/HeaderBar2.vue';
import SurveyItem from '@/components/Survey.vue';

export default {
    components: { HeaderBar2, SurveyItem },
    setup() {
        const store = userStore();
        return { store };
    },
    methods: {
        async logOut() {
            await this.store.setToken(null)
            await this.store.setUser(null)

            this.$router.push("/login")
        }
    },
    data() {
        return {
        header: 'Survey',
        button: 'Log Out'
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
    right: 10px;
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
    