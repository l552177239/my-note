/**
 * 面试题页共享状态（Sidebar 三级目录与 InterviewPage 共用）
 */
import Vue from 'vue'

export const interviewState = Vue.observable({
  /** null = 全部题目；否则为 backend / frontend / ai */
  currentType: null,
  keyword: '',
  activeQuestionId: null,
  expandAll: false,
})

export function selectAllQuestions() {
  interviewState.currentType = null
  interviewState.activeQuestionId = null
}

export function selectType(typeKey) {
  interviewState.currentType = typeKey
  interviewState.activeQuestionId = null
}

export function selectQuestion(q) {
  interviewState.currentType = q.type
  interviewState.activeQuestionId = q.id
}
