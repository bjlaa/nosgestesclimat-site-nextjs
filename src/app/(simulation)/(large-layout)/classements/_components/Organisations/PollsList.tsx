'use client'

import Trans from '@/components/translation/Trans'
import { usePolls } from '@/hooks/organisations/usePolls'
import { useUser } from '@/publicodes-state'
import type { Organisation } from '@/types/organisations'
import { useMemo } from 'react'
import OrganisationItem from './pollList/OrganisationItem'
import PollItem from './pollList/PollItem'

type Props = {
  organisations?: Organisation[]
}

export default function PollsList({ organisations }: Props) {
  const { simulations } = useUser()

  const pollSlugs = useMemo(
    () =>
      simulations
        .filter((simulation) => simulation.polls)
        .map((simulation) => simulation.polls)
        .flat()
        // Remove duplicates
        .filter((value, index, self) => self.indexOf(value) === index),
    [simulations]
  )
  const { data: polls } = usePolls({ pollSlugs })

  const [organisation] = organisations || []

  return (
    <div className="mb-8 flex flex-col gap-3">
      {organisation && (
        <>
          <h3 className="mb-0 text-base">
            <Trans>Mon organisation</Trans>
          </h3>
          <OrganisationItem organisation={organisation} />
        </>
      )}

      {polls && polls.length > 0 && (
        <>
          <h3 className="mb-0 text-base">
            <Trans>Mes campagnes</Trans>
          </h3>

          {polls?.map((poll) => <PollItem key={poll.slug} poll={poll} />)}
        </>
      )}
    </div>
  )
}
