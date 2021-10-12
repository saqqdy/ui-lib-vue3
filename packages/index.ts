import { version, author } from '../package.json'
import UiBox from './box'
import UiButton from './button'

// import directive from '../src/directive';
// import filters from '../src/filters';
// import plugins from '../src/plugins';

const install = (app, opts = {}) => {
    app.component(UiBox.name, UiBox)
    app.component(UiButton.name, UiButton)

    app.config.globalProperties.$UILIBVUE3 = {
        size: opts.size || '',
        zIndex: opts.zIndex || 5000
    }
    app.config.globalProperties.$box = Box

    // app.use(directive);
    // app.use(filters);
    // app.use(plugins);
}

export default {
    version: version,
    author: author.name,
    install,
    UiBox,
    UiButton
}
