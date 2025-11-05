// vite.config.js
import { defineConfig, loadEnv } from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import VueSetupExtend from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import viteImagemin from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/vite-plugin-imagemin/dist/index.mjs";
import { visualizer } from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/vite-plugin-compression/dist/index.mjs";
import { createHtmlPlugin } from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/vite-plugin-html/dist/index.mjs";
import fs from "fs";
import archiver from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/archiver/index.js";
import tailwindCss from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/%E4%BB%AA%E8%A1%A8%E7%BB%84%E4%BB%B6%E5%BA%93/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "D:\\\u4EEA\u8868\u7EC4\u4EF6\u5E93";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildReportplugin = process.env.npm_lifecycle_event === "build:report" ? visualizer({ open: true, brotliSize: true, gzipSize: true, filename: "dist/report.html" }) : null;
  return {
    base: "./",
    plugins: [
      vue(),
      VueSetupExtend(),
      //自动导入
      buildReportplugin,
      //打包分析工具
      // viteCompression(), // DAE代码压缩插件代码zip 压缩 插件
      //图片压缩工具
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox"
            },
            {
              name: "removeEmptyAttrs",
              active: false
            }
          ]
        }
      }),
      createHtmlPlugin({
        inject: {
          data: {
            //打包版本号
            VITE_APP_BUILD_VERSION: (/* @__PURE__ */ new Date()).valueOf()
          }
        }
      }),
      // 自定义压缩插件
      {
        name: "zip-after-build",
        closeBundle: async () => {
          const outputDir = path.resolve(__vite_injected_original_dirname, "SANGOAI");
          const zipPath = path.resolve(__vite_injected_original_dirname, "SANGOAI.zip");
          const output = fs.createWriteStream(zipPath);
          const archive = archiver("zip", {
            zlib: { level: 9 }
          });
          return new Promise((resolve2, reject) => {
            output.on("close", () => {
              console.log(`\u5DF2\u521B\u5EFA ZIP \u6587\u4EF6: ${zipPath} (${archive.pointer()} \u5B57\u8282)`);
              resolve2();
            });
            archive.on("error", (err) => {
              reject(err);
            });
            archive.pipe(output);
            archive.glob("**/*", {
              cwd: outputDir
              // ignore: ['config.js'],
            });
            archive.finalize();
          });
        }
      }
    ],
    define: {
      "import.meta.env.MODE": JSON.stringify(mode),
      "import.meta.env.VITE_BUILD_TS": (/* @__PURE__ */ new Date()).valueOf(),
      "import.meta.env.VITE_DEV_IPCONFIG": {
        203: 0,
        204: 1,
        205: 2,
        206: 3
      },
      "import.meta.env.VITE_PROD_IPCONFIG": {
        203: 0,
        204: 1,
        205: 2,
        206: 3
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      },
      extensions: [".vue", ".js", ".json", ".ts", ".tsx", ".jsx"]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./static/sangoaicomment.scss";`
        }
      },
      postcss: {
        plugins: [tailwindCss, autoprefixer]
      }
    },
    server: {
      host: true,
      hmr: true,
      strictPort: false,
      port: env.VITE_APP_PROP || 8080,
      open: true,
      proxy: {
        "/dpi": {
          target: "http://192.168.100.201:28080",
          // dev
          changeOrigin: true,
          secure: false,
          rewrite: (path2) => path2.replace(/^\/dpi/, "")
        }
      }
    },
    build: {
      outDir: "SANGOAI",
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    },
    esbuild: {
      pure: ["console.log"],
      drop: ["debugger", "console"]
    },
    prev: {}
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTRFRUFcdTg4NjhcdTdFQzRcdTRFRjZcdTVFOTNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NEVFQVx1ODg2OFx1N0VDNFx1NEVGNlx1NUU5M1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU0JUJCJUFBJUU4JUExJUE4JUU3JUJCJTg0JUU0JUJCJUI2JUU1JUJBJTkzL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlbWluJyAvLyBcdTU2RkVcdTcyNDdcdTUzOEJcdTdGMjlcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcicgLy9cdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcdTVERTVcdTUxNzdcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbicgLy9cdThENDRcdTZFOTBcdTUzOEJcdTdGMjlcdTVERTVcdTUxNzdcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IGFyY2hpdmVyIGZyb20gJ2FyY2hpdmVyJ1xyXG5pbXBvcnQgdGFpbHdpbmRDc3MgZnJvbSAndGFpbHdpbmRjc3MnXHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXHJcbiAgY29uc3QgYnVpbGRSZXBvcnRwbHVnaW4gPVxyXG4gICAgcHJvY2Vzcy5lbnYubnBtX2xpZmVjeWNsZV9ldmVudCA9PT0gJ2J1aWxkOnJlcG9ydCdcclxuICAgICAgPyB2aXN1YWxpemVyKHsgb3BlbjogdHJ1ZSwgYnJvdGxpU2l6ZTogdHJ1ZSwgZ3ppcFNpemU6IHRydWUsIGZpbGVuYW1lOiAnZGlzdC9yZXBvcnQuaHRtbCcgfSlcclxuICAgICAgOiBudWxsXHJcbiAgcmV0dXJuIHtcclxuICAgIGJhc2U6ICcuLycsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBWdWVTZXR1cEV4dGVuZCgpLCAvL1x1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG4gICAgICBidWlsZFJlcG9ydHBsdWdpbiwgLy9cdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcdTVERTVcdTUxNzdcclxuICAgICAgLy8gdml0ZUNvbXByZXNzaW9uKCksIC8vIERBRVx1NEVFM1x1NzgwMVx1NTM4Qlx1N0YyOVx1NjNEMlx1NEVGNlx1NEVFM1x1NzgwMXppcCBcdTUzOEJcdTdGMjkgXHU2M0QyXHU0RUY2XHJcbiAgICAgIC8vXHU1NkZFXHU3MjQ3XHU1MzhCXHU3RjI5XHU1REU1XHU1MTc3XHJcbiAgICAgIHZpdGVJbWFnZW1pbih7XHJcbiAgICAgICAgZ2lmc2ljbGU6IHtcclxuICAgICAgICAgIG9wdGltaXphdGlvbkxldmVsOiA3LFxyXG4gICAgICAgICAgaW50ZXJsYWNlZDogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcHRpcG5nOiB7XHJcbiAgICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vempwZWc6IHtcclxuICAgICAgICAgIHF1YWxpdHk6IDIwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcG5ncXVhbnQ6IHtcclxuICAgICAgICAgIHF1YWxpdHk6IFswLjgsIDAuOV0sXHJcbiAgICAgICAgICBzcGVlZDogNCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN2Z286IHtcclxuICAgICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcclxuICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgaW5qZWN0OiB7XHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIC8vXHU2MjUzXHU1MzA1XHU3MjQ4XHU2NzJDXHU1M0Y3XHJcbiAgICAgICAgICAgIFZJVEVfQVBQX0JVSUxEX1ZFUlNJT046IG5ldyBEYXRlKCkudmFsdWVPZigpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgICAgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5XHU1MzhCXHU3RjI5XHU2M0QyXHU0RUY2XHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAnemlwLWFmdGVyLWJ1aWxkJyxcclxuICAgICAgICBjbG9zZUJ1bmRsZTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb3V0cHV0RGlyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ1NBTkdPQUknKVxyXG4gICAgICAgICAgY29uc3QgemlwUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdTQU5HT0FJLnppcCcpXHJcblxyXG4gICAgICAgICAgY29uc3Qgb3V0cHV0ID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oemlwUGF0aClcclxuICAgICAgICAgIGNvbnN0IGFyY2hpdmUgPSBhcmNoaXZlcignemlwJywge1xyXG4gICAgICAgICAgICB6bGliOiB7IGxldmVsOiA5IH0sXHJcbiAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIG91dHB1dC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYFx1NURGMlx1NTIxQlx1NUVGQSBaSVAgXHU2NTg3XHU0RUY2OiAke3ppcFBhdGh9ICgke2FyY2hpdmUucG9pbnRlcigpfSBcdTVCNTdcdTgyODIpYClcclxuICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYXJjaGl2ZS5vbignZXJyb3InLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYXJjaGl2ZS5waXBlKG91dHB1dClcclxuICAgICAgICAgICAgYXJjaGl2ZS5nbG9iKCcqKi8qJywge1xyXG4gICAgICAgICAgICAgIGN3ZDogb3V0cHV0RGlyLFxyXG4gICAgICAgICAgICAgIC8vIGlnbm9yZTogWydjb25maWcuanMnXSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYXJjaGl2ZS5maW5hbGl6ZSgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG5cclxuICAgIGRlZmluZToge1xyXG4gICAgICAnaW1wb3J0Lm1ldGEuZW52Lk1PREUnOiBKU09OLnN0cmluZ2lmeShtb2RlKSxcclxuICAgICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX0JVSUxEX1RTJzogbmV3IERhdGUoKS52YWx1ZU9mKCksXHJcbiAgICAgICdpbXBvcnQubWV0YS5lbnYuVklURV9ERVZfSVBDT05GSUcnOiB7XHJcbiAgICAgICAgMjAzOiAwLFxyXG4gICAgICAgIDIwNDogMSxcclxuICAgICAgICAyMDU6IDIsXHJcbiAgICAgICAgMjA2OiAzLFxyXG4gICAgICB9LFxyXG4gICAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfUFJPRF9JUENPTkZJRyc6IHtcclxuICAgICAgICAyMDM6IDAsXHJcbiAgICAgICAgMjA0OiAxLFxyXG4gICAgICAgIDIwNTogMixcclxuICAgICAgICAyMDY6IDMsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgfSxcclxuICAgICAgZXh0ZW5zaW9uczogWycudnVlJywgJy5qcycsICcuanNvbicsICcudHMnLCAnLnRzeCcsICcuanN4J10sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuL3N0YXRpYy9zYW5nb2FpY29tbWVudC5zY3NzXCI7YCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBwb3N0Y3NzOiB7XHJcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kQ3NzLCBhdXRvcHJlZml4ZXJdLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiB0cnVlLFxyXG4gICAgICBobXI6IHRydWUsXHJcbiAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxyXG4gICAgICBwb3J0OiBlbnYuVklURV9BUFBfUFJPUCB8fCA4MDgwLFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvZHBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzE5Mi4xNjguMTAwLjIwMToyODA4MCcsIC8vIGRldlxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9kcGkvLCAnJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiAnU0FOR09BSScsXHJcbiAgICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgICBjb21wcmVzczoge1xyXG4gICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICBwdXJlOiBbJ2NvbnNvbGUubG9nJ10sXHJcbiAgICAgIGRyb3A6IFsnZGVidWdnZXInLCAnY29uc29sZSddLFxyXG4gICAgfSxcclxuICAgIHByZXY6IHt9LFxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUCxTQUFTLGNBQWMsZUFBZTtBQUM1UixPQUFPLFNBQVM7QUFDaEIsWUFBWSxVQUFVO0FBQ3RCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sa0JBQWtCO0FBQ3pCLFNBQVMsa0JBQWtCO0FBQzNCLE9BQU8scUJBQXFCO0FBQzVCLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8sUUFBUTtBQUNmLE9BQU8sY0FBYztBQUNyQixPQUFPLGlCQUFpQjtBQUN4QixPQUFP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
