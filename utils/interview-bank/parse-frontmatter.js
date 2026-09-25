const YAML = require('yamljs')

const DIFFICULTIES = new Set(['easy', 'medium', 'hard'])

/**
 * 拆分 frontmatter 与正文
 * @returns {{ data: object, body: string, warnings: string[] }}
 */
function splitFrontmatter(raw) {
  const warnings = []
  const text = String(raw || '').replace(/^\uFEFF/, '')
  if (!text.startsWith('---')) {
    return { data: {}, body: text, warnings }
  }

  const end = text.indexOf('\n---', 3)
  if (end === -1) {
    warnings.push('frontmatter 未正确闭合，已按无 frontmatter 处理')
    return { data: {}, body: text, warnings }
  }

  const yamlBlock = text.slice(3, end).replace(/^\r?\n/, '')
  const body = text.slice(end + 4).replace(/^\r?\n/, '')
  let data = {}
  try {
    data = YAML.parse(yamlBlock) || {}
  } catch (e) {
    warnings.push(`frontmatter YAML 解析失败: ${e.message}`)
    data = {}
  }
  if (typeof data !== 'object' || Array.isArray(data)) {
    warnings.push('frontmatter 不是对象，已忽略')
    data = {}
  }
  return { data, body, warnings }
}

/**
 * 按 ## 标题切段；fenced code 内的 ## 不切分
 * @returns {Record<string, string>}
 */
function splitSections(body) {
  const lines = String(body || '').split(/\r?\n/)
  const sections = {}
  let current = '_preamble'
  sections[current] = []
  let inFence = false

  for (const line of lines) {
    if (/^(`{3,}|~{3,})/.test(line.trim())) {
      inFence = !inFence
      sections[current].push(line)
      continue
    }
    if (!inFence) {
      const m = line.match(/^##\s+(.+?)\s*$/)
      if (m) {
        current = m[1].trim()
        if (!sections[current]) sections[current] = []
        continue
      }
    }
    sections[current].push(line)
  }

  const result = {}
  Object.keys(sections).forEach((key) => {
    result[key] = sections[key].join('\n').trim()
  })
  return result
}

function normalizeTags(tags) {
  let list = []
  if (Array.isArray(tags)) {
    list = tags.map((t) => String(t).trim()).filter(Boolean)
  } else if (typeof tags === 'string' && tags.trim()) {
    list = [tags.trim()]
  }
  // 大小写不敏感去重，保留首次出现的写法
  const seen = new Set()
  const unique = []
  list.forEach((tag) => {
    const key = tag.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    unique.push(tag)
  })
  return unique
}

function normalizeReference(ref) {
  if (!ref) return undefined
  if (Array.isArray(ref)) {
    const list = ref.map((r) => String(r).trim()).filter(Boolean)
    return list.length ? list : undefined
  }
  if (typeof ref === 'string' && ref.trim()) {
    return [ref.trim()]
  }
  return undefined
}

function normalizeDifficulty(value, warnings) {
  if (value == null || value === '') return 'medium'
  const v = String(value).toLowerCase().trim()
  if (DIFFICULTIES.has(v)) return v
  warnings.push(`difficulty="${value}" 非法，已回退为 medium`)
  return 'medium'
}

function firstParagraphText(md) {
  if (!md) return ''
  const lines = md.split(/\r?\n/)
  const buf = []
  for (const line of lines) {
    if (!line.trim()) {
      if (buf.length) break
      continue
    }
    if (/^#/.test(line.trim())) continue
    buf.push(line.trim())
  }
  return buf.join(' ').trim()
}

/**
 * 解析单题 Markdown
 * @returns {{ ok: boolean, question?: object, warnings: string[], error?: string }}
 */
function parseQuestionMarkdown(raw, meta) {
  const warnings = []
  const { data, body, warnings: fmWarnings } = splitFrontmatter(raw)
  warnings.push(...fmWarnings)

  const sections = splitSections(body)
  const questionMd = sections['题目'] || ''
  const answerMd = sections['答案'] || ''

  let title = data.title ? String(data.title).trim() : ''
  if (!title) {
    title = firstParagraphText(questionMd)
  }
  if (!title) {
    title = meta.fallbackTitle || ''
  }
  if (!title) {
    return { ok: false, warnings, error: '缺少 title 且无法从 ## 题目 推断' }
  }

  let question = questionMd || title
  if (!sections['题目'] && data.title) {
    warnings.push('缺少 ## 题目，已使用 frontmatter.title')
  }
  if (!sections['答案']) {
    warnings.push('缺少 ## 答案，answer 为空')
  }

  const tags = normalizeTags(data.tags)
  const difficulty = normalizeDifficulty(data.difficulty, warnings)
  const reference = normalizeReference(data.reference)

  return {
    ok: true,
    warnings,
    question: {
      title,
      question,
      answer: answerMd,
      tags,
      difficulty,
      reference,
    },
  }
}

module.exports = {
  splitFrontmatter,
  splitSections,
  parseQuestionMarkdown,
  normalizeTags,
  normalizeDifficulty,
}
