import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: { name: "Home" } },
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/home/index.vue")
  },
  {
    path: "/category",
    name: "Category",
    component: () => import(/* webpackChunkName: "Category" */ "@/views/category/index.vue")
    // meta: { auth: true }
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import(/* webpackChunkName: "Blog" */ "@/views/blog/index.vue"),
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

// export function injectRoutes (menus: any[]) {
//   console.log(111, menus);
//   menus.forEach((item: any) => {
//     console.log('boo',item.name, !router.hasRoute(item.name));
    
//     if (!router.hasRoute(item.name)) {
//       router.addRoute({
//         path: item.path,
//         name: item.name,
//         component: () => import(`../views/${item.name.toLowerCase()}.vue`),
//         meta: {
//           auth: true
//         }
//       })
//     }
//   })
// }
export default router

