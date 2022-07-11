import { defineStore } from "pinia";
import config from '@/config'
import router from '../router/index';
// 1.定义容器
// 参数1： 容器的ID，必须唯一，将来pinia会把所有容器挂载到根容器
// 参数2： 选项对象
const { MAX_AGE } = config
const initMenus = JSON.stringify([
  { name: 'Home', path: '/home', label: '首页'},
  { name: 'Category', path: '/category', label: '分类'}
])
export const UserStore = defineStore("user", {
  /**
   * 类似于组件的data， 用来存储全局状态
   * 1. 必须是函数，这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
   * @returns  一个函数，调用得到容器实例
   */
  state: () => {
    return {
      userName: JSON.parse(localStorage.getItem('blog_token') ?? '{}').name || '',
      msg: "第一个状态数据 Pinia",
      menuList: JSON.parse(localStorage.getItem('blog_menus') ?? initMenus)
    };
  },
  /**
   * 类似于组件的computed，用来封装计算属性，有缓存的功能
   */
  getters: {
    getMsg(state) {
      return 'xxx' + state.msg
    },
    getMsg2(): string {
      return 'yyy' + this.msg
    }
  },
  /**
   * 类似于组件的methods，封装业务逻辑（同步，异步都可以），修改state
   */
  actions: {
    changeMsg() {
      this.msg = 'zzz' + this.msg
    },
    updateMenuList(list: any[]) {
      this.menuList.push(...new Set(list))
      localStorage.setItem('blog_menus', JSON.stringify(this.menuList))
    },
    resetMenuList() {
      this.menuList = JSON.parse(initMenus)
      localStorage.setItem('blog_menus', initMenus)
    },
    loginOut() {
      localStorage.clear()
      this.resetMenuList()
      this.userName = ''
      router.replace({path: '/home'})
    }
  },
});

