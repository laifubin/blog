// element-plus 通过方法调用的组件 unplugin-vue-component 无法处理样式
// 需要手动额外引入
import 'element-plus/theme-chalk/el-message.css'

import './index.scss'
import './rewrite-element-plus.scss'