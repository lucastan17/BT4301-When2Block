<template>
    <div class="home">
        <HeaderBar2 title="Login">
        </HeaderBar2>
        <br />
        <Register />
    </div>
</template>
  
<script>
import HeaderBar2 from '@/components/HeaderBar2.vue';

export default {
    name: 'LoginView',
    components: {
        HeaderBar2,
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
  