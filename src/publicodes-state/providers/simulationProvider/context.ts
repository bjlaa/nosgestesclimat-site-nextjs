'use client'
import { NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Engine, { PublicodesExpression } from 'publicodes'
import { createContext } from 'react'
import {
  DottedName,
  NGCEvaluatedNode,
  NGCRuleNode,
  Situation,
} from '../../types'

type SimulationContextType = {
  rules: NGCRules | null
  engine: Engine | null
  waterEngine: Engine | null
  pristineEngine: Engine | null
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  safeEvaluateWater: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyUiCategories: DottedName[]
  everyMosaicChildrenWithParent: Record<DottedName, DottedName[]>
  rawMissingVariables: Record<string, number>
  categories: DottedName[]
  subcategories: Record<DottedName, DottedName[]>
  addToEngineSituation: (situationToAdd: Situation) => Situation
}
export const SimulationContext = createContext<SimulationContextType>({
  rules: null,
  engine: null,
  waterEngine: null,
  pristineEngine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  safeEvaluateWater: () => null,
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyUiCategories: [],
  everyMosaicChildrenWithParent: {},
  rawMissingVariables: {},
  categories: [],
  subcategories: {},
  addToEngineSituation: () => ({}) as Situation,
})
