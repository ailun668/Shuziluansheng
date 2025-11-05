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

// 递归删除目录的函数，处理文件被占用的情况
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      const files = fs.readdirSync(dirPath)
      files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
          removeDir(filePath)
        } else {
          // 尝试删除文件，如果失败则重试
          try {
            fs.unlinkSync(filePath)
          } catch (err) {
            // 如果文件被锁定，重命名而不是删除
            if (err.code === 'EPERM' || err.code === 'EBUSY') {
              console.warn(`文件 ${filePath} 可能被占用，将重命名为临时文件...`)
              try {
                const tempPath = filePath + '.old'
                if (fs.existsSync(tempPath)) {
                  fs.unlinkSync(tempPath)
                }
                fs.renameSync(filePath, tempPath)
              } catch (renameErr) {
                console.warn(`无法重命名文件 ${filePath}，将在构建时覆盖`)
              }
            } else {
              throw err
            }
          }
        }
      })
      // 最后删除目录本身
      try {
        fs.rmdirSync(dirPath)
      } catch (err) {
        // 如果目录不为空（可能有些文件无法删除），继续
        if (err.code !== 'ENOTEMPTY') {
          console.warn(`无法删除目录 ${dirPath}: ${err.message}`)
        }
      }
    } catch (err) {
      console.warn(`清理输出目录时出错: ${err.message}`)
    }
  }
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const buildReportplugin =
    process.env.npm_lifecycle_event === 'build:report'
      ? visualizer({ open: true, brotliSize: true, gzipSize: true, filename: 'dist/report.html' })
      : null
  
  // 构建前清理插件
  const cleanBuildPlugin = {
    name: 'clean-build',
    buildStart() {
      if (command === 'build') {
        const outputDir = path.resolve(__dirname, 'SANGOAI')
        const zipPath = path.resolve(__dirname, 'SANGOAI.zip')
        
        console.log('正在清理输出目录...')
        // 清理输出目录
        removeDir(outputDir)
        
        // 清理旧的临时文件
        try {
          const files = fs.readdirSync(path.resolve(__dirname))
          files.forEach(file => {
            if (file.endsWith('.old')) {
              const filePath = path.resolve(__dirname, file)
              try {
                fs.unlinkSync(filePath)
              } catch (err) {
                // 忽略删除失败
              }
            }
          })
        } catch (err) {
          // 忽略错误
        }
        
        // 尝试删除旧的 ZIP 文件
        if (fs.existsSync(zipPath)) {
          try {
            fs.unlinkSync(zipPath)
          } catch (err) {
            if (err.code === 'EPERM' || err.code === 'EBUSY') {
              console.warn('ZIP 文件可能被占用，将重命名为旧版本')
              try {
                const oldZipPath = zipPath + '.old'
                if (fs.existsSync(oldZipPath)) {
                  fs.unlinkSync(oldZipPath)
                }
                fs.renameSync(zipPath, oldZipPath)
              } catch (renameErr) {
                console.warn('无法重命名 ZIP 文件，构建将继续')
              }
            }
          }
        }
      }
    }
  }

  return {
    base: './',
    plugins: [
      cleanBuildPlugin, // 首先执行清理插件
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

          // 如果 ZIP 文件已存在且被占用，先删除
          if (fs.existsSync(zipPath)) {
            try {
              fs.unlinkSync(zipPath)
            } catch (err) {
              if (err.code === 'EPERM' || err.code === 'EBUSY') {
                console.warn('ZIP 文件可能被占用，将重命名为旧版本')
                const oldZipPath = zipPath + '.old'
                try {
                  if (fs.existsSync(oldZipPath)) {
                    fs.unlinkSync(oldZipPath)
                  }
                  fs.renameSync(zipPath, oldZipPath)
                } catch (renameErr) {
                  console.error('无法重命名 ZIP 文件，请手动删除后再试')
                }
              }
            }
          }

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
      // 增加超时时间，处理大文件
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
        onwarn(warning, warn) {
          // 忽略某些警告
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return
          warn(warning)
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
