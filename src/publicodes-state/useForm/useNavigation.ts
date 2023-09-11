import { useMemo } from 'react'

type Props = {
  categories: string[]
  questionsByCategories: Record<string, string[]>
  currentQuestion: string | null
  currentCategory: string | null
  setCurrentQuestion: (question: string | null) => void
  setCurrentCategory: (question: string | null) => void
  remainingQuestionsByCategories: Record<string, string[]>
}

export default function useNavigation({
  categories,
  questionsByCategories,
  currentQuestion,
  currentCategory,
  setCurrentQuestion,
  setCurrentCategory,
}: Props) {
  const currentQuestionIndex = useMemo<number>(
    () =>
      currentCategory && currentQuestion
        ? questionsByCategories?.[currentCategory]?.indexOf(currentQuestion)
        : 0,
    [questionsByCategories, currentQuestion, currentCategory]
  )

  const currentCategoryIndex = useMemo<number>(
    () => (currentCategory ? categories?.indexOf(currentCategory) : 0),
    [categories, currentCategory]
  )

  const noPrevQuestion = useMemo<boolean>(
    () => currentQuestionIndex === 0,
    [currentQuestionIndex]
  )
  const noNextQuestion = useMemo<boolean>(
    () =>
      currentCategory
        ? currentQuestionIndex ===
          questionsByCategories?.[currentCategory]?.length - 1
        : false,
    [questionsByCategories, currentQuestionIndex, currentCategory]
  )

  const noPrevCategory = useMemo<boolean>(
    () => currentCategoryIndex === 0,
    [currentCategoryIndex]
  )
  const noNextCategory = useMemo<boolean>(
    () => currentCategoryIndex === categories?.length - 1,
    [currentCategoryIndex, categories]
  )

  const gotoPrevQuestion = (): string | undefined => {
    if (noPrevQuestion || !currentCategory) return

    const newCurrentQuestion =
      questionsByCategories?.[currentCategory][currentQuestionIndex - 1]

    setCurrentQuestion(newCurrentQuestion)
    return newCurrentQuestion
  }
  const gotoNextQuestion = (): string | undefined => {
    if (noNextQuestion || !currentCategory) return

    const newCurrentQuestion =
      questionsByCategories?.[currentCategory][currentQuestionIndex + 1]

    setCurrentQuestion(newCurrentQuestion)
    return newCurrentQuestion
  }

  const gotoPrevCategory = (): string | undefined => {
    if (noPrevCategory) return

    const newCurrentCategory = categories[currentCategoryIndex - 1]
    const newCurrentQuestion =
      questionsByCategories?.[newCurrentCategory][
        questionsByCategories?.[newCurrentCategory].length - 1
      ]

    setCurrentCategory(newCurrentCategory)
    setCurrentQuestion(newCurrentQuestion)

    return newCurrentCategory
  }
  const gotoNextCategory = (): string | undefined => {
    if (noNextCategory) return

    const newCurrentCategory = categories[currentCategoryIndex + 1]

    setCurrentCategory(newCurrentCategory)
    setCurrentQuestion(null)

    return newCurrentCategory
  }

  return {
    gotoPrevQuestion,
    gotoNextQuestion,
    gotoPrevCategory,
    gotoNextCategory,
    noPrevQuestion,
    noNextQuestion,
    noPrevCategory,
    noNextCategory,
  }
}
