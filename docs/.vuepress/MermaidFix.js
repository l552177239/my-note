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
      error: undefined,
      zoomOpen: false,
      scale: 1,
      translateX: 0,
      translateY: 0,
      dragging: false,
      dragStart: null
    }
  },
  computed: {
    graphData () {
      if (this.graph) return this.graph
      if (this.$slots.default && this.$slots.default[0]) {
        return this.$slots.default[0].text
      }
      return ''
    },
    zoomTransform () {
      return 'translate(' + this.translateX + 'px, ' + this.translateY + 'px) scale(' + this.scale + ')'
    }
  },
  watch: {
    zoomOpen (open) {
      if (typeof document === 'undefined') return
      document.body.style.overflow = open ? 'hidden' : ''
      if (open) {
        document.addEventListener('keydown', this.onKeydown)
      } else {
        document.removeEventListener('keydown', this.onKeydown)
        this.resetZoom()
      }
    }
  },
  beforeDestroy () {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeydown)
      document.body.style.overflow = ''
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

    const children = [
      h('div', {
        class: ['mermaid-diagram'],
        attrs: {
          title: '点击放大查看'
        },
        domProps: {
          innerHTML: this.svg
        },
        on: {
          click: this.openZoom
        }
      }),
      h('div', {
        class: ['mermaid-zoom-hint']
      }, ['点击放大'])
    ]

    if (this.zoomOpen) {
      children.push(this.renderZoomOverlay(h))
    }

    return h('div', {
      class: ['mermaid-wrap']
    }, children)
  },
  mounted () {
    this.renderDiagram()
  },
  methods: {
    fail (e) {
      this.error = (e && (e.str || e.message)) || String(e)
    },
    resetZoom () {
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
      this.dragging = false
      this.dragStart = null
    },
    openZoom () {
      this.resetZoom()
      this.zoomOpen = true
    },
    closeZoom () {
      this.zoomOpen = false
    },
    onKeydown (e) {
      if (e.key === 'Escape') this.closeZoom()
    },
    onWheel (e) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const next = Math.min(5, Math.max(0.4, this.scale + delta))
      this.scale = Math.round(next * 100) / 100
    },
    onPointerDown (e) {
      if (e.button !== undefined && e.button !== 0) return
      this.dragging = true
      this.dragStart = {
        x: e.clientX,
        y: e.clientY,
        ox: this.translateX,
        oy: this.translateY
      }
    },
    onPointerMove (e) {
      if (!this.dragging || !this.dragStart) return
      this.translateX = this.dragStart.ox + (e.clientX - this.dragStart.x)
      this.translateY = this.dragStart.oy + (e.clientY - this.dragStart.y)
    },
    onPointerUp () {
      this.dragging = false
      this.dragStart = null
    },
    zoomIn () {
      this.scale = Math.min(5, Math.round((this.scale + 0.2) * 100) / 100)
    },
    zoomOut () {
      this.scale = Math.max(0.4, Math.round((this.scale - 0.2) * 100) / 100)
    },
    renderZoomOverlay (h) {
      return h('div', {
        class: ['mermaid-zoom-overlay'],
        on: {
          click: (e) => {
            if (e.target === e.currentTarget) this.closeZoom()
          }
        }
      }, [
        h('div', {
          class: ['mermaid-zoom-toolbar']
        }, [
          h('button', {
            attrs: { type: 'button', title: '放大' },
            on: { click: this.zoomIn }
          }, ['+']),
          h('button', {
            attrs: { type: 'button', title: '缩小' },
            on: { click: this.zoomOut }
          }, ['−']),
          h('button', {
            attrs: { type: 'button', title: '重置' },
            on: { click: this.resetZoom }
          }, ['重置']),
          h('span', { class: ['mermaid-zoom-scale'] }, [Math.round(this.scale * 100) + '%']),
          h('button', {
            class: ['mermaid-zoom-close'],
            attrs: { type: 'button', title: '关闭 (Esc)' },
            on: { click: this.closeZoom }
          }, ['×'])
        ]),
        h('div', {
          class: {
            'mermaid-zoom-stage': true,
            'is-dragging': this.dragging
          },
          on: {
            wheel: this.onWheel,
            mousedown: this.onPointerDown,
            mousemove: this.onPointerMove,
            mouseup: this.onPointerUp,
            mouseleave: this.onPointerUp,
            touchstart: (e) => {
              if (e.touches && e.touches[0]) {
                this.onPointerDown({
                  button: 0,
                  clientX: e.touches[0].clientX,
                  clientY: e.touches[0].clientY
                })
              }
            },
            touchmove: (e) => {
              if (e.touches && e.touches[0]) {
                e.preventDefault()
                this.onPointerMove({
                  clientX: e.touches[0].clientX,
                  clientY: e.touches[0].clientY
                })
              }
            },
            touchend: this.onPointerUp
          }
        }, [
          h('div', {
            class: ['mermaid-zoom-canvas'],
            style: {
              transform: this.zoomTransform
            },
            domProps: {
              innerHTML: this.svg
            }
          })
        ]),
        h('div', {
          class: ['mermaid-zoom-tip']
        }, ['滚轮缩放 · 拖拽平移 · Esc 关闭'])
      ])
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
