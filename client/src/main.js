import { createApp } from 'vue'
import App from './App'
import router from './router'
// import store from '@/store/store'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'
import { SetupCalendar } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const cors = require('cors')
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App).use(router)

app.use(pinia)
app.use(Oruga)
app.use(SetupCalendar, {})
app.use(cors)

app.mount('#app')