import axiosExtend, { AxiosExtendRequestOptions } from 'axios-ex';
import { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getCookie, setCookie } from 'js-cool';
import { ElMessage } from 'element-plus';

/**
 * 设置请求头
 *
 * @param instance - AxiosInstance
 */
function setHeaders(instance: AxiosInstance) {
	const token = getCookie('token');
	instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	if (token) instance.defaults.headers.common['authorization'] = token;
}
/**
 * 请求拦截器
 *
 * @param config - AxiosRequestConfig
 * @param options - 请求参数AxiosExtendRequestOptions
 * @returns AxiosRequestConfig
 */
function onRequest(config: AxiosRequestConfig, options: AxiosExtendRequestOptions = {}) {
	const type = options.type;
	const isFormData = Object.prototype.toString.call(config.data) === '[object FormData]';
	if (import.meta.env.DEV && config.url.indexOf('http') === -1) {
		config.url = '/node' + config.url;
	}
	if (isFormData) {
		config.data.append('_t', Date.now());
	} else {
		config.data = Object.assign({}, { _t: Date.now() }, config.data);
	}
	if (type == 'post') {
		config.method = 'post';
		if (!isFormData) config.data = qs.stringify(config.data, { arrayFormat: 'indices', allowDots: true });
	} else {
		config.method = 'get';
		config.params = config.data;
	}
	return config;
}
/**
 * 响应拦截器
 *
 * @param res - AxiosResponse<any>
 * @param options - 请求参数AxiosExtendRequestOptions
 * @returns Promise<unknown>
 */
function onResponse(res: any, options: AxiosExtendRequestOptions = {}) {
	if (res.data.success || options.responseType === 'text') {
		return res.data;
	}
	return Promise.reject(res.data);
}
/**
 * 请求取消
 *
 * @param err - Error
 */
function onCancel(err: any) {
	console.error(err.message);
}

// 实例化
const axiosEx = new axiosExtend({
	maxConnections: 30, // 最大同时请求数，默认：0=不限制
	unique: true, // 是否取消前面的相似请求，默认：false
	retries: 0, // 重试次数，默认：0=不重试
	orderly: false, // 是否有序返回，默认：true
	setHeaders, // 设置请求头的方法
	onRequest, // 请求拦截器
	onResponse, // 响应拦截器
	onCancel, // 请求取消时的回调
});

export default function (options: AxiosExtendRequestOptions): Promise<any> {
	// 这里设置 unique 和 orderly 优先级高于实例化时候的配置
	// 这里的unique优先级更高
	options.unique = options.unique ?? false;
	options.orderly = options.orderly ?? false;
	return new Promise((resolve, reject) => {
		axiosEx
			.create(options)
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				const isLogin = location.href.indexOf('login') !== -1;
				// 如果参数显示错误信息，则直接调用实例的catch
				if (options.error) {
					reject(err);
					return;
				}
				// 如果是登录页面，则忽略报错
				if (isLogin) {
					return;
				}
				if (err instanceof Error) {
					// 请求错误
					console.warn(err);
				} else {
					// 请求错误
					ElMessage({
						type: 'error',
						message: err.msg,
						dangerouslyUseHTMLString: true,
					});
				}
			});
	});
}
