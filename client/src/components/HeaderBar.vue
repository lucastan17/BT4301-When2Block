<template>
    <div id="navbar">
        <div>
            <router-link to="/">
                <img class="logo" alt="When2Block Logo" src="../assets/logo.png" />
            </router-link>
        </div>
        <div id="navlinks">
            <ul>
                <li>
                    <a href="/track">Check-In</a>
                </li>
                <li>
                    <a href="/">Statistics</a>
                </li>
                <li>
                    <a href="/">Search</a>
                </li>
                <li>
                    <a href="/">Contact Us</a>
                </li>
            </ul>
        </div>

        <div id="LogOut">
            <p>Hi, <a href="/profile">USERNAME</a></p>

            <o-button>
                Log Out
            </o-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderBar',
    props: {
        msg: String
    },
}

</script>

<style scoped>
.logo {
    width: 13%;
    position: absolute;
    top: 13px;
    left: 15px;
}

#navbar {
    display: flex;
    justify-content: center;
    background-color: rgb(40, 41, 62);
    align-items: center;
}

#navlinks {
    color: white;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#LogOut {
    color: white;
    margin-right: 20px;
    position: absolute;
    right: 10px;
}

button {
    background-color: rgb(241, 99, 9);
    color: white;
    border-radius: 5px;
    height: 25px;
}

p {
    margin: 0px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    display: inline-block;
    margin: 0 70px;
}

a {
    color: white;
}

#navlinks a {
    color: white;
    text-decoration: none;
}

#navlinks a:hover,
a.active {
    border-bottom: white solid 2px;
}

/* to underline pages  */
/* #navlinks a:active {
    border-bottom: white solid 2px;
} */
</style>
    