<template>
  <nav class="interview-side-nav" aria-label="题目目录">
    <!-- 一级：全部题目 -->
    <div class="interview-side-nav__l1">
      <button
        type="button"
        class="interview-side-nav__row interview-side-nav__row--l1"
        :class="{ 'is-active': isAllActive }"
        :aria-expanded="openAll ? 'true' : 'false'"
        @click="onClickAll"
      >
        <span class="interview-side-nav__arrow" :class="{ 'is-open': openAll }">▸</span>
        <span class="interview-side-nav__label">全部题目</span>
        <span class="interview-side-nav__count">{{ totalCount }}</span>
      </button>

      <div v-show="openAll" class="interview-side-nav__l2-wrap">
        <!-- 二级：后端 / 前端 / AI -->
        <div
          v-for="group in typeGroups"
          :key="group.key"
          class="interview-side-nav__l2"
        >
          <button
            type="button"
            class="interview-side-nav__row interview-side-nav__row--l2"
            :class="{ 'is-active': isTypeActive(group.key) }"
            :aria-expanded="isTypeOpen(group.key) ? 'true' : 'false'"
            :title="group.desc"
            @click="onClickType(group)"
          >
            <span
              class="interview-side-nav__arrow"
              :class="{ 'is-open': isTypeOpen(group.key) }"
            >▸</span>
            <span class="interview-side-nav__label">{{ group.name }}</span>
            <span class="interview-side-nav__count">{{ group.questions.length }}</span>
          </button>

          <!-- 三级：具体题目 -->
          <ul v-show="isTypeOpen(group.key)" class="interview-side-nav__l3">
            <li v-for="q in group.questions" :key="q.id">
              <button
                type="button"
                class="interview-side-nav__row interview-side-nav__row--l3"
                :class="{ 'is-active': activeQuestionId === q.id }"
                :title="q.title"
                @click="$emit('select-question', q)"
              >
                <span class="interview-side-nav__abbr">{{ abbreviate(q.title) }}</span>
                <span v-if="itemTags(q).length" class="interview-side-nav__tags">
                  <span
                    v-for="tag in itemTags(q)"
                    :key="tag"
                    class="interview-side-nav__tag"
                  >{{ tag }}</span>
                </span>
              </button>
            </li>
            <li v-if="!group.questions.length" class="interview-side-nav__empty-type">
              暂无题目
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
const ABBR_LEN = 16
const MAX_TAGS = 2

export default {
  name: 'InterviewSideNav',
  props: {
    /** [{ key, name, desc, questions }] */
    typeGroups: { type: Array, default: () => [] },
    currentType: { type: String, default: null },
    activeQuestionId: { type: String, default: null },
  },
  data() {
    return {
      openAll: true,
      openTypes: {},
    }
  },
  computed: {
    totalCount() {
      return this.typeGroups.reduce((n, g) => n + g.questions.length, 0)
    },
    isAllActive() {
      return !this.currentType && !this.activeQuestionId
    },
  },
  watch: {
    typeGroups: {
      immediate: true,
      handler(groups) {
        const next = { ...this.openTypes }
        groups.forEach((g) => {
          if (next[g.key] === undefined) next[g.key] = true
        })
        this.openTypes = next
      },
    },
  },
  methods: {
    isTypeOpen(key) {
      return !!this.openTypes[key]
    },
    isTypeActive(key) {
      return this.currentType === key && !this.activeQuestionId
    },
    onClickAll() {
      if (this.isAllActive) {
        this.openAll = !this.openAll
      } else {
        this.openAll = true
        this.$emit('select-all')
      }
    },
    onClickType(group) {
      const key = group.key
      if (this.isTypeActive(key)) {
        this.$set(this.openTypes, key, !this.openTypes[key])
      } else {
        this.$set(this.openTypes, key, true)
        this.openAll = true
        this.$emit('select-type', key)
      }
    },
    abbreviate(title) {
      const t = String(title || '').trim()
      if (t.length <= ABBR_LEN) return t
      return t.slice(0, ABBR_LEN) + '…'
    },
    itemTags(q) {
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
      add(q.categoryName || q.category)
      ;(q.tags || []).forEach(add)
      return out.slice(0, MAX_TAGS)
    },
  },
}
</script>

<style scoped>
.interview-side-nav {
  font-size: 0.86rem;
  color: var(--textColor, #2c3e50);
}

.interview-side-nav__row {
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
  font-size: inherit;
  gap: 0.3rem;
}

.interview-side-nav__row:hover {
  background: rgba(62, 175, 124, 0.08);
}

.interview-side-nav__row.is-active {
  background: rgba(62, 175, 124, 0.14);
  color: var(--accentColor, #3eaf7c);
}

.interview-side-nav__row--l1 {
  padding: 0.45rem 0.5rem;
  font-weight: 700;
}

.interview-side-nav__row--l2 {
  padding: 0.38rem 0.45rem;
  font-weight: 600;
}

.interview-side-nav__row--l3 {
  flex-direction: column;
  align-items: flex-start;
  padding: 0.32rem 0.4rem;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.35;
}

.interview-side-nav__arrow {
  display: inline-block;
  font-size: 0.68rem;
  opacity: 0.55;
  transition: transform 0.15s;
  flex-shrink: 0;
}

.interview-side-nav__arrow.is-open {
  transform: rotate(90deg);
}

.interview-side-nav__label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.interview-side-nav__count {
  font-size: 0.72rem;
  font-weight: 500;
  opacity: 0.65;
  flex-shrink: 0;
}

.interview-side-nav__l2-wrap {
  padding: 0.15rem 0 0.25rem 0.35rem;
  border-left: 2px solid rgba(62, 175, 124, 0.28);
  margin: 0.15rem 0 0 0.55rem;
}

.interview-side-nav__l2 {
  margin-top: 0.15rem;
}

.interview-side-nav__l3 {
  list-style: none;
  margin: 0.1rem 0 0.35rem;
  padding: 0 0 0 0.55rem;
  border-left: 2px solid rgba(62, 175, 124, 0.18);
}

.interview-side-nav__abbr {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.interview-side-nav__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-top: 0.15rem;
}

.interview-side-nav__tag {
  font-size: 0.66rem;
  padding: 0.02rem 0.28rem;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.06);
  opacity: 0.85;
  max-width: 5em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.interview-side-nav__empty-type {
  padding: 0.25rem 0.4rem;
  opacity: 0.5;
  font-size: 0.78rem;
}
</style>
