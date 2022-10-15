<template>
    <div id="navbar">
        <slot name="logo">
            <!-- to customise on pages and remove afterwards  -->
            <!--<div class="border align-items-">
            <img class="logo" src="../assets/logo.png" />
            </div>-->
        </slot>
        
        <slot name="header">
            <!-- to customise on pages and remove afterwards  -->
            <!--<div id="header">
                <h3>{{title}}</h3>
            </div>-->
        </slot>
            
        <slot name="button">
            <!-- to customise on pages and remove afterwards  -->
            <!-- <o-button class="button">
                Register
            </o-button> -->
        </slot>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar2'
}

</script>

<style scoped>
.logo {
    width: 15%;
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