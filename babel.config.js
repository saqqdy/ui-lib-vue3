module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
                targets: '> 0.5%, not dead',
                loose: true,
                modules: false
                // proposals: true,
            }
        ],
        '@babel/typescript'
    ],
    plugins: [
        '@vue/babel-plugin-jsx',
        '@babel/proposal-class-properties',
        '@babel/transform-runtime',
        [
            'import',
            {
                libraryName: 'js-cool',
                style: false,
                libraryDirectory: 'lib',
                camel2DashComponentName: false
            },
            'js-cool'
        ],
        ['@babel/plugin-proposal-private-property-in-object', { loose: false }],
        ['@babel/plugin-proposal-private-methods', { loose: false }]
    ],
    overrides: [
        {
            test: /\.vue$/,
            plugins: ['@babel/transform-typescript']
        }
    ],
    env: {
        utils: {
            ignore: ['**/*.test.ts', '**/*.spec.ts'],
            presets: [
                [
                    '@babel/env',
                    {
                        loose: true,
                        modules: false
                    }
                ]
            ],
            plugins: [
                [
                    'babel-plugin-module-resolver',
                    {
                        root: ['ui-lib-vue3'],
                        alias: {
                            '@ui-lib-vue3': 'ui-lib-vue3/dist'
                        }
                    }
                ]
            ]
        }
    }
}
