import { NGCRuleNode } from '@/publicodes-state/types'
import Engine from 'publicodes'
import { useMemo } from 'react'

type Props = {
  engine: Engine
  root: string
}

export function useRules({ engine, root }: Props) {
  const parsedRules = engine.getParsedRules()
  const parsedRulesEntries = useMemo<[string, NGCRuleNode][]>(
    () => Object.entries(parsedRules),
    [parsedRules]
  )

  const everyRules = useMemo<string[]>(
    () => parsedRulesEntries.map((rule: (string | any)[]) => rule[0]),
    [parsedRulesEntries]
  )

  const everyInactiveRules = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: (string | any)[]) => rule[1].rawNode.inactif === 'oui')
        .map((rule: (string | any)[]) => rule[0]),
    [parsedRulesEntries]
  )

  const everyQuestions = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: (string | any)[]) => rule[1].rawNode.question)
        .map((question: (string | any)[]) => question[0]),
    [parsedRulesEntries]
  )

  const everyMosaic = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: (string | any)[]) => rule[1].rawNode.mosaique)
        .map((question) => question[0]),
    [parsedRulesEntries]
  )

  const everyNotifications = useMemo<string[]>(
    () =>
      parsedRulesEntries
        .filter((rule: any) => rule[1].rawNode.type === 'notification') // Model shenanigans: type is only used for notifications
        .map((question) => question[0]),
    [parsedRulesEntries]
  )
  const everyMosaicChildren = useMemo<string[]>(
    () =>
      everyMosaic.reduce<string[]>((accumulator, mosaic) => {
        const mosaicRule = engine.getRule(mosaic) as NGCRuleNode

        if (!mosaicRule.rawNode.mosaique) {
          return accumulator
        }
        const mosaicChildren = mosaicRule.rawNode.mosaique['options']?.map(
          (option: string) => {
            return everyQuestions.find((rule) => rule.endsWith(option)) || ''
          }
        )
        return [...accumulator, ...mosaicChildren]
      }, []),
    [everyMosaic, everyQuestions, engine]
  )

  const rawMissingVariables = useMemo<Record<string, number>>(() => {
    return Object.fromEntries(
      Object.entries(engine.evaluate(root)?.missingVariables || {}).filter(
        (missingVariable) => everyQuestions.includes(missingVariable[0])
      )
    )
  }, [engine, everyQuestions, root])

  return {
    everyRules,
    everyInactiveRules,
    everyQuestions,
    everyNotifications,
    everyMosaic,
    everyMosaicChildren,
    rawMissingVariables,
  }
}
