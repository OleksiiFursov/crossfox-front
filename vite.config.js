import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, transformWithEsbuild } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  plugins: [
    react(),
    viteTransformJsAsJSX(),
    ViteMinifyPlugin({}),
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: 'build',
    assetsDir: 'public',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      'config.js': path.resolve(__dirname, 'app/config.js'),
      'package': path.resolve(__dirname, 'package'),
      'components': path.resolve(__dirname, 'components/'),
    },
  },

})

function viteTransformJsAsJSX () {
  return {
    name: 'load+transform-js-files-as-jsx',
    async transform (code, id) {
      if (!id.match(/(app|example|components)\/.*\.js$/)) {
        return null
      }
      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      })
    },
  }
}
