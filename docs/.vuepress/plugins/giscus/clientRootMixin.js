const CONTAINER_ID = 'giscus-container'

function shouldShowComments(vm) {
  const fm = (vm.$page && vm.$page.frontmatter) || {}
  if (fm.home) return false
  if (fm.comment === false || fm.comments === false) return false
  // 目录页等通常带 article: false
  if (fm.article === false && fm.comment !== true) return false
  return true
}

function mountGiscus() {
  const page = document.querySelector('main.page')
  if (!page) return false

  let container = document.getElementById(CONTAINER_ID)
  if (container) container.remove()

  container = document.createElement('div')
  container.id = CONTAINER_ID
  container.className = 'giscus-wrapper'
  page.appendChild(container)

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', GISCUS_REPO)
  script.setAttribute('data-repo-id', GISCUS_REPO_ID)
  script.setAttribute('data-category', GISCUS_CATEGORY)
  script.setAttribute('data-category-id', GISCUS_CATEGORY_ID)
  script.setAttribute('data-mapping', GISCUS_MAPPING)
  script.setAttribute('data-strict', GISCUS_STRICT)
  script.setAttribute('data-reactions-enabled', GISCUS_REACTIONS)
  script.setAttribute('data-emit-metadata', GISCUS_EMIT_METADATA)
  script.setAttribute('data-input-position', GISCUS_INPUT_POSITION)
  script.setAttribute('data-theme', GISCUS_THEME)
  script.setAttribute('data-lang', GISCUS_LANG)
  script.setAttribute('data-loading', GISCUS_LOADING)
  container.appendChild(script)
  return true
}

function removeGiscus() {
  const el = document.getElementById(CONTAINER_ID)
  if (el) el.remove()
}

export default {
  mounted() {
    this.$nextTick(() => this.refreshGiscus())
    this._giscusAfterEach = this.$router.afterEach(() => {
      this.$nextTick(() => this.refreshGiscus())
    })
  },
  beforeDestroy() {
    if (typeof this._giscusAfterEach === 'function') {
      this._giscusAfterEach()
    }
    removeGiscus()
  },
  methods: {
    refreshGiscus() {
      if (typeof window === 'undefined') return
      if (!GISCUS_REPO || !GISCUS_REPO_ID) return
      if (!shouldShowComments(this)) {
        removeGiscus()
        return
      }
      // 路由切换后 DOM 可能尚未就绪，短暂重试
      if (mountGiscus()) return
      setTimeout(() => {
        if (shouldShowComments(this)) mountGiscus()
      }, 100)
    },
  },
}
