<template>
	<Suspense>
		<template #default>
			<router-view class="routerView" />
		</template>
		<template #fallback>
			<div class="loading">loading...</div>
		</template>
	</Suspense>
</template>

<script lang="ts" setup>
import { onErrorCaptured, ref } from 'vue';

const error = ref<any>(null);
onErrorCaptured((err: any): boolean => {
	error.value = err;
	console.warn('error', err);
	return true;
});
</script>

<!-- eslint-disable-next-line vue-scoped-css/require-scoped -->
<style lang="less">
@import './assets/css/index.less';
html,
body,
#app {
	height: 100%;
}
</style>
