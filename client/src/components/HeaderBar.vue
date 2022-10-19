<template>
    <div id="navbar">
        <div>
            <router-link to="/about">
                <img class="logo" alt="When2Block Logo" src="../assets/logo.png" />
            </router-link>
        </div>
        <div id="navlinks">
            <ul>
                <li>
                    <a href="/model-performance" v-if="store.user.admin_user">Model Performance</a>
                    <a href="/track" v-if="!store.user.admin_user">Check-In</a>
                </li>
                <li>
                    <a href="/model-registry" v-if="store.user.admin_user">Model Registry</a>
                    <a href="/search" v-if="!store.user.admin_user">Search</a>
                </li>
                <li>
                    <a href="/user-behaviour" v-if="store.user.admin_user">User Behaviour</a>
                    <a href="/survey" v-if="!store.user.admin_user">Survey</a>
                </li>
            </ul>
        </div>

        <div id="LogOut">
            <p>Hi, <a href="/profile">{{store.user.username}}</a></p>
            <o-button @click="logOut">
                LOG OUT
            </o-button>
        </div>
    </div>
</template>

<script>
import { userStore } from '@/store/store'

export default {
    name: 'HeaderBar',
    setup() {
        const store = userStore();
        return { store };
    },
    props: {
        msg: String
    }, methods: {
        async logOut() {
            await this.store.setToken(null)
            await this.store.setUser(null)

            this.$router.push("/login")
        }
    }
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
}

#LogOut {
    color: white;
    margin-right: 20px;
    position: absolute;
    right: 10px;
}

button {
  margin: auto;
  background-color: #F16308;
  border: none;
  color: white;
  padding: 5px;
  border-radius: 4px;
  margin-top: 2px;
  height: 10%;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
}
button:hover {
  background: #ffcc00;
  color: black;
  cursor: pointer;
}
button:focus {
  outline: none;
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
    