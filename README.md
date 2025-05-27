        
# 船舶监控仪表盘系统技术文档

## 项目概述

这是一个基于 Vue 3 + Vite 的船舶监控仪表盘系统，用于实时展示和监控船舶的各项关键指标数据。系统采用现代化的前端技术栈，提供了丰富的可视化组件和实时数据监控功能。

## 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite 4.x
- **UI 框架**: Element Plus
- **状态管理**: Pinia
- **样式处理**: SCSS + TailwindCSS
- **图表库**: ECharts
- **开发语言**: TypeScript/JavaScript
- **包管理器**: pnpm

## 项目结构

```plaintext
├── src/                    # 源代码目录
│   ├── assets/             # 静态资源
│   ├── components/         # 公共组件
│   ├── views/              # 页面组件
│   │   └── AMS/           # 监控系统模块
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   └── utils/             # 工具函数
├── public/                # 公共资源
└── vite.config.js        # Vite 配置文件
```

## 核心功能模块

### 仪表盘组件 (AMS/Echarts/index.vue)

该组件是系统的核心展示模块，主要功能包括：

1. **数据监控面板**
   - VFD RPM 显示
   - 运行状态监控
   - 电机温度监测
   - 电压电流显示

2. **可视化组件**
   - 使用 Gauge 组件展示仪表盘数据
   - voltageChart 组件展示电压相关数据
   - 自适应布局设计

3. **数据交互**
   - 实时数据更新
   - 阈值警告
   - 状态切换

### 组件示例

```vue:d:\仪表组件库\src\views\AMS\Echarts\index.vue
<template>
  <div class="box">
    <el-row class="layout">
      <el-col :span="8" class="type">
        <el-row class="container">
          <el-col class="h50" :span="12">
            <Render>
              <AirData :data="dataMap.no1_main_air_reservoir_pressure"></AirData>
            </Render>
          </el-col>
          // ... existing code ...
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
```

## 开发环境配置

1. **安装依赖**
```bash
pnpm install
```

2. **开发模式**
```bash
pnpm run dev
```

3. **生产构建**
```bash
pnpm run build
```



## 环境配置

项目支持多环境配置：
- 开发环境：.env.development
- 测试环境：.env.test
- 生产环境：.env.production

## 项目特点

1. **模块化设计**
   - 组件高度复用
   - 清晰的项目结构

2. **性能优化**
   - 图片压缩
   - 代码分割
   - 按需加载

3. **开发体验**
   - 热更新
   - TypeScript 支持
   - ESLint + Prettier 代码规范

## 注意事项

1. 开发时需确保正确配置环境变量
2. 图表组件的数据更新需要注意性能优化
3. 部署时需要根据实际环境修改配置文件

## 维护说明

1. 定期更新依赖包
2. 保持代码规范
3. 及时处理性能问题
4. 做好文档维护
        