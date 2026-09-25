/**
 * 面试题库类型定义（供 IDE / 后续 TS 组件引用）
 *
 * 运行时配置见同目录 types.js；构建产物见 questions.json
 */

export type InterviewDifficulty = 'easy' | 'medium' | 'hard'

export interface InterviewTypeMeta {
  key: string
  name: string
  desc: string
  default?: boolean
}

export interface InterviewQuestion {
  id: string
  type: string
  category: string
  categoryName: string
  tags: string[]
  difficulty: InterviewDifficulty
  title: string
  question: string
  answer: string
  /** 构建期预渲染的 HTML，页面用 v-html */
  questionHtml: string
  answerHtml: string
  reference?: string[]
  sourcePath: string
  // —— 二期预留（一期不读写）——
  // favorite?: boolean
  // mastery?: 'unknown' | 'learning' | 'mastered'
}

export interface InterviewBank {
  [type: string]: InterviewQuestion[]
}

/** localStorage: interview-module:v1:uiState */
export interface InterviewUiStateV1 {
  currentType: string
  expandAll: boolean
  // —— 二期预留 ——
  // favorites?: string[]
  // masteryMap?: Record<string, string>
  // practiceProgress?: unknown
}
