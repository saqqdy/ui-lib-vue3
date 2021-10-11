import { createApp } from 'vue';
import { ElProgress, ElSkeleton, ElRow, ElCol, ElButton, ElCarousel, ElForm, ElInput, ElSelect, ElTooltip, ElMessage, ElMessageBox } from 'element-plus';
import plugins from '@/plugins';
import filters from '@/filters';
import components from '@/components';
import App from './App.vue';
import router from './router';
import store, { key } from './store';

const app = createApp(App);
app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 5000 };

app.use(ElProgress);
app.use(ElSkeleton);
app.use(ElRow);
app.use(ElCol);
app.use(ElButton);
app.use(ElCarousel);
app.use(ElForm);
app.use(ElInput);
app.use(ElSelect);
app.use(ElTooltip);
app.use(ElMessage);
app.use(ElMessageBox);
app.use(store, key).use(router).use(components).use(plugins).use(filters).mount('#app');
