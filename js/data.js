/* =====================================================
   data.js —— 项目数据（唯一数据源，内容取自 profile.md）
   新增项目：在数组末尾追加一个对象即可，
   分类筛选器会根据 category 字段自动生成。
   字段说明：
     name     项目名称
     intro    一句话简介
     stack    技术栈标签数组
     date     完成时间（YYYY-MM）；资料未提供时留空字符串，页面会自动隐藏
     category 类别（用于筛选）
     tags     类别标签数组（展示在项目名称下方，1~2 个简洁标签）
     image    封面图路径
     featured 是否精选（精选卡片在网格中跨两栏展示）
   ===================================================== */

const PROJECTS = [
  {
    name: "校园图书借阅管理系统",
    intro:
      "4 人团队开发的校园图书借阅后台管理系统，面向管理员与学生两类角色，实现图书上架、借阅归还、逾期提醒与借阅记录统计。本人负责后端接口开发、数据库设计与 RBAC 权限模块，并以 Redis 缓存热门图书数据。",
    stack: ["Java", "SpringBoot", "MyBatis-Plus", "MySQL", "Redis", "Vue2"],
    date: "",
    category: "后端开发",
    image: "assets/images/project-books.svg",
    tags: ["Web 应用", "后端开发"],
    featured: true,
  },
  {
    name: "在线影评数据爬虫与可视化分析",
    intro:
      "独立开发的影评数据爬虫程序：抓取公开电影短评并清洗去重，利用 jieba 分词做情感极性判断，生成评论词云、评分分布柱状图，累计采集上万条数据。",
    stack: ["Python", "Requests", "BeautifulSoup", "Pandas", "Matplotlib", "Jieba"],
    date: "",
    category: "数据可视化",
    image: "assets/images/project-filmlab.svg",
    tags: ["数据可视化", "数据分析"],
    featured: false,
  },
  {
    name: "个人博客网站",
    intro:
      "独立开发的轻量化全栈博客：支持文章发布、Markdown 渲染、评论与分类标签，前端做路由守卫与请求封装，后端使用 Express 与 MySQL，已部署至云服务器在线访问。",
    stack: ["Vue3", "Vite", "Pinia", "Express", "MySQL"],
    date: "",
    category: "Web 全栈",
    image: "assets/images/project-blog.svg",
    tags: ["Web 应用", "全栈项目"],
    featured: false,
  },
  {
    name: "轻记账",
    intro:
      "面向日常生活场景的极简记账微信小程序，支持语音快捷记账、月度收支统计与预算提醒，使用微信云开发完成数据存储与后端能力。",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    date: "2025-04",
    category: "移动端",
    image: "assets/images/project-ledger.svg",
    tags: ["移动应用", "小程序"],
    featured: false,
  },
  {
    name: "拾光集市",
    intro:
      "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信与信用评分功能，从需求梳理、界面设计到主要接口开发均独立完成，上线后注册用户超过 300 人。",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    date: "2025-09",
    category: "Web 全栈",
    image: "assets/images/project-market.svg",
    tags: ["Web 应用", "全栈项目"],
    featured: false,
  },
  {
    name: "城市脉搏",
    intro:
      "城市实时交通与天气数据可视化大屏：多数据源轮询聚合，结合 SVG 图表、Canvas 粒子地图与响应式布局，集中展示交通、天气与城市运行信息。",
    stack: ["TypeScript", "Canvas", "SVG", "ECharts", "HTML/CSS"],
    date: "2026-03",
    category: "数据可视化",
    image: "assets/images/project-city.svg",
    tags: ["数据可视化", "大屏"],
    featured: true,
  },
  {
    name: "课语通",
    intro:
      "基于大语言模型的课程问答助手：上传课程资料后建立知识索引，通过 RAG 与向量检索结合课程内容回答问题，提供引用出处与知识点小测，辅助快速复习。",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "LLM API", "Streamlit"],
    date: "2026-07",
    category: "AI 应用",
    image: "assets/images/project-course.svg",
    tags: ["AI 应用", "大语言模型"],
    featured: false,
  },
];
