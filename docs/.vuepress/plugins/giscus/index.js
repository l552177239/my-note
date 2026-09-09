const { resolve } = require('path')

/**
 * VuePress 1.x Giscus 评论插件（替代 Utterances）
 * 需先在 https://giscus.app 配置并安装 GitHub App 到评论仓库
 *
 * 注意：VuePress 会对 define 的值再做一次 JSON.stringify，
 * 这里必须传原始字符串，不能自行 stringify，否则属性值会带多余引号。
 */
module.exports = (options = {}) => ({
  name: 'local-giscus',
  define: {
    GISCUS_REPO: options.repo || '',
    GISCUS_REPO_ID: options.repoId || '',
    GISCUS_CATEGORY: options.category || '',
    GISCUS_CATEGORY_ID: options.categoryId || '',
    GISCUS_MAPPING: options.mapping || 'pathname',
    GISCUS_STRICT: options.strict === true || options.strict === '1' ? '1' : '0',
    GISCUS_REACTIONS:
      options.reactionsEnabled === false || options.reactionsEnabled === '0'
        ? '0'
        : '1',
    GISCUS_EMIT_METADATA:
      options.emitMetadata === true || options.emitMetadata === '1' ? '1' : '0',
    GISCUS_INPUT_POSITION: options.inputPosition || 'bottom',
    GISCUS_THEME: options.theme || 'preferred_color_scheme',
    GISCUS_LANG: options.lang || 'zh-CN',
    GISCUS_LOADING: options.loading || 'lazy',
  },
  clientRootMixin: resolve(__dirname, 'clientRootMixin.js'),
})
