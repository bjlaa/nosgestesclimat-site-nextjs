'use client'

import Card from '@/design-system/layout/Card'
import { useRule } from '@/publicodes-state'
import { useContext, useState } from 'react'
import { AllOpenContext } from '../_contexts/AllOpenContext'
import RecursiveRuleNode from './RecursiveRuleNode'

type Props = {
  ruleDottedName: string
  rules: string[]
  level: number
}

export default function Subcategory({ ruleDottedName, rules, level }: Props) {
  const rule = useRule(ruleDottedName)

  const [isLocallyOpen, setIsLocallyOpen] = useState(false)

  const isAllOpen = useContext(AllOpenContext)

  const isOpen = isAllOpen || isLocallyOpen

  const isFirstLevel = level === 1

  const categoryClassName = isFirstLevel
    ? `w-[30rem] max-w-full text-white px-4 py-6`
    : ''

  return (
    <div>
      <Card
        onClick={() => setIsLocallyOpen(!isOpen)}
        className={`${categoryClassName} cursor-pointer inline-flex justify-start items-center mb-4`}
        style={isFirstLevel ? { backgroundColor: rule?.color } : {}}>
        <span role="img" aria-label="category icon" className="mr-4 text-2xl">
          {rule?.icons}
        </span>

        {isFirstLevel ? (
          <h2 className="m-0 text-white font-light">{rule.title}</h2>
        ) : (
          <h3 className="m-0">{rule.title}</h3>
        )}

        <div className={isFirstLevel ? 'ml-auto text-white' : 'ml-4'}>
          {rules.length}{' '}
          {isFirstLevel && (
            <span role="img" aria-label="Emoji bubble speech">
              💬
            </span>
          )}
          <span
            className={`inline-block ml-4 ${isFirstLevel ? 'text-white' : ''}`}>
            {!isOpen ? '▶' : '▼'}
          </span>
        </div>
      </Card>
      {isOpen && <RecursiveRuleNode rules={rules} level={level} />}
    </div>
  )
}
