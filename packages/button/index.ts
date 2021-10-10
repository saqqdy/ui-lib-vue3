import { App } from 'vue'
import Button from './button.vue'

/* istanbul ignore next */
Button.install = (app: App): void => {
    app.component(Button.name, Button)
}

export default Button
