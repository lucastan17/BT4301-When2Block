import { createApp } from 'vue'
import App from './App.vue'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'
import router from './router'

const app = createApp(App).use(router)

app.use(Oruga)
app.mount('#app')