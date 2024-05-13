import HeadingButtons from '@/components/fin/HeadingButtons'
import { formatCarbonFootprint } from '@/helpers/formatCarbonFootprint'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useForm, useRule } from '@/publicodes-state'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ValueChangeDisplay from '../misc/ValueChangeDisplay'
import Trans from '../translation/Trans'
import Progress from './_components/Progress'
import CategoriesSummary from './totalSticky/CategoriesSummary'

type Props = {
  isEndPage?: boolean
  buttons?: ('share' | 'save' | 'summary')[]
  toggleQuestionList?: () => void
}
export default function TotalSticky({
  isEndPage = false,
  buttons,
  toggleQuestionList,
}: Props) {
  const locale = useLocale()
  const { t } = useClientTranslation()

  const { numericValue } = useRule('bilan')

  const { formattedValue, unit } = formatCarbonFootprint(numericValue, {
    t,
    locale,
  })

  const [isVisible, setIsVisible] = useState(!isEndPage)
  const myElementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (myElementRef.current) {
        const { top } = myElementRef.current.getBoundingClientRect()
        if (top <= 16) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    if (isEndPage) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isEndPage])

  const { currentCategory } = useForm()
  return (
    <div
      ref={myElementRef}
      className={twMerge(
        'short:py-2 hidden flex-col gap-4 transition-opacity duration-700 lg:flex',
        isVisible ? 'visible opacity-100' : 'invisible opacity-0',
        isEndPage
          ? 'rounded-xl border-2 border-primary-100 bg-gray-100 p-4'
          : 'bg-transparent '
      )}>
      <div
        className={twMerge(
          'relative flex items-center justify-between',
          isEndPage ? 'text-black' : 'text-slate-600'
        )}>
        <div className="relative flex items-center gap-2">
          <strong className="short:text-4xl text-5xl font-black leading-none">
            {formattedValue}
          </strong>
          <div className="font-medium leading-none">
            <span className="short:text-lg short:mb-0 mb-0.5 block text-2xl leading-none">
              {unit}
            </span>
            <span className="block text-xs leading-none">
              <Trans>de C0₂e par an</Trans>
            </span>
          </div>
          <ValueChangeDisplay className="absolute bottom-2/3 left-2/3" />
        </div>

        <HeadingButtons
          size="sm"
          buttons={buttons}
          toggleQuestionList={toggleQuestionList}
        />
      </div>
      {!isEndPage && (
        <>
          <div className="relative h-0.5 bg-primary-100">
            <Progress className="bottom-0 top-auto" />
          </div>
          <CategoriesSummary />
        </>
      )}
    </div>
  )
}
