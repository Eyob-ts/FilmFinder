import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import './style.css'
import 'vue-toastification/dist/index.css'

const toastOptions = {
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  hideProgressBar: true,
  position: 'top-right',
  closeButton: false,
  icon: true,
  rtl: false
}

const app = createApp(App)
const pinia = createPinia()




app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')