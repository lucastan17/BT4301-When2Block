<template>
    <div id="navbar">
        <div id="logo">
            <img alt="When2Block Logo" src="../assets/when2block_logo.png" />
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
#logo {
    position: absolute;
    top: 5px;
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
    