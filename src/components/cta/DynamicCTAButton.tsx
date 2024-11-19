'use client'

import {
  homeClickCtaCommencer,
  homeClickCtaReprendre,
  homeClickCtaResultats,
} from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useIsClient } from '@/hooks/useIsClient'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Trans from '../translation/Trans'

export default function DynamicCTAButton() {
  const { progression } = useCurrentSimulation()

  const isClient = useIsClient()

  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  const [isHover, setIsHover] = useState(false)

  return (
    <ButtonLink
      size="xl"
      className={`transition-all duration-300 hover:bg-primary-900 ${
        isClient ? 'opacity-100' : 'opacity-0'
      }`}
      href={getLinkToSimulateurPage()}
      data-cypress-id="do-the-test-link"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        if (progression === 1) {
          trackEvent(homeClickCtaResultats)
          return
        }

        if (progression > 0) {
          trackEvent(homeClickCtaReprendre)
          return
        }

        trackEvent(homeClickCtaCommencer)
      }}>
      <span
        className={twMerge(
          isHover
            ? 'bg-rainbow animate-rainbow-fast !bg-clip-text !text-transparent duration-1000'
            : '',
          'leading-none'
        )}>
        <Trans>{linkToSimulateurPageLabel}</Trans>
      </span>
    </ButtonLink>
  )
}
