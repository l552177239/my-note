<template>
  <article
    class="interview-question-card"
    :class="{ 'is-highlight': highlight }"
    :id="'iq-' + question.id"
    :data-id="question.id"
  >
    <header class="interview-question-card__header">
      <div class="interview-question-card__difficulty">
        <span class="diff-badge" :class="'diff-badge--' + question.difficulty">
          {{ difficultyLabel }}
        </span>
      </div>
      <div v-if="displayTags.length" class="interview-question-card__tags">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="tech-tag"
        >{{ tag }}</span>
      </div>
      <h3
        class="interview-question-card__title"
        v-html="highlightedTitle"
      />
    </header>

    <div
      v-if="showQuestionBody"
      class="interview-question-card__question md-body"
    >
      <template v-for="(seg, i) in questionSegments">
        <div
          v-if="seg.type === 'html'"
          :key="'qh-' + i"
          class="md-segment"
          v-html="seg.content"
        />
        <Mermaid
          v-else
          :key="'qm-' + i"
          :id="'iq-' + question.id + '-q-' + i"
          :graph="seg.content"
        />
      </template>
    </div>

    <div class="interview-question-card__actions">
      <button type="button" class="btn" @click="$emit('toggle', question.id)">
        {{ expanded ? '隐藏答案' : '显示答案' }}
      </button>
    </div>

    <div v-if="expanded" class="interview-question-card__answer">
      <div class="interview-question-card__answer-label">答案</div>
      <div v-if="answerSegments.length" class="md-body">
        <template v-for="(seg, i) in answerSegments">
          <div
            v-if="seg.type === 'html'"
            :key="'ah-' + i"
            class="md-segment"
            v-html="seg.content"
          />
          <Mermaid
            v-else
            :key="'am-' + i"
            :id="'iq-' + question.id + '-a-' + i"
            :graph="seg.content"
          />
        </template>
      </div>
      <p v-else class="interview-question-card__empty-answer">暂无答案</p>
      <ul v-if="question.reference && question.reference.length" class="interview-question-card__refs">
        <li v-for="(url, i) in question.reference" :key="i">
          <a :href="url" target="_blank" rel="noopener noreferrer">{{ url }}</a>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
const DIFF_LABEL = { easy: '简单', medium: '中等', hard: '困难' }

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** 纯文本高亮 */
function highlightPlain(text, keyword) {
  const raw = String(text || '')
  const kw = String(keyword || '').trim()
  if (!kw) return escapeHtml(raw)
  const re = new RegExp('(' + escapeRegExp(kw) + ')', 'gi')
  return escapeHtml(raw).replace(re, '<mark class="interview-mark">$1</mark>')
}

/** HTML 文本节点高亮（不破坏标签） */
function highlightHtml(html, keyword) {
  const src = String(html || '')
  const kw = String(keyword || '').trim()
  if (!kw || !src) return src
  const re = new RegExp('(' + escapeRegExp(kw) + ')', 'gi')
  return src.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
    if (tag) return tag
    return text.replace(re, '<mark class="interview-mark">$1</mark>')
  })
}

