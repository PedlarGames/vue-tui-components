import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Dev server config for demo
    return {
      plugins: [vue()],
      root: 'demo',
      server: {
        port: 3000
      }
    }
  } else {
    // Build config for library
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'VueTuiComponents',
          fileName: (format) => `vue-tui-components.${format}.js`
        },
        rollupOptions: {
          // Make sure to externalize deps that shouldn't be bundled
          external: ['vue'],
          output: {
            // Provide global variables to use in the UMD build
            globals: {
              vue: 'Vue'
            },
            // Preserve CSS
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') return 'vue-tui-components.css';
              return assetInfo.name;
            }
          }
        }
      }
    }
  }
})
