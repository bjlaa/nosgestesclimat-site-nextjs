'use client'

import { PropsWithChildren } from 'react'

import { RuleName, Rules, Situation } from '../../types'
import SimulationContext from './context'
import useCategories from './useCategories'
import useEngine from './useEngine'
import useRules from './useRules'
import useSituation from './useSituation'

type Props = {
  /**
   * A publicodes rules object
   */
  rules: Rules
  /**
   * The starting situation of engine
   */
  defaultSituation?: Situation
  /**
   * The situation object of the current simulation of the user
   */
  situation: Situation
  /**
   * A function to update the situation of the current simulation of the user (the passed situation is added to the current situation)
   */
  updateSituation: (situation: Situation) => void
  /**
   * Every answered questions of the current simulation
   */
  foldedSteps: RuleName[]
  /**
   * A function to add a question to the list of the answered questions of the current simulation
   */
  addFoldedStep: (foldedStep: string) => void
  /**
   * The order in wich we should display the categories
   */
  categoryOrder: RuleName[]
  /**
   * The root rule of the simulation
   */
  root?: RuleName
}

export default function SimulationProvider({
  children,
  rules,
  defaultSituation,
  situation: externalSituation,
  updateSituation: updateExternalSituation,
  foldedSteps,
  addFoldedStep,
  categoryOrder,
  root = 'bilan',
}: PropsWithChildren<Props>) {
  const { engine, pristineEngine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaicChildWhoIsReallyInMosaic,
  } = useRules({
    // NOTE(@EmileRolley): why do we need to use a engine here instead of provided rules?
    engine: pristineEngine,
  })

  const { situation, updateSituation, initialized } = useSituation({
    engine,
    everyRules,
    defaultSituation,
    externalSituation,
    updateExternalSituation,
  })

  const { categories, subcategories } = useCategories({
    engine: pristineEngine,
    root,
    safeGetRule,
    order: categoryOrder,
  })

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeGetRule,
        safeEvaluate,
        situation,
        updateSituation,
        foldedSteps,
        //TODO: should clean a bit
        addFoldedStep: (foldedStep) => {
          if (!foldedSteps.includes(foldedStep)) {
            addFoldedStep(foldedStep)
          }
        },
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyMosaicChildWhoIsReallyInMosaic,
        categories,
        subcategories,
      }}>
      {initialized ? children : null}
    </SimulationContext.Provider>
  )
}
