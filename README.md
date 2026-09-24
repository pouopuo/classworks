# 王耿炫 · 个人作品集网站

一个以 **JOJO 漫画**为视觉基调的个人作品集网站：粗黑轮廓、硬边阴影、高饱和撞色与网点纸肌理。展示软件工程学习过程中的课程实训与独立项目，聚焦 AI 辅助开发与大语言模型应用方向。

纯原生 **HTML / CSS / JavaScript** 实现，零依赖、零构建、零框架。

## 功能特性

- **深浅色主题切换**：导航栏右侧按钮一键切换；深色主题基于 CSS 变量"墨 / 纸互换"实现，`localStorage` 记忆用户选择，首次访问跟随系统偏好
- **项目分类筛选**：筛选按钮由项目数据的 `category` 字段自动生成（含数量角标），点击即时过滤卡片
- **项目卡片渲染**：卡片内容完全由 `js/data.js` 数据驱动；精选项目（`featured`）自动跨两栏展示
- **滚动显现动画**：IntersectionObserver 实现区块与卡片渐入，尊重系统"减少动效"偏好
- **导航高亮（Scrollspy）**：滚动时自动高亮当前所在区块对应的导航项
- **响应式布局**：桌面 / 平板 / 手机三档适配；移动端导航折叠为汉堡菜单
- **其他细节**：回到顶部按钮、页脚年份自动更新、锚点平滑滚动（吸顶导航预留偏移）

## 快速开始

无需安装依赖，任选其一：

```bash
# 方式一：直接用浏览器打开
index.html

# 方式二：启动本地静态服务器（推荐，体验完整功能）
python -m http.server 8080
# 然后访问 http://localhost:8080
```

> 也可使用 VS Code 的 Live Server 等任意静态服务器扩展。

## 目录结构

```
lab04/
├── index.html              # 页面结构（导航 / Hero / 项目 / 关于 / 联系 / 页脚）
├── css/
│   ├── base.css            # 设计变量（色板 / 字体）/ Reset / 通用组件 / 深色主题变量
│   ├── layout.css          # 页面骨架：导航、Hero、各分区、页脚
│   ├── components.css      # 组件：Logo、卡片、筛选器、联系区等 + 深色对比度修正
│   └── responsive.css      # 响应式适配（1024 / 768 / 480 断点）
├── js/
│   ├── data.js             # 项目数据（唯一数据源）
│   └── main.js             # 渲染与交互（筛选 / 主题 / 滚动显现 / 导航等）
├── assets/images/          # 头像与项目封面图（SVG）
└── profile.md              # 个人与项目原始资料
```

## 如何维护

### 新增 / 修改项目

只需编辑 [js/data.js](js/data.js)，在 `PROJECTS` 数组末尾追加一个对象：

```js
{
  name: "项目名称",
  intro: "一句话简介",
  stack: ["技术栈1", "技术栈2"],
  date: "2026-01",            // 无日期时留空字符串，页面自动隐藏
  category: "AI 应用",        // 筛选器按钮按此字段自动生成
  tags: ["标签1", "标签2"],
  image: "assets/images/xxx.svg",
  featured: false,            // true 时卡片跨两栏展示
}
```

### 调整主题配色

全站颜色集中在 [css/base.css](css/base.css) 顶部的 `:root` 变量中（墨黑 / 纸白 / 玫红 / 薄荷绿 / 点缀金）。浅色主题改 `:root`，深色主题改 `html[data-theme="dark"]` 中对应变量即可，组件无需改动。

## 浏览器兼容

使用原生 ES6+ 与 CSS 变量、Grid、`aspect-ratio`、`clamp()` 等现代特性，支持 Chrome / Edge / Firefox / Safari 的近期版本；不支持 `-webkit-text-stroke` 的环境有实色兜底。
