import MermaidFix from '../MermaidFix.js'

export default ({ Vue }) => {
  Vue.component('Mermaid', MermaidFix)
}
