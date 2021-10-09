const fs = require('fs')
import vue from 'rollup-plugin-vue'
import css from 'rollup-plugin-css-only'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import path from 'path'
import pkg from '../package.json'

const components = require('../components.json')
const deps = Object.keys(pkg.dependencies)

const noWlPrefixFile = /(utils|styles|hooks)/
const getOutFile = (name, dir = 'dist') => {
    const compName = name.split('/')[1]
    if (noWlPrefixFile.test(name)) {
        return `${dir}/${compName}.js`
    }
    return `${dir}/${compName}.js`
}

export default Object.keys(components).map(key => ({
    input: path.resolve(__dirname, '../' + components[key]),
    output: [
        {
            format: 'es',
            file: getOutFile(components[key], 'es'),
            paths(id) {
                if (/^ui-lib-vue3\/packages/.test(id)) {
                    if (noWlPrefixFile.test(id)) return id.replace('ui-lib-vue3/packages/', 'ui-lib-vue3/dist/')
                    return id.replace('ui-lib-vue3/packages/', 'ui-lib-vue3/dist/')
                }
            }
        },
        {
            format: 'cjs',
            file: getOutFile(components[key], 'dist'),
            exports: 'named',
            paths(id) {
                if (/^ui-lib-vue3\/packages/.test(id)) {
                    if (noWlPrefixFile.test(id)) return id.replace('ui-lib-vue3/packages/', 'ui-lib-vue3/dist/')
                    return id.replace('ui-lib-vue3/packages/', 'ui-lib-vue3/dist/')
                }
            }
        }
    ],
    plugins: [
        css(),
        vue({
            target: 'browser',
            css: false
        }),
        nodeResolve(),
        esbuild()
    ],
    external(id) {
        return /^vue/.test(id) || /^ui-lib-vue3/.test(id) || deps.some(k => new RegExp('^' + k).test(id))
    }
}))