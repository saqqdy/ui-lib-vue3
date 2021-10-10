import { App } from 'vue'
import Box from './box.vue'
import BoxPlugin from './box'

/* istanbul ignore next */
Box.install = (app: App): void => {
    app.component(Box.name, Box)
    app.config.globalProperties.$box = BoxPlugin
}

export default Box
