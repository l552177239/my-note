<template>
  <div class="interview-search-box">
    <label class="interview-search-box__label" for="interview-search-input">搜索</label>
    <input
      id="interview-search-input"
      class="interview-search-box__input"
      type="text"
      :value="localValue"
      placeholder="按题干 / 答案 / 标签模糊匹配…"
      autocomplete="off"
      @input="onInput"
      @keydown.esc.prevent="clear"
    />
    <button
      v-if="localValue"
      type="button"
      class="interview-search-box__clear"
      aria-label="清空搜索"
      title="清空"
      @click="clear"
    >
      ✕
    </button>
  </div>
</template>

<script>
export default {
  name: 'InterviewSearchBox',
  props: {
    value: { type: String, default: '' },
    debounce: { type: Number, default: 250 },
  },
  data() {
    return {
      localValue: this.value,
      timer: null,
    }
  },
  watch: {
    value(v) {
      if (v !== this.localValue) this.localValue = v
    },
  },
  beforeDestroy() {
    if (this.timer) clearTimeout(this.timer)
  },
  methods: {
    onInput(e) {
      this.localValue = e.target.value
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('input', this.localValue)
      }, this.debounce)
    },
    clear() {
      if (this.timer) clearTimeout(this.timer)
      this.localValue = ''
      this.$emit('input', '')
    },
  },
}
</script>

<style scoped>
.interview-search-box {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.interview-search-box__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.interview-search-box__input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.55rem 2.25rem 0.55rem 0.85rem;
  border: 1px solid var(--borderColor, #eaecef);
  border-radius: 4px;
  background: var(--mainBg, #fff);
  color: var(--textColor, #2c3e50);
  font-size: 0.95rem;
  outline: none;
}

.interview-search-box__input:focus {
  border-color: var(--accentColor, #3eaf7c);
}

.interview-search-box__clear {
  position: absolute;
  right: 0.35rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: var(--textColor, #2c3e50);
  opacity: 0.5;
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.35rem 0.5rem;
  border-radius: 3px;
}

.interview-search-box__clear:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.06);
}
</style>
