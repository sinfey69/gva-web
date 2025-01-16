import { createRouter, createWebHistory } from 'vue-router'

// // 获取原型对象上的push函数
// const originalPush = createRouter().push
// // 修改原型对象中的push方法
// createRouter().prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

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

  // // 修改 router.push 方法
  // const originalPush = router.push
  // router.push = function push(location) {
  //   return originalPush.call(this, location).catch(err => err)
  // }

  return router
}

const router = newCreateRouter()

export default router
