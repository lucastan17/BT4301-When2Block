<template>
    <div class="home">
        <HeaderBar title="Profile">
        </HeaderBar>
        <UserInfo id="info" v-if="mounted" :user="user" />
        <br />
    </div>
</template>
  
<script>
import HeaderBar from '@/components/HeaderBar.vue';
import UserInfo from '@/components/UserInfo.vue';

export default {
    name: 'LoginView',
    components: {
        HeaderBar,
        UserInfo
    },
    data() {
        return {
        user: {
            
        },
        mounted: true,
        }
    },
    methods: {

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
</style>
  