'use client'

import { createContext } from 'react'

type FormContextType = {
  relevantQuestions: string[]
  remainingQuestions: string[]
  relevantAnsweredQuestions: string[]
  remainingQuestionsByCategories: Record<string, string[]>
  currentQuestion: string | null
  currentCategory: string | null
  setCurrentQuestion: (question: string | null) => void
  setCurrentCategory: (category: string | null) => void
}
export default createContext<FormContextType>({
  relevantQuestions: [],
  remainingQuestions: [],
  relevantAnsweredQuestions: [],
  remainingQuestionsByCategories: {},
  currentQuestion: null,
  currentCategory: null,
  setCurrentQuestion: () => '',
  setCurrentCategory: () => '',
})
