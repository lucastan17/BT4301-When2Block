<template>
    <div id="navbar">
        <div id="logo" class="border align-items-">
            <img src="../assets/when2block_logo.png" />
        </div>
        <div id="header">
            <h3>{{title}}</h3>
        </div>
        <slot>
            <!-- to customise on pages and remove afterwards  -->
            <!-- <o-button class="button">
                Register
            </o-button> -->
        </slot>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar2',
    props: ["title"],
    data() {
        return {
        }
    }
}

</script>

<style scoped>
#logo {
    position: absolute;
    top: 20px;
    left: 20px;
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
    display: flex;
    font-size: 40px;
    padding-top: 50px;
}

.button {
    background-color: #F16308;
    margin: 15px;
    border-radius: 5px;
    position: absolute;
    right: 5px;
}
</style>
    