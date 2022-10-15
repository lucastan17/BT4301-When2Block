import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
    state: () => ({
        token: null,
        user: null,
        isUserLoggedIn: false
    }),
    getters: {
        // doubleCount: (state) => state.count * 2,
    },
    actions: {
        async setToken(token) {
            this.token = token
            if (token) {
                this.isUserLoggedIn = true
            } else {
                this.isUserLoggedIn = false
            }
        },
        async setUser(user) {
            this.user = user
        }
    },
    persist: {
        storage: sessionStorage,
    },
})