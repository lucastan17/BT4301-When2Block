<template>
    <div id="navbar">
        <div id="logo" class="border d-flex align-items-" >
            <img alt="When2Block Logo" src="../assets/when2block_logo.png"/>
        </div>
        <div id = "navlinks">
            <ul>
                <li>
                <p>Sign Up</p>
                </li>
            </ul>
        </div>

        <div id="SignIn">
            <button>
                SignIn
            </button>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'HeaderBar2',
      props: {
        msg: String
      }
    }

</script>

<style scoped>
#logo {
    margin-left: 15px;
    align-items: top;
    padding-top: 20px;
}

#navbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: rgb(40,41,62);
    align-items: top;
}

#navlinks {
    color: white;
    margin: 5px;
    height: 200px;
    display: flex;
    font-size: 40px;
    align-items: center;
    /* justify-content: center; */
}

#SignIn {
    display: flex;
    flex-direction: column;
    color: white;
    margin-right: 15px;
    padding-top: 20px;
}

button {
    background-color: rgb(241,99,9);
    color: white;
    border-radius: 5px;
    font-size: 25px;
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
    