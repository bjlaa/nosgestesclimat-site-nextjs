import { useMemo } from 'react'

type Props = {
  categories: string[]
  remainingQuestions: string[]
  relevantQuestions: string[]
}

export default function useProgression({
  categories,
  remainingQuestions,
  relevantQuestions,
}: Props) {
  const progression = useMemo(
    () =>
      relevantQuestions.length
        ? (relevantQuestions.length - remainingQuestions.length) /
          relevantQuestions.length
        : 0,
    [relevantQuestions, remainingQuestions]
  )

  const remainingQuestionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: remainingQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [remainingQuestions, categories]
  )

  return {
    progression,
    remainingQuestionsByCategories,
  }
}
