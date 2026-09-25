/**
 * 扫描 interview-bank Markdown，生成 docs/.vuepress/data/interview/questions.json
 *
 * 用法:
 *   node utils/build-interview-bank.js
 *   node utils/build-interview-bank.js --strict
 */
const fs = require('fs')
const path = require('path')
const MarkdownIt = require('markdown-it')

const { INTERVIEW_TYPES, getCategoryName } = require('../docs/.vuepress/data/interview/types.js')
const { scanInterviewBank, slugify } = require('./interview-bank/scan-markdown')
const { parseQuestionMarkdown } = require('./interview-bank/parse-frontmatter')

const ROOT = path.join(__dirname, '..')
const BANK_ROOT = path.join(ROOT, 'docs', '.vuepress', 'interview-bank')
const OUT_DIR = path.join(ROOT, 'docs', '.vuepress', 'data', 'interview')
const OUT_FILE = path.join(OUT_DIR, 'questions.json')

const strict = process.argv.includes('--strict')
const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: false,
  typographer: false,
})

function buildId(type, category, seq, namePart) {
  if (seq) return `${type}-${category}-${seq}`
  return `${type}-${category}-${slugify(namePart)}`
}

function renderHtml(markdown) {
  if (!markdown || !String(markdown).trim()) return ''
  return md.render(String(markdown))
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function main() {
  const allowedTypes = INTERVIEW_TYPES.map((t) => t.key)
  const bank = {}
  allowedTypes.forEach((k) => {
    bank[k] = []
  })

  const skipped = []
  const fileWarnings = []
  const seenIds = new Set()

  const { files, warnings: scanWarnings } = scanInterviewBank(BANK_ROOT, allowedTypes)
  scanWarnings.forEach((w) => console.warn(`[interview-bank] WARN: ${w}`))

  files.forEach((file) => {
    let raw
    try {
      raw = fs.readFileSync(file.filePath, 'utf8')
    } catch (e) {
      skipped.push({ path: file.relativePath, reason: `读取失败: ${e.message}` })
      return
    }

    if (!file.seq) {
      fileWarnings.push(`${file.relativePath}: 文件名无数字序号，id 将使用 slug`)
    }

    const parsed = parseQuestionMarkdown(raw, {
      fallbackTitle: file.namePart,
    })

    parsed.warnings.forEach((w) => {
      fileWarnings.push(`${file.relativePath}: ${w}`)
    })

    if (!parsed.ok) {
      skipped.push({ path: file.relativePath, reason: parsed.error || '解析失败' })
      return
    }

    const id = buildId(file.type, file.category, file.seq, file.namePart)
    if (seenIds.has(id)) {
      skipped.push({ path: file.relativePath, reason: `id 冲突已跳过: ${id}` })
      return
    }
    seenIds.add(id)

    const q = parsed.question
    const item = {
      id,
      type: file.type,
      category: file.category,
      categoryName: getCategoryName(file.category),
      tags: q.tags,
      difficulty: q.difficulty,
      title: q.title,
      question: q.question,
      answer: q.answer,
      questionHtml: renderHtml(q.question),
      answerHtml: renderHtml(q.answer),
      sourcePath: file.relativePath,
    }
    if (q.reference) item.reference = q.reference

    bank[file.type].push(item)
  })

  allowedTypes.forEach((type) => {
    bank[type].sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return a.id.localeCompare(b.id)
    })
  })

  ensureDir(OUT_DIR)
  fs.writeFileSync(OUT_FILE, JSON.stringify(bank, null, 2) + '\n', 'utf8')

  // 控制台摘要
  console.log('\n[interview-bank] 构建完成 →', path.relative(ROOT, OUT_FILE))
  allowedTypes.forEach((type) => {
    const list = bank[type]
    const byCat = {}
    list.forEach((q) => {
      byCat[q.category] = (byCat[q.category] || 0) + 1
    })
    const dist = Object.keys(byCat)
      .sort()
      .map((c) => `${c}:${byCat[c]}`)
      .join(', ') || '(空)'
    console.log(`  - ${type}: ${list.length} 题  [${dist}]`)
  })

  if (fileWarnings.length) {
    console.log(`\n[interview-bank] 解析警告 (${fileWarnings.length}):`)
    fileWarnings.forEach((w) => console.warn('  ·', w))
  }

  if (skipped.length) {
    console.log(`\n[interview-bank] 已跳过 (${skipped.length}):`)
    skipped.forEach((s) => console.warn(`  · ${s.path} — ${s.reason}`))
  }

  if (strict && skipped.length) {
    console.error('\n[interview-bank] --strict: 存在跳过文件，退出码 1')
    process.exit(1)
  }

  console.log('')
}

main()
