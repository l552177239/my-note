# Lious's Note

Lious 的个人知识库兼技术博客，基于 [VuePress](https://vuepress.vuejs.org/) + [vuepress-theme-vdoing](https://doc.xugaoyi.com/) 搭建。

线上地址：[https://l552177239.github.io/my-note/](https://l552177239.github.io/my-note/)

## 内容覆盖

| 分类 | 说明 |
| --- | --- |
| 前端 | HTML / CSS / JavaScript / TypeScript / Vue / React / UI 框架 |
| 后端 | Java / Python / MySQL / Redis / Node.js |
| AI | LLM、Prompt、向量库、RAG、Agent 等应用向笔记 |
| 文档 | Linux、Git、博客搭建、实用技巧等 |
| 更多 | 收藏夹、面试、随笔等 |

文章源文件位于 `docs/`，按「序号.分类」目录组织，由 vdoing 主题自动生成侧边栏与分类页。

## 环境要求

- Node.js 16+（推荐 LTS）
- [pnpm](https://pnpm.io/)（本仓库使用 pnpm 管理依赖）

## 快速上手

```bash
# 安装依赖
pnpm install

# 本地开发（Windows）
pnpm run dev:win

# 本地开发（macOS / Linux）
pnpm run dev
```

浏览器访问终端提示的本地地址（一般为 `http://localhost:8080/my-note/`）。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm run dev:win` / `pnpm run dev` | 本地开发预览 |
| `pnpm run build:win` / `pnpm run build` | 构建静态站点到 `docs/.vuepress/dist` |
| `pnpm run deploy` | 构建并推送到 `gh-pages` 分支（GitHub Pages） |
| `pnpm run editFm` | 批量编辑 Markdown frontmatter |

`predev` / `prebuild` 会先执行环境检查与 vdoing 预处理，一般无需手动调用。

## 目录结构

```text
my-note/
├── docs/                 # 博客正文与配置
│   ├── .vuepress/        # VuePress 配置、主题样式、静态资源
│   ├── 01.前端/          # 前端笔记
│   ├── 02.后端/          # 后端笔记
│   ├── 03.AI/            # AI 相关笔记
│   ├── 05.文档/          # 技术文档与技巧
│   ├── 06.收藏夹/        # 收藏与链接
│   ├── 10.更多/          # 面试、随笔等
│   └── index.md          # 首页
├── vdoing/               # 本地主题源码（可选，默认使用 npm 包）
├── utils/                # 辅助脚本（frontmatter、检查等）
├── deploy.js             # GitHub Pages 部署脚本
└── package.json
```

## 写文章

1. 在对应分类目录下新建 Markdown 文件，文件名建议带序号，例如 `09.新主题.md`。
2. 在文件头部补充 frontmatter（标题、日期、permalink、categories、tags 等），可参考同目录下已有文章。
3. 运行 `pnpm run dev:win`（或 `dev`）预览；侧边栏与分类由主题根据目录与 frontmatter 自动生成。

主题配置见：`docs/.vuepress/config.ts`。

## 部署

### GitHub Pages

```bash
pnpm run deploy
```

脚本会执行构建，并将产物强制推送到远程仓库的 `gh-pages` 分支。站点 `base` 为 `/my-note/`，与仓库名一致。

### Vercel

仓库已包含 `vercel.json`（静态资源缓存头）。如使用 Vercel，构建命令选 `pnpm run build`（或 Windows CI 用 `build:win`），输出目录为 `docs/.vuepress/dist`，并按平台配置好 `base` / 根路径。

## 技术栈

- [VuePress 1.x](https://vuepress.vuejs.org/)
- [vuepress-theme-vdoing](https://doc.xugaoyi.com/)（[作者博客](https://xugaoyi.com/)）
- 插件：全文搜索、Mermaid、一键复制、图片缩放、Sitemap 等

## License

[MIT](./LICENSE)
