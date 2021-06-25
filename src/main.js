import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 富文本编辑器
import { ElementTiptapPlugin } from 'element-tiptap';

// 进度条
import "nprogress/nprogress.css";
// 全局样式文件
import '@/styles/index.less';

Vue.config.productionTip = false

Vue.use(ElementUI);
// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, { /* 插件配置项 */ lang: 'zh' })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
