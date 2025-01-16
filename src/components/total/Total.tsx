'use client'

import {
  simulateurCloseScoreInfo,
  simulateurOpenScoreInfo,
} from '@/constants/tracking/pages/simulateur'
import { getBgCategoryColor } from '@/helpers/getCategoryColorClass'
import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useForm, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ButtonBack from './total/ButtonBack'
import Category from './total/Category'
import Explanation from './total/Explanation'
import Progress from './total/Progress'
import TotalButtons from './total/TotalButtons'

export default function Total({
  toggleQuestionList,
  toggleBackHomeModal,
  toggleSaveModal,
  simulationMode = true,
}: {
  toggleQuestionList?: () => void
  toggleBackHomeModal?: () => void
  toggleSaveModal?: () => void
  simulationMode?: boolean
}) {
  const { tutorials, hideTutorial, showTutorial } = useUser()

  const { progression } = useCurrentSimulation()

  const { isIframe, isIframeOnlySimulation } = useIframe()

  const { currentCategory } = useForm()

  const currentSimulation = useCurrentSimulation()

  const router = useRouter()

  const [hasManuallyOpenedTutorial, setHasManuallyOpenedTutorial] =
    useState(false)

  function toggleOpen() {
    if (tutorials.scoreExplanation) {
      trackEvent(simulateurOpenScoreInfo)
      setHasManuallyOpenedTutorial(true)
      showTutorial('scoreExplanation')
    } else {
      trackEvent(simulateurCloseScoreInfo)
      hideTutorial('scoreExplanation')
    }
  }

  useEffect(() => {
    if (
      progression > 0.05 &&
      !tutorials.scoreExplanation &&
      !hasManuallyOpenedTutorial
    ) {
      hideTutorial('scoreExplanation')
    }
  }, [
    hideTutorial,
    progression,
    tutorials.scoreExplanation,
    hasManuallyOpenedTutorial,
  ])

  return (
    <header
      className={twMerge(
        'fixed top-0 z-50 h-16 w-full md:bg-white',
        getBgCategoryColor(currentCategory, '50'),
        !simulationMode && 'static z-0 bg-white'
      )}>
      <div
        className={twMerge(
          'relative flex h-full items-center gap-4 overflow-visible pb-3 pt-2 lg:pb-5 lg:pt-4',
          !simulationMode && 'border-b border-primary-100'
        )}>
        {simulationMode && <Progress />}

        <div className="mb-0 flex w-full max-w-6xl justify-between overflow-visible pl-1 pr-4 lg:mx-auto lg:px-4">
          <div className="relative flex items-center gap-1 lg:gap-4">
            {simulationMode && !isIframe && !isIframeOnlySimulation && (
              <ButtonBack
                onClick={
                  !currentSimulation.savedViaEmail
                    ? toggleBackHomeModal
                    : () => router.push('/')
                }
              />
            )}

            <Category category={currentCategory} />
          </div>
          {toggleQuestionList ? (
            <TotalButtons
              toggleQuestionList={toggleQuestionList}
              toggleSaveModal={toggleSaveModal}
            />
          ) : null}
        </div>
      </div>
      {!tutorials.scoreExplanation && simulationMode ? (
        <div className="relative mx-auto max-w-6xl">
          <Explanation
            toggleOpen={toggleOpen}
            isFirstToggle={
              !tutorials.scoreExplanation && !hasManuallyOpenedTutorial
            }
          />
        </div>
      ) : null}
    </header>
  )
}