/** markdown-it 转义后的 mermaid 源码还原 */
function decodeHtmlEntities(str) {
  return String(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

/**
 * 将 answerHtml / questionHtml 拆成 html + mermaid 段。
 * 面试页用 v-html，vuepress-plugin-mermaidjs 不会介入，需自行挂载 Mermaid。
 */
const MERMAID_BLOCK_RE =
  /<pre[^>]*>\s*<code[^>]*class="[^"]*language-mermaid[^"]*"[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi

function splitHtmlWithMermaid(html, keyword) {
  const src = String(html || '')
  if (!src) return []
  const parts = []
  let last = 0
  MERMAID_BLOCK_RE.lastIndex = 0
  let m
  while ((m = MERMAID_BLOCK_RE.exec(src)) !== null) {
    if (m.index > last) {
      parts.push({
        type: 'html',
        content: highlightHtml(src.slice(last, m.index), keyword),
      })
    }
    parts.push({
      type: 'mermaid',
      content: decodeHtmlEntities(m[1]).trim(),
    })
    last = m.index + m[0].length
  }
  if (last < src.length) {
    parts.push({
      type: 'html',
      content: highlightHtml(src.slice(last), keyword),
    })
  }
  return parts
}

export default {
  name: 'InterviewQuestionCard',
  props: {
    question: { type: Object, required: true },
    expanded: { type: Boolean, default: false },
    keyword: { type: String, default: '' },
    highlight: { type: Boolean, default: false },
  },
  computed: {
    difficultyLabel() {
      return DIFF_LABEL[this.question.difficulty] || this.question.difficulty
    },
    /** 分类名 + tags，大小写不敏感去重 */
    displayTags() {
      const seen = new Set()
      const out = []
      const add = (t) => {
        const raw = String(t || '').trim()
        if (!raw) return
        const key = raw.toLowerCase()
        if (seen.has(key)) return
        seen.add(key)
        out.push(raw)
      }
      add(this.question.categoryName || this.question.category)
      ;(this.question.tags || []).forEach(add)
      return out
    },
    highlightedTitle() {
      return highlightPlain(this.question.title, this.keyword)
    },
    showQuestionBody() {
      return (
        this.question.questionHtml &&
        this.question.question !== this.question.title
      )
    },
    questionSegments() {
      return splitHtmlWithMermaid(this.question.questionHtml, this.keyword)
    },
    answerSegments() {
      return splitHtmlWithMermaid(this.question.answerHtml, this.keyword)
    },
  },
}
</script>

<style scoped>
.interview-question-card {
  position: relative;
  border: 1px solid var(--borderColor, #eaecef);
  border-radius: 6px;
  padding: 1rem 1.15rem 1.1rem 1.2rem;
  background: var(--mainBg, #fff);
  border-left: 3px solid var(--accentColor, #3eaf7c);
  scroll-margin-top: 5rem;
  transition: box-shadow 0.2s, background 0.2s;
}

.interview-question-card.is-highlight {
  box-shadow: 0 0 0 2px rgba(62, 175, 124, 0.35);
  background: rgba(62, 175, 124, 0.04);
}

.interview-question-card__difficulty {
  margin-bottom: 0.45rem;
}

.diff-badge {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 3px;
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.35;
  color: #fff;
  border: none;
}

.diff-badge--easy {
  background: #3eaf7c;
}

.diff-badge--medium {
  background: #e6a23c;
}

.diff-badge--hard {
  background: #d94c4c;
}

.interview-question-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 10px;
}

.tech-tag {
  display: inline-block;
  padding: 0.12rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--textColor, #2c3e50);
  background: rgba(0, 0, 0, 0.06);
  border: none;
  opacity: 0.88;
}

.interview-question-card__title {
  margin: 0;
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.45;
  color: var(--textColor, #2c3e50);
}

.interview-question-card__question {
  margin-top: 0.65rem;
  font-size: 0.92rem;
  opacity: 0.9;
}

.interview-question-card__actions {
  margin-top: 0.75rem;
}

.btn {
  padding: 0.3rem 0.75rem;
  border: 1px solid var(--accentColor, #3eaf7c);
  border-radius: 4px;
  background: transparent;
  color: var(--accentColor, #3eaf7c);
  cursor: pointer;
  font-size: 0.88rem;
}

.btn:hover {
  background: rgba(62, 175, 124, 0.1);
}

.interview-question-card__answer {
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--borderColor, #eaecef);
}

.interview-question-card__answer-label {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.45rem;
  color: var(--accentColor, #3eaf7c);
}

.interview-question-card__empty-answer {
  margin: 0;
  opacity: 0.6;
  font-size: 0.9rem;
}

.interview-question-card__refs {
  margin: 0.75rem 0 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  word-break: break-all;
}

.md-segment {
  display: contents;
}

/* 面试答案为裸 <pre><code>，无 VuePress language- 包装；浅色下
   Prism 的 text-shadow + 主题 $codeBgColor 深色底会叠成空心字 */
.md-body >>> pre,
.md-body >>> pre[class*='language-'] {
  overflow-x: auto;
  background-color: var(--codeBg, #f6f6f6) !important;
  border-radius: 6px;
}

.md-body >>> pre code,
.md-body >>> code[class*='language-'] {
  color: var(--codeColor, #525252) !important;
  text-shadow: none !important;
  background: transparent !important;
}

.md-body >>> p:first-child {
  margin-top: 0;
}

.md-body >>> p:last-child {
  margin-bottom: 0;
}

.interview-question-card >>> mark.interview-mark,
.md-body >>> mark.interview-mark {
  background: rgba(255, 213, 79, 0.65);
  color: inherit;
  padding: 0 0.1em;
  border-radius: 2px;
}
</style>
