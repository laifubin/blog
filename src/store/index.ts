import { defineStore } from "pinia";
// 1.定义容器
// 参数1： 容器的ID，必须唯一，将来pinia会把所有容器挂载到根容器
// 参数2： 选项对象
export const useStore = defineStore("main", {
  /**
   * 类似于组件的data， 用来存储全局状态
   * 1. 必须是函数，这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
   * @returns  一个函数，调用得到容器实例
   */
  state: () => {
    return {
      msg: "第一个状态数据 Pinia",
      menuList: [
        { name: 'home', path: '/home', label: '首页'},
        { name: 'hello', path: '/hello', label: '你好世界'}
      ]
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
    }
  },
});

