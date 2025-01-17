import { createRouter, createWebHistory } from 'vue-router'

const baseRouters = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/init',
    name: 'Init',
    component: () => import('@/view/init/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  }
]

// 需要通过后台数据来生成的组件
const newCreateRouter = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: baseRouters
  })

  // 修改 router.push 方法 （router.push是用来在代码里动态实现页面跳转）
  const originalPush = router.push;
  router.push = function push(location) {
    return originalPush.call(this, location).catch((err) => { console.log(err) });
  };

  return router
}

const router = newCreateRouter()

export default router
