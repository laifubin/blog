import { UserStore } from '@/store/user'
import router from './index'
import config from '@/config'

const { MAX_AGE } = config

router.beforeEach((to, from, next) => {
  const { token, time } = JSON.parse(localStorage.getItem('blog_token') ?? '{}')
  console.log('routes', router.getRoutes(), UserStore().menuList)
  if (token){
    const store = UserStore()
    // if (store.menuList.length > router.getRoutes().length - 2) injectRoutes(store.menuList)
    if (to.meta.auth) {
      if (time + MAX_AGE < Date.now()) {
        store?.loginOut?.()
        return next('/')
      } else next()
    } else next()  
  } else {
    if (!to.meta.auth) next()
    else next({ path: '/404' })
  }
})

// router.afterEach(() => {
//   // 根据当前的标签也获取label的值动态设置浏览器标题
// })