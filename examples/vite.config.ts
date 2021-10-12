import { join, resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import legacy from '@vitejs/plugin-legacy';
import visualizer from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { UiLibVue3Resolver } from './config/resolvers';
// import { injectHtml } from 'vite-plugin-html';
const { transpileDependencies, proxy, externals, pluginOptions, chainWebpack } = require('config-lite')(__dirname);
// import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
process.env.VITE_APP_VERSION = String(Date.now());

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						const [, module] = /node_modules\/(@?[a-z0-9-]+?[a-z0-9-]+)/.exec(id);
						const path = join(process.cwd(), 'node_modules', module, 'package.json');
						if (fs.existsSync(path)) {
							try {
								const { version } = require(path);
								return `vendor/${module}_${version}.js`;
							} catch {
								console.info('none');
							}
						}
					}
				},
			},
		},
	},
	plugins: [
		vue(),
		Components({
			resolvers: [
				UiLibVue3Resolver({
					importStyle: 'css',
				}),
			],
		}),
		process.env.ANALAYZ_REPORT &&
			visualizer({
				open: true,
				gzipSize: true,
				brotliSize: true,
			}),
		// legacy({
		//     targets: ['defaults', 'not IE 10']
		// })
	],
	base: '/',
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			gitmLib: resolve(__dirname, '../lib'),
			server: resolve(__dirname, '../server'),
		},
	},
	server: {
		proxy,
		cors: true,
		port: 8080,
	},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					'primary-color': '#1890ff', // 全局主色
					'link-color': '#fff', // 链接色
					'success-color': '#67c23a', // 成功色
					'warning-color': '#e6a23c', // 警告色
					'error-color': ' #ef4f4f', // 错误色
					'font-size': '14px', // 主字号
					blue: '#396eff',
					'light-blue': '#a1e7ff',
					yellow: '#ffb22e',
					green: '#95ff00',
					cyan: '#00ffe6 ',
					'light-cyan': '#3fffe6',
					rose: '#ff1fa3',
					'light-rose': '#ff6788',
					'heading-color': 'rgba(255, 255, 255, 0.85)', // 标题色
					'text-color': 'rgba(255, 255, 255, 0.5)', // 主文本色
					'text-color-secondary': 'rgba(255, 255, 255, 0.45)', // 次文本色
					'disabled-color': 'rgba(255, 255, 255, 0.25)', // 失效色
					'border-radius': '4px', // 组件/浮层圆角
					'border-color': '#ebeef5', // 边框色
					'box-shadow': '0 2px 8px rgba(255, 255, 255, 0.15)', // 浮层阴影}
				},
				javascriptEnabled: true,
			},
		},
		postcss: {},
	},
}));
