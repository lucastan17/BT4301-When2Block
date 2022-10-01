<template>
    <div class="home">
        <HeaderBar2 title="Profile">
        </HeaderBar2>
        <UserInfo id="info" v-if="mounted" :user="user" />
        <br />
    </div>
</template>
  
<script>
import HeaderBar2 from '@/components/HeaderBar2.vue';
import UserInfo from '@/components/UserInfo.vue';

export default {
    name: 'LoginView',
    components: {
        HeaderBar2,
        UserInfo
    },
    data() {
        return {
        user: null,
        mounted: false,
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
  