import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 进度条
import "nprogress/nprogress.css";

Vue.config.productionTip = false



Vue.use(ElementUI);

// 全局样式文件
import '@/styles/index.less';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
