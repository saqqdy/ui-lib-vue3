import { getCurrentInstance, useCssModule, ComponentInternalInstance } from 'vue';

export default function useCurrentInstance(props?: string | string[]) {
	props = [].concat(props);
	const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance;
	const globalProperties = appContext.config.globalProperties;
	let style = {} as any;
	props.includes('style') && (style = useCssModule() as any);
	return {
		globalProperties,
		proxy,
		style,
	};
}
