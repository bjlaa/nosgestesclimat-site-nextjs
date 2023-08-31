'use client'

import TransClient from '@/components/translation/TransClient'
import {
  matomoEventParcoursTestReprendre,
  matomoEventParcoursTestStart,
} from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function TakeTestLink({ hasData }: { hasData?: boolean }) {
  return (
    <ButtonLink
      href="/simulateur/bilan"
      data-cypress-id="do-the-test-link"
      onClick={() => {
        if (hasData) {
          trackEvent(matomoEventParcoursTestReprendre)
          return
        }

        trackEvent(matomoEventParcoursTestStart)
      }}
      size="xl"
      className="px-12 ">
      <ProgressCircle progress={0} white className="mr-2" />

      {hasData ? (
        <TransClient>Reprendre mon test</TransClient>
      ) : (
        <TransClient>Faire le test</TransClient>
      )}
    </ButtonLink>
  )
}
