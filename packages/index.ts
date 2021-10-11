import { version, author } from '../package.json'
import Box from './box'
import Button from './button/index'

// import directive from '../src/directive';
// import filters from '../src/filters';
// import plugins from '../src/plugins';

const install = function (app, opts = {}) {
    app.component(Box.name, Box)
    app.component(Button.name, Button)

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
    Box,
    Button
}
