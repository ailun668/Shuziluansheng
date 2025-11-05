# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + Vite 的船舶监控仪表盘系统(AMS - 船舶自动化监控系统),用于实时展示和监控船舶的各项关键指标数据。系统使用 Element Plus UI 框架、Pinia 状态管理、ECharts 数据可视化,并通过 MQTT WebSocket 实现实时数据通信。

## 常用命令

### 开发与构建
```bash
# 安装依赖(使用 pnpm)
pnpm install

# 开发模式 - 不同环境
pnpm run dev              # 开发环境(默认端口: 9911)
pnpm run dev:test         # 测试环境
pnpm run dev:smart        # smart环境

# 生产构建
pnpm run build            # 默认构建,输出目录: SANGOAI/
pnpm run build:amsdev     # AMS开发环境构建

# 预览构建结果
pnpm run preview          # 端口: 8080

# 构建分析报告
pnpm run build:report     # 生成可视化打包分析报告
```

注意:
- 构建完成后会自动创建 `SANGOAI.zip` 压缩包
- 包管理器使用 pnpm,不要使用 npm 或 yarn
- 开发端口通过 `.env.*` 文件中的 `VITE_APP_PROP` 配置

## 核心架构

### 1. 应用入口与初始化 (src/main.js)
- 应用初始化包含多个关键步骤:
  - Element Plus 全局注册及图标组件
  - Pinia 状态管理注册(使用两个实例)
  - Vue-i18n 国际化配置
  - 全局自定义组件库 (SangoCom)
  - 全局工具方法 (sangoai.ts)
  - PubSub 和 Mitt 事件总线
  - WebSocket/MQTT 客户端初始化
- 响应式字体缩放基于 1920px 基准宽度
- CSS 主题色通过 CSS 变量动态配置

### 2. 状态管理 (Pinia)
位置: `src/store/`
- 使用 Pinia 进行状态管理,支持持久化插件
- 主要 Store 模块:
  - `userinfo.js` - 用户信息
  - `menu.js` - 菜单状态
  - `router.js` - 路由状态
  - `vessel.js` - 船舶数据
  - `testStore.js` - 全局测试存储
- 通过 `app.config.globalProperties.sgtestStore` 全局访问

### 3. 实时数据通信 (WebSocket/MQTT)
位置: `src/axios/ws.js`
- 使用 MQTT over WebSocket 进行实时数据订阅
- 默认连接地址: `ws://192.168.110.244:8083/mqtt`
- Ws 类提供的核心方法:
  - `connect(topic)` - 订阅主题
  - `message(func)` - 接收消息
  - `disconnect()` - 断开连接
  - `error()` / `reconnect()` - 错误处理和重连
- 通过 `app.config.globalProperties.$Ws` 全局访问

### 4. AMS 监控系统模块
位置: `src/views/AMS/`

核心页面结构:
- `Echarts/index.vue` - 主仪表盘页面,展示实时监控数据
- `monitor/` - 设备监控视图
- `alarm/` - 报警管理
- `history/` - 历史数据查询
  - `history/data/` - 数据历史记录
  - `history/alarm/` - 报警历史记录
- `config/` - 系统配置
- `system/` - 系统设置
- `login/` - 登录页面

图表组件目录: `src/views/AMS/chart/`
- `gauge.vue` - 仪表盘组件
- `voltageChart.vue` - 电压图表
- `hourChart.vue` - 运行时间图表
- `airData.vue` - 气压数据显示
- `cylinder.vue` - 气缸相关数据
- `rudderChart.vue` - 舵角图表
- `simpleChart.vue` - 通用简单图表
- 其他专用图表组件

### 5. 全局组件库
位置: `src/libs/components/`
- 通过 `src/libs/index.js` 注册为全局组件
- 核心组件:
  - `Gauge` / `Gauge2` - 仪表盘显示组件
  - `Table` - 表格组件
  - `Drawer` - 抽屉组件
  - `SvgIcon` - SVG 图标组件
  - `SGbutton` - 自定义按钮组件
  - `cat` - 其他工具组件
- 在任何 Vue 组件中可直接使用,无需导入

### 6. 路由配置
位置: `src/router/index.js`
- 使用 Vue Router 4
- 通过 `app.config.globalProperties.$router` 全局访问

### 7. 工具函数库
位置: `src/utils/`
- `sangoai.ts` - 核心工具集合,通过全局 mixin 和插件注入
- `service.ts` / `serviceUrl.ts` - HTTP 请求封装
- `theme.js` - 主题管理(通过 `initThemes()` 初始化)
- `lang/index.js` - 国际化配置
- `useWs.js` - WebSocket hooks
- `export.js` - 数据导出工具
- `print.js` - 打印功能

### 8. Three.js 3D 可视化
位置: `src/components/threejs/YachtScene.vue`
- 新增的游艇场景 3D 可视化组件
- 使用 Three.js 进行 3D 渲染

### 9. 构建配置 (vite.config.js)
关键配置:
- 路径别名: `@` 指向 `src/`
- 输出目录: `SANGOAI/`
- 代理配置: `/dpi` 代理到 `http://192.168.100.201:28080`
- 插件:
  - 图片压缩 (vite-plugin-imagemin)
  - 打包分析 (rollup-plugin-visualizer)
  - 构建后自动生成 ZIP (自定义插件)
- SCSS 全局导入: `static/sangoaicomment.scss`
- 生产构建自动移除 console.log

## 数据流架构

1. **实时数据流**:
   MQTT Broker → ws.js → Pinia Store → Vue 组件 → ECharts 图表

2. **组件数据传递模式**:
   主要使用 Render 容器组件包裹图表组件,通过 props 传递数据和配置

3. **事件通信**:
   - Mitt 事件总线: `this.$emitt`
   - PubSub 订阅发布模式

## 环境变量

支持的环境文件:
- `.env.development` - 开发环境(端口 9911)
- `.env.test` - 测试环境
- `.env.smart` - Smart环境
- `.env.production` - 生产环境
- `.env.dev` - Dev环境

主要环境变量:
- `VITE_APP_PROP` - 开发服务器端口
- `VITE_APP_VITE_ENV` - 环境标识
- `VUE_APP_API_BASE_URL` - API 基础路径

## 样式系统

- 主样式框架: SCSS + TailwindCSS
- 全局样式: `src/assets/style/reset.scss`
- Element Plus 定制: `src/assets/style/element.scss`
- 主题配置: `src/assets/theme/index.scss`
- 图标字体: `src/assets/style/iconfont/`

## 开发注意事项

1. **组件开发**:
   - 仪表盘数据组件需要处理实时数据更新和性能优化
   - 使用 `Render` 组件作为容器包裹图表类组件
   - 图表范围处理使用 `processing()` 函数解析 range 字段

2. **MQTT 连接**:
   - 确保 MQTT Broker 地址正确配置
   - 注意 WebSocket 连接的生命周期管理
   - 组件卸载时需要断开连接

3. **性能优化**:
   - 图表组件避免频繁重新渲染
   - 大量数据使用虚拟滚动
   - 生产构建已配置代码分割和压缩

4. **调试**:
   - 开发模式集成 Stagewise 工具栏
   - 生产构建会移除所有 console 输出
