import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    externalGlobals({
      'thinymce-vue': 'thinymce-vue',
    })
  ],
  resolve: {
    //配置别名
    alias: {
      "@": resolve(__dirname, "src")
    },
    extensions:  [".js", ".json", ".ts", ".vue", ".jsx"] // 使用路径别名时想要省略的后缀名
  },
  server: {
    proxy: {
      "^/api/location": {
        target: "http://pv.sohu.com",
        rewrite: (path) => path.replace(/^\/api\/location/, ""),
        changeOrigin: true
      },
      "^/api": {
        target: "http://localhost:3003", // 所要代理的目标地址
        // target: "http://43.154.73.67:3000",
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true // true/false, 默认值:false - 将主机报头的来源更改为目标URL
      }
    },
    port: 3001
  }
})
