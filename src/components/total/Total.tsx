'use client'

import Link from 'next/link'

import QuestionButton from '@/components/misc/QuestionButton'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { formatResultToDetailParam } from '@/helpers/url/formatResultToDetailParam'
import { useEngine, useForm, useRule, useUser } from '@/publicodes-state'
import Explanation from './_components/Explanation'
import ListToggle from './_components/ListToggle'
import Planet from './_components/Planet'
import Progress from './_components/Progress'

type Props = {
  toggleQuestionList?: () => void
}
export default function Total({ toggleQuestionList }: Props) {
  const { numericValue } = useRule('bilan')

  const { getNumericValue, getValue } = useEngine()

  const { categories } = useForm()

  const detailsParamString = formatResultToDetailParam({ categories, getValue })

  const { tutorials, hideTutorial, showTutorial, getCurrentSimulation } =
    useUser()

  const currentSimulation = getCurrentSimulation()

  const actionChoicesSumValue = Object.keys(
    currentSimulation?.actionChoices || {}
  ).reduce((acc, key) => {
    return (
      acc + (currentSimulation?.actionChoices[key] ? getNumericValue(key) : 0)
    )
  }, 0)

  const carbonFootprintValue = numericValue - actionChoicesSumValue

  const toggleOpen = () =>
    tutorials.scoreExplanation
      ? showTutorial('scoreExplanation')
      : hideTutorial('scoreExplanation')

  return (
    <div className="md:mb-2">
      <div className="relative mb-2 flex items-center gap-4 overflow-hidden rounded-lg bg-primary px-4 py-2 text-white md:justify-center md:text-center ">
        <Progress />
        <Planet />
        <Link
          href={`/fin?diapo=bilan${
            detailsParamString ? `&${detailsParamString}` : ''
          }`}
          className="z-10	text-white no-underline hover:text-white">
          <span className="block text-2xl font-bold md:text-3xl">
            {formatCarbonFootprint(carbonFootprintValue).formattedValue}{' '}
            {formatCarbonFootprint(carbonFootprintValue).unit}
          </span>
          <span className="block text-sm md:text-base">
            de CO<sub>2</sub>e / an
          </span>
        </Link>
        <QuestionButton onClick={toggleOpen} color="white" />
        {toggleQuestionList && (
          <ListToggle toggleQuestionList={toggleQuestionList} />
        )}
      </div>
      {!tutorials.scoreExplanation ? (
        <Explanation toggleOpen={toggleOpen} />
      ) : null}
    </div>
  )
}
