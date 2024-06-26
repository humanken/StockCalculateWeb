import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import cdn from 'vite-plugin-cdn-import'

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const serverSetting = {
    host: env.VITE_SERVER_HOST,
    port: env.VITE_SERVER_PORT,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true
      }
    }
  }
  return {
    base: env.VITE_WEB_BASE_URL,
    server: serverSetting,
    preview: serverSetting,
    plugins: [
      vue(),
      cdn({
        prodUrl: 'https://unpkg.com/{name}@{path}',
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: '3.4.21'
          },
          {
            name: 'vant',
            var: 'Vant',
            path: '4.9.0'
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: '4.3.2'
          },
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: '2.7.2'
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          sanitizeFileName(name) {
            const match = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter = match ? match[0] : '';
            // substr 是被淘汰語法，因此要改 slice
            return (
              driveLetter +
              name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
            );
          },
        },
      },
    }
  }
})
