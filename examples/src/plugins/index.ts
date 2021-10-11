import { App } from 'vue';
import axios from './axios';
import { delay } from 'js-cool';

/**
 * @param app
 */
export default (app: App): void => {
	app.config.globalProperties.$axios = axios.bind(app);
	app.config.globalProperties.$delay = new (delay as any)();
};
