module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins: [
		[
			'import',
			{
				libraryName: 'element-plus',
				// 引入组件
				customName: name => {
					name = name.slice(3);
					return `element-plus/lib/components/${name}`;
				},
				// 引入样式
				customStyleName: name => {
					name = name.slice(3);
					return `element-plus/theme-chalk/${name}.css`;
				},
			},
		],
		[
			'import',
			{
				libraryName: 'js-cool',
				style: false,
				libraryDirectory: 'lib',
				camel2DashComponentName: false,
			},
			'js-cool',
		],
	],
};
