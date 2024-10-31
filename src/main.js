import './assets/main.css'
import { initialApp } from '@/helpers/firebase'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
initialApp()
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
