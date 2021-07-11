import Vue from 'vue'
import App from './App.vue'
import UILibVue3TSDemo from '../../'
import UILibVue3TSDemoButton from '../../lib/button'
import '../../lib/style/index.css'
import router from './router'
import store from './store'
import esm from '../../lib/index.esm.js'
import esmbutton from '../../es/button.js'

Vue.config.productionTip = false

console.log(UILibVue3TSDemo, UILibVue3TSDemoButton, esm, esmbutton)
Vue.use(UILibVue3TSDemo)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
