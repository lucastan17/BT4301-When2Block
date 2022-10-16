<template>
    <div id="navbar">
        <div class="border align-items-">
            <router-link to="/">
                <img class="logo" alt="When2Block Logo" src="../assets/logo.png" />
            </router-link>
        </div>
        <div>{{title}}</div>
        <slot>
            <!-- to customise on pages and remove afterwards  -->
        </slot>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar3',
    data() {
        return {
        }
    },
    methods: {
        register() {
            this.$router.push({ name: "register" })
        }
    }
}

</script>

<style scoped>
.logo {
    padding-top: 60px;
    object-fit: cover;
    width: 500px;
    display: flex;
    justify-content: center;
}

#navbar {
    display: flex;
    justify-content: center;
    background-color: rgb(40, 41, 62);
    position: relative;
    height: 200px;
}

#header {
    color: white;
    margin: 15px;

}

.button {
    background-color: #F16308;
    margin: 15px;
    position: absolute;
    right: 5px;
    border-radius: 25px;
    width: 270px;
    height: 60px;
    font-size: 24px;
}
</style>
    