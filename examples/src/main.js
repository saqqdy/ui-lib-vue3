import Vue from 'vue'
import App from './App.vue'
import UILIBVUE3 from '../../'
import UILIBVUE3Button from '../../lib/button'
import '../../lib/style/index.css'
import router from './router'
import store from './store'
import esm from '../../lib/index.esm.js'
import esmbutton from '../../es/button.js'

Vue.config.productionTip = false

console.log(UILIBVUE3, UILIBVUE3Button, esm, esmbutton)
Vue.use(UILIBVUE3)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
