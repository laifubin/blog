import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: { name: "HomePage" } },
  {
    path: "/home",
    name: "HomePage",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/home-page.vue")
  },
  {
    path: "/hello",
    name: "Hello",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/HelloWorld.vue"),
    meta: { auth: true }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/notFound.vue")
  }
]

const router = createRouter({
  // history:createWebHistory() 模式,hash模式:createWebHashHistory()
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const routes =  router.getRoutes().map(item => item.path)
  console.log(routes);
  if(to.path === '/test') next()
  if (routes.includes(to.path)) {
    if(to.meta.auth) console.log(2222)
    else next()
  } else {
    next({ path: '/404' })
  }
})

export default router

