const Mermaid = {
  name: 'Mermaid',
  props: {
    id: {
      type: String,
      required: false,
      default () {
        return 'diagram_' + Date.now()
      }
    },
    graph: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      svg: undefined,
      error: undefined
    }
  },
  computed: {
    graphData () {
      if (this.graph) return this.graph
      if (this.$slots.default && this.$slots.default[0]) {
        return this.$slots.default[0].text
      }
      return ''
    }
  },
  render (h) {
    if (this.error) {
      return h('pre', {
        class: ['mermaid-error'],
        style: {
          color: '#c0392b',
          background: 'rgba(192,57,43,0.08)',
          padding: '12px',
          borderRadius: '4px',
          whiteSpace: 'pre-wrap'
        }
      }, ['Mermaid 渲染失败：' + this.error])
    }
    if (this.svg === undefined) {
      return h('div', {
        class: ['mermaid-loading'],
        style: {
          width: '40px',
          height: '40px',
          margin: '12px auto',
          background: 'rgb(66, 185, 131)'
        }
      })
    }
    return h('div', {
      class: ['mermaid-diagram'],
      domProps: {
        innerHTML: this.svg,
        style: 'width: 100%'
      }
    })
  },
  mounted () {
    this.renderDiagram()
  },
  methods: {
    fail (e) {
      this.error = (e && (e.str || e.message)) || String(e)
    },
    renderDiagram () {
      const code = (this.graphData || '').trim()
      if (!code) {
        this.error = '图表内容为空'
        return
      }

      import('mermaid/dist/mermaid.min').then((mod) => {
        const mermaid = mod.default || mod
        try {
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'default'
          })
        } catch (e) {
          // initialize may throw if called repeatedly
        }

        const renderId = (this.id || 'diagram').replace(/[^a-zA-Z0-9_-]/g, '_') + '_' + Date.now()
        try {
          const maybePromise = mermaid.render(renderId, code, (svg) => {
            this.svg = svg
          })
          // mermaid 8 解析失败时常以 Promise reject 抛出，同步 try/catch 接不住
          if (maybePromise && typeof maybePromise.then === 'function') {
            maybePromise.then((svg) => {
              if (svg && !this.svg) this.svg = svg
            }).catch((e) => this.fail(e))
          }
        } catch (e) {
          this.fail(e)
        }
      }).catch((e) => {
        this.fail(e)
      })
    }
  }
}

export default Mermaid
