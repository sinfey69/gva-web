import router from './router'
import { store } from '@/store'
import getPageTitle from '@/utils/page'

let asyncRouterFlag = 0

const whiteList = ['Login', 'Init']
router.beforeEach(async (to, from, next) => {
  const token = store.getters['user/token']
  // 在白名单中的判断情况
  // 修改网页标签名称
  document.title = getPageTitle(to.meta.title)
  if (whiteList.indexOf(to.name) > -1) {
    if (token) {
      next({ name: store.getters['user/userInfo'].authority.defaultRouter })
    } else {
      next()
    }
  } else {
    // 不在白名单中并且已经登陆的时候
    if (token) {
      // 添加flag防止多次获取动态路由和栈溢出
      if (!asyncRouterFlag && store.getters['router/asyncRouters'].length === 0) {
        asyncRouterFlag++
        await store.dispatch('router/SetAsyncRouter')
        await store.dispatch('user/GetUserInfo')
        const asyncRouters = store.getters['router/asyncRouters']
        asyncRouters.forEach((route) => {
          router.addRoute(route); // 将动态路由添加到指定的父路由
        })
        next({ ...to, replace: true })
      } else {
        if (to.matched.length) {
          next()
        } else {
          next({ path: '/layout/404' })
        }
      }
    }
    // 不在白名单中并且未登陆的时候
    if (!token) {
      next({
        name: 'Login',
        query: {
          redirect: document.location.hash
        }
      })
    }
  }
})
