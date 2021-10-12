// import compareVersions from 'compare-versions';
// import { getPkgVersion, kebabCase } from './utils';

import lib from '../../dist/index.esm.js';
import fun from '../../dist//utils/nextIndex.js';
console.log(lib);
console.log(fun);

/**
 * @deprecated
 * @param partialName
 * @param options
 *
 * @returns
 */
// function getSideEffectsLegacy(partialName, options) {
// 	const { importStyle = 'css' } = options;
// 	if (!importStyle) return;

// 	if (importStyle === 'less') {
// 		return ['ui-lib-vue3/packages/styles/common/var.less', 'ui-lib-vue3/packages/styles/reset.less', `ui-lib-vue3/packages/styles/${partialName}.less`];
// 	} else if (importStyle === true || importStyle === 'css') {
// 		return ['ui-lib-vue3/dist/styles/reset.css', `ui-lib-vue3/dist/styles/${partialName}.css`];
// 	}
// }

export function kebabCase(key) {
	const result = key.replace(/([A-Z])/g, ' $1').trim();
	return result.split(' ').join('-').toLowerCase();
}

function getSideEffects(dirName, options) {
	const { importStyle = 'css' } = options;

	if (importStyle === 'less') return `ui-lib-vue3/es/${dirName}/style`;
	else if (importStyle === true || importStyle === 'css') return `ui-lib-vue3/es/${dirName}/style/css`;
}

/**
 * Resolver for ui-lib-vue3
 */
export function UiLibVue3Resolver(options = {}) {
	return name => {
		if (name.match(/^Ui[A-Z]/)) {
			// const { version = getPkgVersion('ui-lib-vue3', '1.0.2') } = options;
			const partialName = kebabCase(name.slice(2)); // UiButton->button
			console.log(80, name, partialName, options);
			return {
				importName: name,
				path: 'ui-lib-vue3/dist/index.esm.js',
				// path: `ui-lib-vue3/dist/${partialName}`,
				// sideEffects: getSideEffects(partialName, options),
			};
		}
	};
}
