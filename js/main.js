/* =====================================================
   main.js —— 页面渲染与交互
   包含：主题切换 / 项目渲染 / 分类筛选 / 滚动显现 /
        汉堡菜单 / 导航高亮 / 回到顶部 / 页脚年份
   ===================================================== */

(function () {
  "use strict";

  /* ---------- 通用工具 ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================================
     主题切换：浅色 / 深色（localStorage 记忆 + 系统偏好兜底）
     ===================================================== */
  const THEME_KEY = "theme";
  const docRoot = document.documentElement;
  const themeToggle = $("#themeToggle");

  function applyTheme(theme) {
    docRoot.dataset.theme = theme;
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "切换到浅色主题" : "切换到深色主题"
    );
  }

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (e) {
    /* localStorage 不可用（如隐私模式）时静默降级 */
  }

  /* 尽早应用主题：优先读取上次选择，未记录时跟随系统偏好 */
  applyTheme(
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
  );

  themeToggle.addEventListener("click", () => {
    const next = docRoot.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      /* 同上：仅本次会话生效 */
    }
  });

  /* ---------- 滚动显现 ---------- */
  let revealObserver = null;

  function initRevealObserver() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("in"));
      return null;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );
    return observer;
  }

  revealObserver = initRevealObserver();

  function watchReveal(root = document) {
    $$(".reveal", root).forEach((el) => {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("in");
    });
  }

  /* 注册页面静态区块（项目区刊头、关于我、联系方式等）的滚动显现；
     项目卡片由 renderProjects() 在渲染时单独注册 */
  watchReveal();

  /* =====================================================
     项目区：分类筛选 + 卡片渲染
     ===================================================== */
  const grid = $("#projectGrid");
  const filterBar = $("#filterBar");
  let activeFilter = "全部";

  /* 依据数据中的 category 生成筛选按钮（含数量角标） */
  function buildFilters() {
    const counts = new Map();
    PROJECTS.forEach((p) => {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    });

    const frag = document.createDocumentFragment();
    const makeBtn = (label, count) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (label === activeFilter ? " active" : "");
      btn.type = "button";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(label === activeFilter));
      btn.dataset.filter = label;
      btn.innerHTML =
        label + '<span class="count">(' + String(count).padStart(2, "0") + ")</span>";
      return btn;
    };

    frag.appendChild(makeBtn("全部", PROJECTS.length));
    counts.forEach((count, category) => {
      frag.appendChild(makeBtn(category, count));
    });

    filterBar.replaceChildren(frag);
  }

  /* 卡片模板（date 为空时隐藏时间字段，仅显示类别） */
  function cardTemplate(project, index) {
    const no = "No." + String(index + 1).padStart(2, "0");
    const stackHtml = project.stack
      .map((s) => "<li>" + s + "</li>")
      .join("");

    const metaHtml = project.date
      ? '<time datetime="' + project.date + '">' +
        project.date.replace("-", ".") +
        "</time><span>★</span><span>" + project.category + "</span>"
      : "<span>" + project.category + "</span>";

    const tagsHtml = project.tags && project.tags.length
      ? '<ul class="card-tags" aria-label="类别标签">' +
        project.tags.map((t) => "<li>" + t + "</li>").join("") +
        "</ul>"
      : "";

    return (
      '<article class="project-card reveal' +
      (project.featured ? " featured" : "") +
      '">' +
      '<div class="card-media">' +
      '<img src="' + project.image + '" alt="《' + project.name + '》封面图" loading="lazy" />' +
      '<span class="card-cat">' + project.category + "</span>" +
      '<span class="card-no" aria-hidden="true">' + no + "</span>" +
      "</div>" +
      '<div class="card-body">' +
      '<p class="card-meta">' + metaHtml + "</p>" +
      '<h3 class="card-title">' + project.name + "</h3>" +
      tagsHtml +
      '<p class="card-intro">' + project.intro + "</p>" +
      '<ul class="card-stack" aria-label="技术栈">' + stackHtml + "</ul>" +
      "</div>" +
      "</article>"
    );
  }

  function renderProjects() {
    const list =
      activeFilter === "全部"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter);

    /* 重新从 0 编号，保证筛选后期号连续 */
    grid.innerHTML = list.map((p, i) => cardTemplate(p, i)).join("");
    watchReveal(grid);
  }

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn || btn.dataset.filter === activeFilter) return;

    activeFilter = btn.dataset.filter;
    $$(".filter-btn", filterBar).forEach((b) => {
      const isActive = b === btn;
      b.classList.toggle("active", isActive);
      b.setAttribute("aria-selected", String(isActive));
    });
    renderProjects();
  });

  /* 初始化项目区 */
  buildFilters();
  renderProjects();

  /* =====================================================
     导航：汉堡菜单 / 点击后收起 / 滚动高亮
     ===================================================== */
  const navToggle = $("#navToggle");
  const siteNav = $("#siteNav");

  function closeNav() {
    siteNav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "打开菜单");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
  });

  /* 点击菜单中的链接后自动收起（移动端） */
  siteNav.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeNav();
  });

  /* 滚动高亮当前区块对应导航项 */
  const spyLinks = $$(".nav-link[data-spy]");
  const spiedSections = spyLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && spiedSections.length) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          spyLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            )
          );
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    spiedSections.forEach((sec) => spyObserver.observe(sec));
  }

  /* =====================================================
     回到顶部 + 页脚年份
     ===================================================== */
  const backTop = $("#backTop");

  window.addEventListener(
    "scroll",
    () => {
      backTop.classList.toggle("show", window.scrollY > 600);
    },
    { passive: true }
  );

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });

  $("#year").textContent = new Date().getFullYear();
})();
