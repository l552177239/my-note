<template>
  <div class="interview-page" v-cloak>
    <!-- <p class="interview-page__desc">
      左侧目录：全部题目 → 后端/前端/AI → 具体题目；主区可搜索并展开答案。
    </p> -->

    <div class="interview-page__toolbar">
      <InterviewTypeSwitcher
        :value="typeSwitcherValue"
        :types="typesWithAll"
        :counts="typeCounts"
        @input="onTypeChange"
      />
      <InterviewSearchBox :value="ui.keyword" :debounce="250" @input="onKeywordChange" />
      <div class="interview-page__global-actions">
        <button
          type="button"
          class="action-toggle"
          :class="{ 'is-expanded': ui.expandAll }"
          :aria-pressed="ui.expandAll ? 'true' : 'false'"
          @click="toggleExpandAll"
        >
          {{ ui.expandAll ? '收起全部答案' : '展开全部答案' }}
        </button>
      </div>
    </div>

    <p class="interview-page__stats">
      共 <strong>{{ filteredQuestions.length }}</strong> 题
      <span v-if="ui.currentType"> · 「{{ currentTypeName }}」</span>
      <span v-else> · 全部类型</span>
      <span v-if="ui.keyword.trim()"> · 搜索「{{ ui.keyword.trim() }}」</span>
    </p>

    <div v-if="filteredQuestions.length" class="interview-page__list">
      <InterviewQuestionCard
        v-for="q in filteredQuestions"
        :key="q.id"
        :question="q"
        :expanded="!!expandedMap[q.id]"
        :keyword="ui.keyword"
        :highlight="ui.activeQuestionId === q.id"
        @toggle="toggleOne"
      />
    </div>

    <div v-else class="interview-page__empty">
      <template v-if="ui.keyword.trim()">没有匹配「{{ ui.keyword.trim() }}」的题目，试试其它关键词。</template>
      <template v-else>当前筛选下暂无题目。</template>
    </div>
  </div>
</template>

<script>
import bank from '../data/interview/questions.json'
import typesMod from '../data/interview/types.js'
import {
  interviewState,
  selectAllQuestions,
  selectType,
} from '../data/interview/store.js'

const { INTERVIEW_TYPES } = typesMod

const STORAGE_KEY = 'interview-module:v1:uiState'
const ALL_KEY = '__all__'

function safeGetStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    return null
  }
}

function safeSetStorage(state) {
  if (typeof window === 'undefined' || !window.localStorage) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    /* ignore */
  }
}

export default {
  name: 'InterviewPage',
  data() {
    return {
      types: INTERVIEW_TYPES,
      bank: bank || {},
      ui: interviewState,
      expandedMap: {},
      hydrated: false,
    }
  },
  computed: {
    typesWithAll() {
      return [{ key: ALL_KEY, name: '全部', desc: '全部面试类型' }].concat(
        this.types
      )
    },
    typeSwitcherValue() {
      return this.ui.currentType || ALL_KEY
    },
    typeCounts() {
      const counts = { [ALL_KEY]: 0 }
      this.types.forEach((t) => {
        const n = (this.bank[t.key] || []).length
        counts[t.key] = n
        counts[ALL_KEY] += n
      })
      return counts
    },
    currentTypeName() {
      const t = this.types.find((x) => x.key === this.ui.currentType)
      return (t && t.name) || this.ui.currentType
    },
    currentList() {
      if (!this.ui.currentType) {
        return this.types.reduce(
          (acc, t) => acc.concat(this.bank[t.key] || []),
          []
        )
      }
      return this.bank[this.ui.currentType] || []
    },
    filteredQuestions() {
      let list = this.currentList
      if (this.ui.activeQuestionId) {
        const one = list.find((q) => q.id === this.ui.activeQuestionId)
        if (one) return [one]
        // 单题可能属于其它类型，跨类型查找
        for (let i = 0; i < this.types.length; i++) {
          const found = (this.bank[this.types[i].key] || []).find(
            (q) => q.id === this.ui.activeQuestionId
          )
          if (found) return [found]
        }
      }
      const kw = this.ui.keyword.trim().toLowerCase()
      if (!kw) return list
      return list.filter((q) => {
        const tags = (q.tags || []).join(' ')
        const hay = [q.title, q.question, q.answer, tags].join('\n').toLowerCase()
        return hay.includes(kw)
      })
    },
  },
  watch: {
    filteredQuestions: {
      handler(list) {
        if (!this.hydrated) return
        this.applyExpandModeToList(list)
      },
    },
  },
  mounted() {
    const saved = safeGetStorage()
    if (saved) {
      if (saved.currentType === null || saved.currentType === undefined) {
        interviewState.currentType = null
      } else if (this.bank[saved.currentType]) {
        interviewState.currentType = saved.currentType
      }
      if (typeof saved.expandAll === 'boolean') {
        interviewState.expandAll = saved.expandAll
      }
    }
    this.hydrated = true
    this.applyExpandModeToList(this.filteredQuestions)
  },
  methods: {
    persist() {
      safeSetStorage({
        currentType: interviewState.currentType,
        expandAll: interviewState.expandAll,
      })
    },
    applyExpandModeToList(list) {
      const next = { ...this.expandedMap }
      list.forEach((q) => {
        next[q.id] = interviewState.expandAll
      })
      this.expandedMap = next
    },
    onTypeChange(type) {
      if (type === ALL_KEY) {
        selectAllQuestions()
      } else {
        selectType(type)
      }
      this.persist()
      this.$nextTick(() => {
        this.applyExpandModeToList(this.filteredQuestions)
      })
    },
    onKeywordChange(val) {
      interviewState.keyword = val
      interviewState.activeQuestionId = null
      this.$nextTick(() => {
        this.applyExpandModeToList(this.filteredQuestions)
      })
    },
    toggleOne(id) {
      this.$set(this.expandedMap, id, !this.expandedMap[id])
    },
    toggleExpandAll() {
      interviewState.expandAll = !interviewState.expandAll
      this.persist()
      this.applyExpandModeToList(this.filteredQuestions)
    },
  },
}
</script>

<style scoped>
.interview-page {
  max-width: 920px;
  width: 100%;
}

.interview-page__desc {
  margin: 0 0 1rem;
  color: var(--textColor, #2c3e50);
  opacity: 0.85;
  font-size: 0.95rem;
}

.interview-page__toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}

.interview-page__global-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.action-toggle {
  padding: 0.4rem 0.95rem;
  border: 1px solid var(--accentColor, #3eaf7c);
  border-radius: 4px;
  background: var(--accentColor, #3eaf7c);
  color: #fff;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 500;
}

.action-toggle:hover {
  filter: brightness(0.96);
}

.action-toggle.is-expanded {
  background: transparent;
  color: var(--accentColor, #3eaf7c);
  font-weight: 400;
}

.interview-page__stats {
  margin: 0 0 1rem;
  font-size: 0.88rem;
  opacity: 0.8;
}

.interview-page__list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.interview-page__empty {
  padding: 2rem 1rem;
  text-align: center;
  border: 1px dashed var(--borderColor, #eaecef);
  border-radius: 6px;
  color: var(--textColor, #2c3e50);
  opacity: 0.75;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .interview-page__global-actions {
    width: 100%;
  }

  .action-toggle {
    width: 100%;
    text-align: center;
  }
}
</style>
