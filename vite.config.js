import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' // 自动导入
import viteImagemin from 'vite-plugin-imagemin' // 图片压缩
import { visualizer } from 'rollup-plugin-visualizer' //打包分析工具
import viteCompression from 'vite-plugin-compression' //资源压缩工具
import { createHtmlPlugin } from 'vite-plugin-html'
import fs from 'fs'
import archiver from 'archiver'
import tailwindCss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const buildReportplugin =
    process.env.npm_lifecycle_event === 'build:report'
      ? visualizer({ open: true, brotliSize: true, gzipSize: true, filename: 'dist/report.html' })
      : null
  return {
    base: './',
    plugins: [
      vue(),
      VueSetupExtend(), //自动导入
      buildReportplugin, //打包分析工具
      // viteCompression(), // DAE代码压缩插件代码zip 压缩 插件
      //图片压缩工具
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
            },
            {
              name: 'removeEmptyAttrs',
              active: false,
            },
          ],
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            //打包版本号
            VITE_APP_BUILD_VERSION: new Date().valueOf(),
          },
        },
      }),
      // 自定义压缩插件
      {
        name: 'zip-after-build',
        closeBundle: async () => {
          const outputDir = path.resolve(__dirname, 'SANGOAI')
          const zipPath = path.resolve(__dirname, 'SANGOAI.zip')

          const output = fs.createWriteStream(zipPath)
          const archive = archiver('zip', {
            zlib: { level: 9 },
          })

          return new Promise((resolve, reject) => {
            output.on('close', () => {
              console.log(`已创建 ZIP 文件: ${zipPath} (${archive.pointer()} 字节)`)
              resolve()
            })
            archive.on('error', (err) => {
              reject(err)
            })
            archive.pipe(output)
            archive.glob('**/*', {
              cwd: outputDir,
              // ignore: ['config.js'],
            })
            archive.finalize()
          })
        },
      },
    ],

    define: {
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.VITE_BUILD_TS': new Date().valueOf(),
      'import.meta.env.VITE_DEV_IPCONFIG': {
        203: 0,
        204: 1,
        205: 2,
        206: 3,
      },
      'import.meta.env.VITE_PROD_IPCONFIG': {
        203: 0,
        204: 1,
        205: 2,
        206: 3,
      },
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.vue', '.js', '.json', '.ts', '.tsx', '.jsx'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./static/sangoaicomment.scss" as *;`,
          api: 'modern-compiler' // 使用现代 Sass 编译器 API
        },
      },
      postcss: {
        plugins: [tailwindCss, autoprefixer],
      },
    },
    server: {
      host: true,
      hmr: true,
      strictPort: false,
      port: env.VITE_APP_PROP || 8080,
      open: true,
      proxy: {
        '/dpi': {
          target: 'http://192.168.100.201:28080', // dev
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/dpi/, ''),
        },
      },
    },

    build: {
      outDir: 'SANGOAI',
      emptyOutDir: true, // 构建前清空输出目录,避免权限问题
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    esbuild: {
      pure: ['console.log'],
      drop: ['debugger', 'console'],
    },
    prev: {},
  }
})
