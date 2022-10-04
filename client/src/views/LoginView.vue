<template>
    <div>
        <HeaderBar2 title="Log In">
            <o-button class="button" @click="register">Register</o-button>
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
</style>
    