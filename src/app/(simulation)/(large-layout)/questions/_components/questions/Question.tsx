'use client'

import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'

type Props = { question: DottedName }

export default function Question({ question }: Props) {
  const { label } = useRule(question)
  return <li>{label}</li>
}