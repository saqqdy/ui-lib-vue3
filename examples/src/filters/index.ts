import dayjs from 'dayjs';

export default (app: any) => {
	app.config.globalProperties.$filter = {
		// 日期
		date(val: string, format: string): string {
			if (!val) return '';
			return dayjs(val).format(format);
		},
	};
};
