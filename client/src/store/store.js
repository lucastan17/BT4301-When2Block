// import Vue from 'vue'
// import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate' //issues w package, try find another state management package

// Vue.use(Vuex)

// export default new Vuex.Store({
//   strict: true,
//   plugins: [
//     createPersistedState()
//   ],
//   state: {
//     token: null,
//     user: null,
//     isUserLoggedIn: false,
//     isAdmin: false
//   },
//   mutations: {
//     setToken (state, token) {
//       state.token = token
//       state.isUserLoggedIn = !!(token)
//     },
//     setUser (state, user) {
//       state.user = user
//     },
//     setUserType (state, user) {
//       //if user type is admin, state.isAdmine = true else false
//     }
//   },
//   actions: {
//     setToken ({commit}, token) {
//       commit('setToken', token)
//     },
//     setUser ({commit}, user) {
//       commit('setUser', user)
//     },
//     setUserType ({commit}, user) {
//       commit('setUserType', user)
//     }
//   }
// })