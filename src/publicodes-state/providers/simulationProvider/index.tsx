'use client'

import { PropsWithChildren } from 'react'

import { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import { SimulationContext } from './context'
import { useCategories } from './useCategories'
import { useEngine } from './useEngine'
import { useEngineSituation } from './useEngineSituation'
import { useRules } from './useRules'
import { useSetComputedResults } from './useSetComputedResults'

type Props = {
  rules?: NGCRules
  root?: DottedName
  shouldAlwaysDisplayChildren?: boolean
}
export default function SimulationProvider({
  rules,
  root = 'bilan',
  children,
}: PropsWithChildren<Props>) {
  const { engine, pristineEngine, safeEvaluate, safeGetRule } = useEngine(rules)

  const {
    parsedRules,
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyUiCategories,
    everyMosaicChildrenWithParent,
    rawMissingVariables,
  } = useRules({ engine: pristineEngine ?? undefined, root })

  const { categories, subcategories } = useCategories({
    parsedRules: engine?.getParsedRules(),
    everyRules,
    root,
    safeGetRule: safeGetRule ?? undefined,
  })

  const { isEngineInitialized, addToEngineSituation } = useEngineSituation({
    engine,
  })

  const { isInitialized } = useSetComputedResults({
    categories,
    isEngineInitialized,
    safeEvaluate: safeEvaluate ?? undefined,
  })

  if (!rules || !engine || !isInitialized) return children

  return (
    <SimulationContext.Provider
      value={{
        rules,
        engine,
        pristineEngine,
        safeEvaluate,
        safeGetRule,
        parsedRules,
        everyRules,
        everyInactiveRules,
        everyQuestions,
        everyNotifications,
        everyUiCategories,
        everyMosaicChildrenWithParent,
        rawMissingVariables,
        categories,
        subcategories,
        addToEngineSituation,
        isInitialized,
      }}>
      {isInitialized ? children : null}
    </SimulationContext.Provider>
  )
}
