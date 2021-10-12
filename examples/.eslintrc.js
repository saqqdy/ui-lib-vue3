let { vue3Ts: config } = require('eslint-config-sets');
const { extend } = require('js-cool');

module.exports = extend(true, config, {
	rules: {
		semi: [2, 'always'],
		'no-unused-vars': [1, { ignoreRestSiblings: true, argsIgnorePattern: '^h$' }],
		'@typescript-eslint/no-unused-vars': [
			1,
			{
				argsIgnorePattern: '^h$',
				varsIgnorePattern: '^h$',
			},
		],
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-var-requires': 0,
	},
});
