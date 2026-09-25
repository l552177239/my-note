const fs = require('fs')
const path = require('path')

/**
 * 解析文件名：01.HashMap.md → { seq: '01', namePart: 'HashMap' }
 */
function parseFileName(filename) {
  const base = path.basename(filename)
  if (!base.toLowerCase().endsWith('.md')) {
    return null
  }
  const withoutExt = base.slice(0, -3)
  const firstDot = withoutExt.indexOf('.')
  if (firstDot === -1) {
    return { seq: null, namePart: withoutExt, raw: withoutExt }
  }
  const maybeSeq = withoutExt.slice(0, firstDot)
  const namePart = withoutExt.slice(firstDot + 1)
  if (/^\d+$/.test(maybeSeq)) {
    return { seq: maybeSeq, namePart, raw: withoutExt }
  }
  return { seq: null, namePart: withoutExt, raw: withoutExt }
}

function slugify(input) {
  return String(input || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item'
}

/**
 * 扫描题库根目录：<type>/<category>/*.md（不递归更深）
 * @returns {{ files: Array, warnings: string[] }}
 */
function scanInterviewBank(bankRoot, allowedTypes) {
  const warnings = []
  const files = []
  const typeSet = new Set(allowedTypes)

  if (!fs.existsSync(bankRoot)) {
    warnings.push(`题库目录不存在: ${bankRoot}`)
    return { files, warnings }
  }

  const typeDirs = fs.readdirSync(bankRoot, { withFileTypes: true })
  typeDirs.forEach((typeEnt) => {
    if (!typeEnt.isDirectory() || typeEnt.name.startsWith('.')) return
    const typeKey = typeEnt.name
    if (!typeSet.has(typeKey)) {
      warnings.push(`未登记的面试类型目录，已跳过: ${typeKey}`)
      return
    }

    const typePath = path.join(bankRoot, typeKey)
    const categoryDirs = fs.readdirSync(typePath, { withFileTypes: true })
    categoryDirs.forEach((catEnt) => {
      if (!catEnt.isDirectory() || catEnt.name.startsWith('.')) return
      const category = catEnt.name
      const catPath = path.join(typePath, category)
      const entries = fs.readdirSync(catPath, { withFileTypes: true })

      entries.forEach((ent) => {
        const full = path.join(catPath, ent.name)
        if (ent.isDirectory()) {
          warnings.push(`忽略更深子目录: ${typeKey}/${category}/${ent.name}/`)
          return
        }
        if (!ent.isFile()) return
        if (ent.name.toLowerCase() === 'readme.md') return
        if (!ent.name.toLowerCase().endsWith('.md')) return

        const parsed = parseFileName(ent.name)
        if (!parsed) return

        files.push({
          type: typeKey,
          category,
          filePath: full,
          fileName: ent.name,
          seq: parsed.seq,
          namePart: parsed.namePart,
          relativePath: path.join(typeKey, category, ent.name).replace(/\\/g, '/'),
        })
      })
    })
  })

  return { files, warnings }
}

module.exports = {
  scanInterviewBank,
  parseFileName,
  slugify,
}
