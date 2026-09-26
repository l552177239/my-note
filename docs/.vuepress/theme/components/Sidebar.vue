<template>
  <aside class="sidebar">
    <div class="blogger" v-if="blogger">
      <img :src="blogger.avatar" />
      <div class="blogger-info">
        <h3>{{ blogger.name }}</h3>

        <div class="icons" v-if="blogger.social">
          <a
            :href="item.link"
            :title="item.title"
            :class="['iconfont', item.iconClass]"
            v-for="(item, index) in blogger.social.icons"
            :key="index"
            target="_blank"
          ></a>
        </div>
        <span v-else>{{ blogger.slogan }}</span>
      </div>
    </div>

    <NavLinks />

    <slot name="top" />

    <div v-if="isInterviewPractice" class="interview-sidebar-panel">
      <InterviewSideNav
        :type-groups="typeGroups"
        :current-type="interviewState.currentType"
        :active-question-id="interviewState.activeQuestionId"
        @select-all="onSelectAll"
        @select-type="onSelectType"
        @select-question="onSelectQuestion"
      />
    </div>
    <SidebarLinks v-else :depth="0" :items="items" />

    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import InterviewSideNav from '../../components/InterviewSideNav.vue'
import bank from '../../data/interview/questions.json'
import typesMod from '../../data/interview/types.js'
import {
  interviewState,
  selectAllQuestions,
  selectType,
  selectQuestion,
} from '../../data/interview/store.js'

const { INTERVIEW_TYPES } = typesMod

export default {
  name: 'Sidebar',

  components: { SidebarLinks, NavLinks, InterviewSideNav },

  props: ['items'],

  data() {
    return {
      interviewState,
      bank: bank || {},
      types: INTERVIEW_TYPES,
    }
  },

  computed: {
    blogger() {
      return this.$themeConfig.blogger
    },
    isInterviewPractice() {
      const page = this.$page || {}
      const fm = page.frontmatter || {}
      const path = page.path || ''
      return (
        fm.pageClass === 'interview-practice' ||
        path.indexOf('/interview-practice') !== -1
      )
    },
    typeGroups() {
      const kw = String(this.interviewState.keyword || '')
        .trim()
        .toLowerCase()
      return this.types.map((t) => {
        let questions = this.bank[t.key] || []
        if (kw) {
          questions = questions.filter((q) => {
            const tags = (q.tags || []).join(' ')
            const hay = [q.title, q.question, q.answer, tags]
              .join('\n')
              .toLowerCase()
            return hay.includes(kw)
          })
        }
        return {
          key: t.key,
          name: t.name,
          desc: t.desc,
          questions,
        }
      })
    },
  },

  methods: {
    onSelectAll() {
      selectAllQuestions()
    },
    onSelectType(typeKey) {
      selectType(typeKey)
    },
    onSelectQuestion(q) {
      selectQuestion(q)
      this.$nextTick(() => {
        if (typeof document === 'undefined') return
        const el = document.getElementById('iq-' + q.id)
        if (el && el.scrollIntoView) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    },
  },
}
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid var(--borderColor)
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top 0.75rem
  .blogger
    display none
    border-bottom 1px solid var(--borderColor)
    img
      width 60px
      height 60px
      border-radius 5px
      margin 0.75rem 1rem
    .blogger-info
      flex 1
      padding 0 0.3rem 0.3rem 0
      h3
        margin 0.95rem 0 0.6rem
        font-size 1.1rem
      .icons .iconfont
        font-size 1.2rem
        padding-right 0.6rem
        color #777
  .sidebar-slot
    margin-bottom -0.5rem
    font-size 0.85rem
    &.sidebar-slot-top
      padding 1.5rem 1.5rem 0
    &.sidebar-slot-bottom
      padding 0 1.5rem 1.5rem
  // 滚动交给外层 .sidebar（已有 overflow-y: auto），避免双滚动条
  .interview-sidebar-panel
    padding 0.75rem 0.85rem 1.25rem
@media (max-width $MQMobile)
  .sidebar
    .blogger
      display flex
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
