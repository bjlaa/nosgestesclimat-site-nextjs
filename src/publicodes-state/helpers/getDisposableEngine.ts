import type { DottedName, NGCRules } from '@incubateur-ademe/nosgestesclimat'
import Engine from 'publicodes'
import type { Situation } from '../types'
import { safeEvaluateHelper } from './safeEvaluateHelper'

type Props = {
  rules?: NGCRules
  situation: Situation
}

// Helper version of the useDisposableEngine hook, usable in a loop
export function getDisposableEngine({ rules, situation }: Props) {
  const engine = new Engine<DottedName>(rules, {
    strict: {
      situation: false,
      noOrphanRule: false,
    },
  }).setSituation(situation)

  const safeEvaluate = (rule: DottedName) => safeEvaluateHelper(rule, engine)

  const getValue = (dottedName: DottedName) =>
    safeEvaluate(dottedName)?.nodeValue

  return { engine, getValue, safeEvaluate }
}
