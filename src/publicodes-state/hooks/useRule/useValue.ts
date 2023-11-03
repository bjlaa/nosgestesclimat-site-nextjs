'use client'

import { useMemo } from 'react'
import getType from '../../helpers/getType'
import {
  NGCEvaluatedNode,
  NGCRuleNode,
  NodeValue,
  Situation,
} from '../../types'
type Props = {
  dottedName: string
  safeGetRule: (rule: string) => NGCRuleNode | null
  safeEvaluate: (rule: string) => NGCEvaluatedNode | null
  evaluation: NGCEvaluatedNode | null
  type: string | undefined
  questionsOfMosaic: string[]
  updateSituation: (situationToAdd: Situation) => Promise<void>
  addFoldedStep: (foldedStep: string) => void
}

export default function useValue({
  dottedName,
  safeGetRule,
  safeEvaluate,
  evaluation,
  type,
  questionsOfMosaic,
  updateSituation,
  addFoldedStep,
}: Props) {
  const value = useMemo<NodeValue>(() => evaluation?.nodeValue, [evaluation])

  const displayValue = useMemo<string | number>(() => {
    if (type === 'choices') {
      const stringValue = String(value)
      return stringValue.startsWith("'")
        ? stringValue.substring(1, stringValue.length - 1)
        : stringValue
    }
    if (type === 'boolean') {
      return value === undefined
        ? 'Pas de choix'
        : value === null || value === false || value === 'non' // Model shenanigans
        ? 'non'
        : 'oui'
    }
    if (type === 'mosaic') {
      return 'mosaic'
    }
    return Number(value)
  }, [value, type])

  const numericValue = useMemo<number>(
    () => (Number(value) === value ? value : 0),
    [value]
  )

  const setValue = async (
    value: NodeValue,
    foldedStep?: string
  ): Promise<void> => {
    if (foldedStep) addFoldedStep(foldedStep)

    return updateSituation({
      [dottedName]: checkValueValidity({ value, type }),
    })
  }

  const setDefaultAsValue = async (foldedStep?: string): Promise<void> => {
    if (foldedStep) addFoldedStep(foldedStep)

    let situationToUpdate = {}
    if (type?.includes('mosaic')) {
      situationToUpdate = questionsOfMosaic.reduce(
        (accumulator, currentValue) => {
          const rule = safeGetRule(currentValue)
          const evaluation = safeEvaluate(currentValue)
          return {
            ...accumulator,
            [currentValue]: checkValueValidity({
              value: evaluation?.nodeValue,
              type: getType({ rule, evaluation, dottedName: currentValue }),
            }),
          }
        },
        {}
      )
    } else {
      situationToUpdate = {
        [dottedName]: checkValueValidity({ value, type }),
      }
    }

    return updateSituation(situationToUpdate)
  }

  return {
    value,
    displayValue,
    numericValue,
    setValue,
    setDefaultAsValue,
  }
}

const checkValueValidity = ({
  value,
  type,
}: {
  value: any
  type: string | undefined
}): NodeValue => {
  switch (type) {
    case 'choices':
      if (!value) {
        return null
      }
      return value.startsWith("'") ? value : `'${value}'`
    case 'boolean':
      return value === undefined
        ? undefined
        : value === null || value === false || value === 'non' // Model shenanigans
        ? 'non'
        : 'oui'
    case 'mosaic':
      return 'mosaic'
    default:
      return !value ? 0 : value
  }
}
