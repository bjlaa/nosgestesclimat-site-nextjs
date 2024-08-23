import { DottedName } from '@/publicodes-state/types'
import { useContext } from 'react'
import { SimulationContext } from '../../contexts/simulationContext/context'
import useCurrentSimulation from '../simulation/useCurrentSimulation'

/**
 * This is temporary and should be put to death as soon as possible
 */
export default function useTempEngine() {
  const { safeEvaluate, rules, safeGetRule, everyMosaicChildrenWithParent } =
    useContext(SimulationContext)

  const { foldedSteps } = useCurrentSimulation()

  const getRuleObject = (dottedName: DottedName): any => {
    return { ...safeEvaluate(dottedName), ...safeGetRule(dottedName) }
  }

  const extendedFoldedSteps = foldedSteps
    .map((foldedStep: any) => {
      const questionsOfMosaic = everyMosaicChildrenWithParent[foldedStep] || []
      return questionsOfMosaic.length > 0 ? questionsOfMosaic : foldedStep
    })
    .flat()

  return {
    getRuleObject,
    rules,
    extendedFoldedSteps,
  }
}
