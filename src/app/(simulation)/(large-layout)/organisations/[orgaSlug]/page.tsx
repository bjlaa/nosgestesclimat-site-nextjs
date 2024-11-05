'use client'

import SettingsIcon from '@/components/icons/SettingsIcon'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import Trans from '@/components/translation/Trans'
import { organisationsDashboardClickParameters } from '@/constants/tracking/pages/organisationsDashboard'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useFetchPolls } from '@/hooks/organisations/polls/useFetchPolls'
import useFetchOrganisation from '@/hooks/organisations/useFetchOrganisation'
import { capitalizeString } from '@/utils/capitalizeString'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import MyPolls from './_components/MyPolls'
import NousContacter from './_components/NousContacter'
import OurTools from './_components/OurTools'

export default function OrganisationPage() {
  const router = useRouter()

  const { data: organisation, isError, isLoading } = useFetchOrganisation()
  const { data: polls } = useFetchPolls({ enabled: !!organisation })

  useEffect(() => {
    if (organisation && !organisation.slug) {
      router.push('/organisations/creer')
    }
  }, [organisation, router])

  if (isError && !isLoading && !organisation) {
    return (
      <OrganisationFetchError organisation={organisation} isError={isError} />
    )
  }

  if (!organisation) {
    return null
  }

  return (
    <>
      <div className="mb-4 flex flex-wrap justify-between md:flex-nowrap">
        <div>
          <h1>
            <span>
              <Trans>Bienvenue</Trans>{' '}
              <span className="text-primary-700">
                {capitalizeString(organisation.administrators[0].name || '')}
              </span>
              ,
            </span>
          </h1>

          <p className="max-w-lg">
            <Trans>Sur l'espace organisation de </Trans>{' '}
            <strong className="text-secondary-700">{organisation?.name}</strong>
            .{' '}
            <Trans>Retrouvez vos campagnes et suivez leurs statistiques.</Trans>
          </p>
        </div>
        <ButtonLink
          href={`/organisations/${organisation?.slug}/parametres`}
          trackingEvent={organisationsDashboardClickParameters}
          color="text"
          className="flex items-center self-start">
          <SettingsIcon className="mr-2 fill-primary-700" />

          <Trans>Voir les paramètres</Trans>
        </ButtonLink>
      </div>

      <MyPolls polls={polls} />

      <OurTools />

      <NousContacter />
    </>
  )
}
