<template>
    <div id="navbar">
        <div id="logo">
            <img alt="When2Block Logo" src="../assets/when2block_logo.png"/>
        </div>
        <div id = "navlinks">
            <ul>
                <li>
                <p>Check-In</p>
                </li>
                <li>
                <p>Statistics</p>
                </li>
                <li>
                <p>Search</p>
                </li>
                <li>
                <p>Contact Us</p>
                </li>
            </ul>
        </div>

        <div id="LogOut">
            <p>
                Hi, USERNAME
            </p>
            <button>
                Log Out
            </button>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'HeaderBar',
      props: {
        msg: String
      }
    }

</script>

<style scoped>
#logo {
    margin-left: 15px;
}

#navbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: rgb(40,41,62);
    align-items: center;
}

#navlinks {
    color: white;
    margin: 0;
    height: 70px;
    display: flex;
    align-items: center;
    /* justify-content: center; */
}

#LogOut {
    display: flex;
    flex-direction: column;
    color: white;
    margin-right: 20px;
}

button {
    background-color: rgb(241,99,9);
    color: white;
    border-radius: 5px;
}

p {
    margin: 0px;
}

h3 {
    margin: 40px 0 0;
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
    color: #42b983;
}
</style>
    