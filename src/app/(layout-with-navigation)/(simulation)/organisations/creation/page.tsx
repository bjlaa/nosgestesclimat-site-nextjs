'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useSendOrganisationCreationEmail } from '@/hooks/organisations/useSendOrganisationCreationEmail'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFetchOrganisation from '../_hooks/useFetchOrganisation'
import { useUpdateOrganisation } from '../_hooks/useUpdateOrganisation'
import CreationForm from './_components/CreationForm'

export default function CreationPage() {
  const [nameError, setNameError] = useState<string | null>(null)
  const [ownerNameError, setOwnerNameError] = useState<string | null>(null)

  const { t } = useClientTranslation()

  const { user, updateUserOrganisation } = useUser()

  const { isError } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutate: sendCreationConfirmationEmail } =
    useSendOrganisationCreationEmail()

  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(document.querySelector('form') ?? undefined)

    const name = data.get('name') as string
    const administratorName = data.get('administratorName') as string
    const position = data.get('position') as string
    const telephone = data.get('telephone') as string
    const numberOfExpectedParticipants = data.get(
      'numberOfExpectedParticipants'
    ) as string

    // Validation
    if (!name || !administratorName) {
      if (!name) {
        setNameError(t('Vous devez renseigner le nom de votre organisation'))
      }
      if (!administratorName) {
        setOwnerNameError(t('Vous devez renseigner votre prénom'))
      }

      // Scroll to top of the page with an animation
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      return
    }

    const hasOptedInForCommunications = (data.get(
      'hasOptedInForCommunications'
    ) as string)
      ? true
      : false

    try {
      const organisationUpdated = await updateOrganisation({
        name,
        administratorName,
        position,
        telephone,
        numberOfExpectedParticipants,
        hasOptedInForCommunications,
      })

      // Send email
      sendCreationConfirmationEmail({
        organisation: organisationUpdated,
        administratorName,
        email: user?.organisation?.administratorEmail ?? '',
      })

      if (!organisationUpdated?.slug) {
        throw new Error('No slug found')
      }

      updateUserOrganisation({
        name,
        slug: organisationUpdated?.slug,
      })

      router.push(`/organisations/${organisationUpdated?.slug}`)
    } catch (error: any) {
      captureException(error)
    }
  }

  useEffect(() => {
    if (isError) {
      router.push('/organisations/connexion')
    }
  }, [isError, router])

  return (
    <section className="mt-6 w-full bg-[#fff]">
      <div className="mx-auto max-w-5xl px-6 py-8 lg:px-0">
        <Title
          title={<Trans>Bienvenue sur votre espace !</Trans>}
          subtitle={<Trans>Plus que quelques petites questions</Trans>}
        />

        <CreationForm
          onSubmit={handleSubmit}
          nameError={nameError}
          setNameError={setNameError}
          ownerNameError={ownerNameError}
          setOwnerNameError={setOwnerNameError}
        />
      </div>
    </section>
  )
}
