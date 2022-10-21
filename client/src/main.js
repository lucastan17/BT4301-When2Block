import { createApp } from 'vue'
import App from './App'
import router from './router'

import Oruga from '@oruga-ui/oruga-next'
import { SetupCalendar } from 'v-calendar';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import BootstrapVue3 from 'bootstrap-vue-3'

import '@oruga-ui/oruga-next/dist/oruga-full.css'
import 'v-calendar/dist/style.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App).use(router)

app.use(pinia)
app.use(Oruga)
app.use(SetupCalendar, {})
app.use(BootstrapVue3)

app.mount('#app')

