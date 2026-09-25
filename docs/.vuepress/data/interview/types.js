/**
 * 面试类型与分类显示名（构建脚本与页面共用）
 */
const INTERVIEW_TYPES = [
  {
    key: 'backend',
    name: '后端',
    desc: 'Java / MySQL / Redis / JVM / 并发 / 网络',
    default: true,
  },
  {
    key: 'frontend',
    name: '前端',
    desc: 'HTML / CSS / JS / TS / Vue / React',
  },
  {
    key: 'ai',
    name: 'AI',
    desc: 'LLM / Prompt / RAG / Agent',
  },
]

/** 技术分类 key → 显示名；未命中时回退为首字母大写 */
const CATEGORY_NAMES = {
  java: 'Java',
  mysql: 'MySQL',
  redis: 'Redis',
  jvm: 'JVM',
  spring: 'Spring',
  network: '网络',
  concurrent: '并发',
  js: 'JavaScript',
  css: 'CSS',
  html: 'HTML',
  ts: 'TypeScript',
  vue: 'Vue',
  react: 'React',
  llm: 'LLM',
  prompt: 'Prompt',
  rag: 'RAG',
  agent: 'Agent',
}

function getDefaultTypeKey() {
  const found = INTERVIEW_TYPES.find((t) => t.default)
  return (found && found.key) || 'backend'
}

function getCategoryName(category) {
  if (CATEGORY_NAMES[category]) return CATEGORY_NAMES[category]
  if (!category) return ''
  return category.charAt(0).toUpperCase() + category.slice(1)
}

module.exports = {
  INTERVIEW_TYPES,
  CATEGORY_NAMES,
  getDefaultTypeKey,
  getCategoryName,
}
