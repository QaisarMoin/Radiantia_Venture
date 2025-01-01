import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import postcss from 'postcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [{
        postcssPlugin: 'remove-charset',
        Once(root) {
          root.walkAtRules('charset', (rule) => {
            rule.remove();
          });
        },
      },
      ],
    },
  },
})
