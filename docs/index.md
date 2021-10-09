---
home: true
heroImage: null # /images/logo.png
heroText: UILIBVUE3
tagline: 组件库demo
actionText: 开始使用 →
actionLink: /start/
features:
    - title: 兼容多种环境
      details: 构建了umd/cmd/esm包
    - title: 自动生成入口文件
      details: 内置智能脚本
    - title: 按需引入
      details: UILIBVUE3支持按需打包的方式，可根据使用情况只打包有用到的组件和样式
footer: MIT Licensed | Copyright © 2020-present saqqdy.com
---

```js
import Vue from 'vue'
import UILIBVUE3 from 'ui-lib-vue3'
import App from './App.vue'

Vue.use(UILIBVUE3, { zIndex: 5000 })

new Vue({
    render: h => h(App)
}).$mount('#app')
```
