module.exports = {
	chainWebpack(config) {
		config
			.plugin('mini-css-extract-plugin')
			.use(require('mini-css-extract-plugin'), [
				{
					filename: `css/[name].css?_v=${import.meta.env.VUE_APP_VERSION}`,
					chunkFilename: `css/chunk/[name].css?_v=${import.meta.env.VUE_APP_VERSION}`,
				},
			])
			.end();
		return config;
	},
};
