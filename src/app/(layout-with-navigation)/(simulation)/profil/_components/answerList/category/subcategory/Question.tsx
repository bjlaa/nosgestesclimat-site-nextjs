'use client'

import Link from '@/components/Link'
import ChoicesValue from '@/components/misc/ChoicesValue'
import NumberValue from '@/components/misc/NumberValue'
import Trans from '@/components/translation/Trans'
import { useRule } from '@/publicodes-state'
import MosaicQuestion from './question/MosaicQuestion'

type Props = {
  question: string
}

export default function Question({ question }: Props) {
  const { label, value, displayValue, unit, type, questionsOfMosaic } =
    useRule(question)

  return (
    <Link
      href={
        '/simulateur/bilan?question=' +
        question.replaceAll(' . ', '.').replaceAll(' ', '_')
      }
      className={`mb-2 block rounded-lg bg-white p-4 no-underline hover:underline`}>
      <span
        className={`flex w-full items-center justify-between gap-8  text-sm`}>
        <span className="flex-1">{label}</span>
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
      {questionsOfMosaic.length ? (
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {questionsOfMosaic.map((questionOfMosaic) => (
            <MosaicQuestion key={question} question={questionOfMosaic} />
          ))}
        </div>
      ) : null}
    </Link>
  )
}
