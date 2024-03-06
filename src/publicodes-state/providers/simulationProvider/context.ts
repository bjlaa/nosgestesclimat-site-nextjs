'use client'
import { PublicodesExpression } from 'publicodes'
import { createContext } from 'react'
import {
  ComputedResults,
  DottedName,
  Engine,
  NGCEvaluatedNode,
  NGCRuleNode,
  NGCRules,
  Situation,
} from '../../types'

type SimulationContextType = {
  rules: NGCRules | null
  engine: Engine
  pristineEngine: Engine
  safeGetRule: (rule: DottedName) => NGCRuleNode | null
  safeEvaluate: (rule: PublicodesExpression) => NGCEvaluatedNode | null
  situation: Situation
  updateSituation: (situationToAdd: Situation) => Promise<void>
  deleteSituation: (situationKeysToRemove: DottedName[]) => Promise<void>
  updateProgression: (progression: number) => void
  foldedSteps: DottedName[]
  addFoldedStep: (foldedStep: DottedName) => void
  everyRules: DottedName[]
  everyInactiveRules: DottedName[]
  everyQuestions: DottedName[]
  everyNotifications: DottedName[]
  everyMosaic: DottedName[]
  everyMosaicChildren: DottedName[]
  rawMissingVariables: Record<string, number>
  categories: DottedName[]
  subcategories: Record<DottedName, DottedName[]>
  computedResults: ComputedResults
}
export default createContext<SimulationContextType>({
  rules: null,
  engine: null,
  pristineEngine: null,
  safeGetRule: () => null,
  safeEvaluate: () => null,
  situation: {},
  updateSituation: () => Promise.resolve(),
  deleteSituation: () => Promise.resolve(),
  updateProgression: () => Promise.resolve(),
  foldedSteps: [],
  addFoldedStep: () => '',
  everyRules: [],
  everyInactiveRules: [],
  everyQuestions: [],
  everyNotifications: [],
  everyMosaic: [],
  everyMosaicChildren: [],
  rawMissingVariables: {},
  categories: [],
  subcategories: {},
  computedResults: {
    bilan: 0,
    categories: {},
  },
})
