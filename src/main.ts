import { createApp } from 'vue'
import insertComponent from 'vue-insert-component'
import { createPinia } from 'pinia'

import DialogContainer from '@/components/dialog-container.vue'
import App from './App.vue'
import router from './router'
import 'uno.css'
import './mock/index.ts'
import './router/permission'
import './autoRefreshToken'
import './style/index'

const pinia = createPinia()

createApp(insertComponent(App, DialogContainer)).use(pinia).use(router).mount('#app')
