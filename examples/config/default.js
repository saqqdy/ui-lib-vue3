const path = require('path');
/**
 * @description resolve
 * @param {string} dir 目录
 * @returns {string} url
 */
function resolve(dir) {
	return path.join(__dirname, dir);
}
// 读取对应的配置
const config = require('../config.json');

module.exports = {
	// ...userConfig,
	transpileDependencies: ['cloud-ui'],
	proxy: {
		'/jar/': {
			target: config.api,
			changeOrigin: true,
			rewrite: path => path.replace(/^\/jar\//, '/'),
		},
		'/static/': {
			target: config.static,
			changeOrigin: true,
			rewrite: path => path.replace(/^\/static\//, '/'),
		},
		'/node/': {
			target: config.node,
			changeOrigin: true,
			rewrite: path => path.replace(/^\/node\//, '/'),
		},
	},
	externals: {
		// vue: 'Vue',
		// 'element-plus': 'element-plus'
	},
	pluginOptions: {},
};
