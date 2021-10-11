import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { getCookie, setCookie } from 'js-cool';

export const key: InjectionKey<Store<State>> = Symbol('key');

export type State = {
	token: string;
	user?: {
		[prop: string]: any;
	};
};

export default createStore({
	state: {
		token: getCookie('token') || null,
		user: {},
	},
	mutations: {
		/**
		 * @param state
		 * @param data
		 * @description 设置用户token，存入cookie
		 */
		setToken(state, data) {
			state.token = data;
			setCookie('token', data, 7);
		},
		/**
		 * @param state
		 * @description 注销
		 */
		logout() {
			// 更新token
			setCookie('token', '', 7);
		},
		/**
		 * @param state
		 * @param data
		 * @description 设置用户信息
		 */
		setUserInfo(state, data) {
			// 更新token
			state.user = data;
		},
	},
	actions: {},
	modules: {},
});
