'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import {
  homeClickCtaCommencer,
  homeClickCtaReprendre,
  homeClickCtaResultats,
  homeClickNewTest,
} from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useIsClient } from '@/hooks/useIsClient'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function Buttons() {
  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const isClient = useIsClient()

  const {
    goToSimulateurPage,
    getLinkToSimulateurPage,
    linkToSimulateurPageLabel,
  } = useSimulateurPage()

  const progression = currentSimulation?.progression || 0

  return (
    <div className="relative">
      <ButtonLink
        className={`transition-opacity duration-500 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
        href={getLinkToSimulateurPage()}
        data-cypress-id="do-the-test-link"
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
        }}
        size="lg">
        <Trans>{linkToSimulateurPageLabel}</Trans>
      </ButtonLink>
      {progression ? (
        <Link
          className={`absolute left-1/2 top-full -translate-x-1/2 translate-y-6 whitespace-nowrap transition-opacity delay-200 duration-1000 md:text-lg ${
            isClient ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => {
            trackEvent(homeClickNewTest)
            goToSimulateurPage({ noNavigation: true, newSimulation: {} })
          }}
          href={getLinkToSimulateurPage({ newSimulation: true })}>
          <Trans>Commencer un nouveau test</Trans>
        </Link>
      ) : null}
    </div>
  )
}
