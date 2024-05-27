import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cdn from 'vite-plugin-cdn-import'

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX = /^[a-z]:/i;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode}) => {
  return {
    base: mode === 'production' ? '/StockCalculateWeb/' : './',
    server: {
      port: 8000
    },
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
