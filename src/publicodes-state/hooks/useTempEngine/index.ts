import getQuestionsOfMosaic from '@/publicodes-state/helpers/getQuestionsOfMosaic'
import { DottedName } from '@/publicodes-state/types'
import { useContext } from 'react'
import simulationContext from '../../providers/simulationProvider/context'

/**
 * This is temporary and should be put to death as soon as possible.
 * It is only used in the actions pages.
 */
export default function useTempEngine() {
  const {
    safeEvaluate,
    deleteSituation,
    rules,
    safeGetRule,
    foldedSteps,
    everyMosaicChildren,
  } = useContext(simulationContext) ?? {}

  const getRuleObject = (dottedName: DottedName): any => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  const extendedFoldedSteps = foldedSteps
    .map((foldedStep) => {
      const questionsOfMosaic = getQuestionsOfMosaic({
        dottedName: foldedStep,
        everyMosaicChildren,
      })
      return questionsOfMosaic.length > 0 ? questionsOfMosaic : foldedStep
    })
    .flat()

  return {
    deleteSituation,
    getRuleObject,
    rules,
    extendedFoldedSteps,
  }
}
