import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载 .env 文件
  const env = loadEnv(mode, process.cwd());
  return {
    define: {
      // 将环境变量注入到代码中
      'process.env': env,
    },
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.scss'], // 自动解析文件，即引入时不用带后缀
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        // '@': path.resolve(__dirname, './src') 
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: true, // 调试时vs就可以打断点了，否则打的断点是灰色的
    },
    server: {
      port: env.VITE_APP_CLI_PORT,
      open: true,
      overlay: {
        warnings: false,
        errors: true,
      },
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: `${env.VITE_APP_BASE_PATH}:${env.VITE_APP_SERVER_PORT}/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    }
  }
})
