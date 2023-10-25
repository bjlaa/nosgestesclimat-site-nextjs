'use client'

import ChoicesValue from '@/components/misc/ChoicesValue'
import NumberValue from '@/components/misc/NumberValue'
import Trans from '@/components/translation/Trans'
import { useRule } from '@/publicodes-state'

type Props = { question: string }

export default function MosaicQuestion({ question }: Props) {
  const { value, displayValue, unit, type, parent } = useRule(question)

  const { title, icons } = useRule(parent)

  return (
    <span className="relative flex justify-between rounded-lg bg-primaryLight p-4 text-sm">
      <span className="flex-1">
        {icons} {title}
      </span>
      <strong>
        {type === 'number' && (
          <NumberValue displayValue={displayValue} unit={unit} />
        )}
        {type === 'boolean' && (
          <span className="capitalize">
            <Trans>{displayValue}</Trans>
          </span>
        )}
        {type === 'choices' && (
          <ChoicesValue value={value} question={question} />
        )}
      </strong>
    </span>
  )
}
