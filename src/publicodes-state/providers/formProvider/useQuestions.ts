import { PublicodesExpression } from 'publicodes'
import { useMemo } from 'react'
import getIsMissing from '../../helpers/getIsMissing'
import getQuestionsOfMosaic from '../../helpers/getQuestionsOfMosaic'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  Situation,
} from '../../types'

type Props = {
  root: string
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  categories: string[]
  subcategories: Record<string, string[]>
  situation: Situation
  foldedSteps: string[]
  everyQuestions: string[]
  everyMosaicChildren: string[]
  rawMissingVariables: Record<string, number>
}

/**
 * This is were we get all the questions of the form in the correct order
 */
export default function useQuestions({
  root,
  safeGetRule,
  safeEvaluate,
  categories,
  subcategories,
  situation,
  foldedSteps,
  everyQuestions,
  everyMosaicChildren,
  rawMissingVariables,
}: Props) {
  const whiteList = safeGetRule('ui . liste blanche')
    ? Object.values(
        safeGetRule('ui . liste blanche')?.rawNode as Record<string, string>
      )
    : []

  const blackList = safeGetRule('ui . liste noire')
    ? Object.values(
        safeGetRule('ui . liste noire')?.rawNode as Record<string, string>
      )
    : []

  const missingVariables = useMemo<Record<string, number>>(
    () => {
      const tempMissingVariables = Object.fromEntries(
        Object.entries(safeEvaluate(root)?.missingVariables || {}).filter(
          (missingVariable) => everyQuestions.includes(missingVariable[0])
        )
      )
      // We artificially set the missing variables of the whiteList to a high value
      whiteList.forEach((dottedName) => {
        tempMissingVariables[dottedName] = 10000
      })

      // We artificially set the missing variables of the blackList to a low value
      blackList.forEach((dottedName) => {
        tempMissingVariables[dottedName] = -1
      })

      return tempMissingVariables
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeEvaluate, root, everyQuestions, situation, whiteList, blackList]
  )

  const remainingQuestions = useMemo<string[]>(
    () =>
      // We take every questions
      everyQuestions
        // We remove all that are in mosaics,
        .filter(
          (question) =>
            !everyMosaicChildren.find((mosaic) => mosaic === question)
        )
        // all that are in folded steps
        .filter((question) => foldedSteps.indexOf(question) === -1)
        // and all that are not missing
        .filter((question) =>
          Object.keys(missingVariables).find((missingVariable) =>
            missingVariable.includes(question)
          )
        )
        .sort((a, b) => {
          const aSplittedName = a.split(' . ')
          const bSplittedName = b.split(' . ')

          // We first sort by category
          if (
            categories.indexOf(aSplittedName[0]) >
            categories.indexOf(bSplittedName[0])
          ) {
            return 1
          }
          if (
            categories.indexOf(aSplittedName[0]) <
            categories.indexOf(bSplittedName[0])
          ) {
            return -1
          }

          // then by subcategory
          const categoryOfBothQuestions = aSplittedName[0]
          const aCategoryAndSubcategory =
            aSplittedName[0] + ' . ' + aSplittedName[1]
          const bCategoryAndSubcategory =
            bSplittedName[0] + ' . ' + bSplittedName[1]
          if (
            subcategories[categoryOfBothQuestions].indexOf(
              aCategoryAndSubcategory
            ) >
            subcategories[categoryOfBothQuestions].indexOf(
              bCategoryAndSubcategory
            )
          ) {
            return 1
          }
          if (
            subcategories[categoryOfBothQuestions].indexOf(
              aCategoryAndSubcategory
            ) <
            subcategories[categoryOfBothQuestions].indexOf(
              bCategoryAndSubcategory
            )
          ) {
            return -1
          }

          // then by missing variables score
          return missingVariables[b] - missingVariables[a]
        }),
    [
      foldedSteps,
      categories,
      subcategories,
      missingVariables,
      everyQuestions,
      everyMosaicChildren,
    ]
  )

  const relevantAnsweredQuestions = useMemo<string[]>(
    () =>
      foldedSteps.filter((foldedStep) => {
        // checks that there is still a question associated to the folded step
        if (!everyQuestions.includes(foldedStep)) {
          return false
        }

        const isApplicable =
          safeEvaluate({ 'est applicable': foldedStep })?.nodeValue === true

        const isInMissingVariables =
          Object.keys(rawMissingVariables).includes(foldedStep)

        // even if the question is disabled, we want to display it if it's a missing variable
        // (this is the case for boolean question whose value is a condition for the parent).
        return isInMissingVariables || isApplicable
      }),
    // We want to recompute this every time the situation changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [situation, foldedSteps, safeEvaluate, everyQuestions, rawMissingVariables]
  )

  const tempRelevantQuestions = useMemo<string[]>(
    () => [
      /**
       * We add every answered questions to display and every not answered
       * questions to display to get every relevant questions
       */
      ...relevantAnsweredQuestions,
      ...remainingQuestions.filter((dottedName: DottedName) =>
        // We check again if the question is missing or not to make sure mosaic
        // are correctly assessed (this is less than ideal)
        getIsMissing({
          dottedName,
          situation,
          // FIXME: we might want to use `useMosaicQuestions` here but we need
          // to have access to the corresponding 'options'
          questionsOfMosaic: getQuestionsOfMosaic({
            dottedName,
            everyMosaicChildren,
          }),
        })
      ),
    ],
    [
      relevantAnsweredQuestions,
      remainingQuestions,
      situation,
      everyMosaicChildren,
    ]
  )

  /**
   * There is a small delay between adding a question to the answered questions
   * and removing it from the missing questions. So we need to check for
   * duplicates
   *
   * (yes, this is shit)
   */
  const relevantQuestions = useMemo<string[]>(
    () =>
      tempRelevantQuestions.filter(
        (question, index) => tempRelevantQuestions.indexOf(question) === index
      ),
    [tempRelevantQuestions]
  )

  const questionsByCategories = useMemo<Record<string, string[]>>(
    () =>
      categories.reduce(
        (accumulator: Record<string, string[]>, currentValue: string) => ({
          ...accumulator,
          [currentValue]: relevantQuestions.filter((question) =>
            question.includes(currentValue)
          ),
        }),
        {}
      ),
    [relevantQuestions, categories]
  )

  return {
    missingVariables,
    remainingQuestions,
    relevantAnsweredQuestions,
    relevantQuestions,
    questionsByCategories,
  }
}
