<template>
  <div class="interview-type-switcher" role="tablist" aria-label="面试类型">
    <div class="interview-type-switcher__track">
      <button
        v-for="t in types"
        :key="t.key"
        type="button"
        role="tab"
        class="interview-type-switcher__btn"
        :class="{ 'is-active': value === t.key }"
        :aria-selected="value === t.key ? 'true' : 'false'"
        :title="t.desc"
        @click="$emit('input', t.key)"
      >
        <span class="interview-type-switcher__name">{{ t.name }}</span>
        <span v-if="counts[t.key] != null" class="interview-type-switcher__count">{{ counts[t.key] }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InterviewTypeSwitcher',
  props: {
    value: { type: String, required: true },
    types: { type: Array, required: true },
    counts: { type: Object, default: () => ({}) },
  },
}
</script>

<style scoped>
.interview-type-switcher {
  width: 100%;
}

.interview-type-switcher__track {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.interview-type-switcher__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--borderColor, #eaecef);
  border-radius: 4px;
  background: var(--mainBg, #fff);
  color: var(--textColor, #2c3e50);
  cursor: pointer;
  font-size: 0.92rem;
  line-height: 1.4;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
  flex-shrink: 0;
}

.interview-type-switcher__btn:hover {
  border-color: var(--accentColor, #3eaf7c);
}

.interview-type-switcher__btn.is-active {
  border-color: var(--accentColor, #3eaf7c);
  background: rgba(62, 175, 124, 0.12);
  color: var(--accentColor, #3eaf7c);
  font-weight: 600;
}

.interview-type-switcher__count {
  font-size: 0.78rem;
  opacity: 0.75;
}

@media (max-width: 640px) {
  .interview-type-switcher__track {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    padding-bottom: 0.15rem;
  }

  .interview-type-switcher__track::-webkit-scrollbar {
    height: 4px;
  }

  .interview-type-switcher__track::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }
}
</style>
