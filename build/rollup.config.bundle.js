import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import path from 'path'
// import commonjs from '@rollup/plugin-commonjs'
// import { terser } from 'rollup-plugin-terser'
import pkg from '../package.json'

const deps = Object.keys(pkg.dependencies)

const noPrefixFile = /(utils|styles|hooks|locale)/
const getOutFile = (name, dir = 'dist') => {
    const compName = name.split('/')[1]
    if (noPrefixFile.test(name)) {
        return `${dir}/${compName}.js`
    }
    return `${dir}/${compName}.js`
}

export default [
    {
        input: path.resolve(__dirname, '../packages/index.ts'),
        output: {
            format: 'es',
            file: 'dist/index.esm.js',
            paths(id) {
                if (/^ui-lib-vue3\/packages/.test(id)) {
                    if (noPrefixFile.test(id)) return id.replace('ui-lib-vue3/packages/', 'ui-lib-vue3/dist/')
                    return id.replace('ui-lib-vue3/packages/', 'ui-lib-vue3/dist/')
                }
            }
        },
        plugins: [
            nodeResolve(),
            // commonjs(),
            json(),
            vue({
                target: 'browser',
                css: false,
                exposeFilename: false
            }),
            esbuild()
        ],
        external(id) {
            return /^vue/.test(id) || deps.some(k => new RegExp('^' + k).test(id))
        }
    }
]
