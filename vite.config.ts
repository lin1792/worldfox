import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
    AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    // port: 3008,
    // 服务端口号
    // port: 8081,
    open: false, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    proxy: {
      '/biying': {
        target: 'https://api.bing.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/biying', ''),
      },
      '/baidu': {
        target: 'http://suggestion.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/baidu', ''),
      },
      '/google': {
        target: 'http://clients1.google.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/google', ''),
      },
    },
  },
})
