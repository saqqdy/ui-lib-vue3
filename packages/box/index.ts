import Box from './box.vue'
import BoxPlugin from './box'

/* istanbul ignore next */
Box.install = function (Vue) {
    Vue.component(Box.name, Box)
    Vue.prototype.$box = Vue.$box = BoxPlugin
}

export default Box
