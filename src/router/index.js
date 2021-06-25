import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import {getItem} from '@/utils/localStorage'
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '../views/Layout'),
    children:[
      {
        path: '', // path未空，则作为默认子路由
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Layout/Home')
      },
      {
        path: '/document', // 内容管理
        name: 'document',
        component: () => import(/* webpackChunkName: "document" */ '../views/Layout/Document')
      },
      {
        path: '/picture', //素材管理
        name: 'picture',
        component: () => import(/* webpackChunkName: "article" */ '../views/Layout/Picture')
      },
      {
        path: '/publish', // 发布文章 
        name: 'publish',
        component: () => import(/* webpackChunkName: "article" */ '../views/Layout/Publish')
      },
      {
        path: '/comment', // 评论管理
        name: 'comment',
        component: () => import(/* webpackChunkName: "article" */ '../views/Layout/Comment')
      },
      {
        path: '/present', // 粉丝管理
        name: 'present',
        component: () => import(/* webpackChunkName: "article" */ '../views/Layout/Present')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import(/* webpackChunkName: "my" */ '../views/Layout/My')
      },
    ]
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  // 开启顶部导航进度条特效
  NProgress.start();

  // 校验非登录页面的登录状态
  if (to.path === '/login') {
    // 登录页面，正常允许通过
    next();
    return;
  };

  // 2.1 获取用户 token
  let user=getItem('user-token');
  if (user) {
    // 已登录，允许通过
    next()
  } else {
    // 没有登录，跳转到登录页面
    next('/login')
  }
  
});

router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  NProgress.done();
});



export default router
