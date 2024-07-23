'use client'

import MaxWidthContent from '@/components/layout/MaxWidthContent'
import OrganisationFetchError from '@/components/organisations/OrganisationFetchError'
import OrganisationLoader from '@/components/organisations/OrganisationLoader'
import Trans from '@/components/translation/Trans'
import { organisationsParametersUpdateInformations } from '@/constants/tracking/pages/organisationsParameters'
import Form from '@/design-system/form/Form'
import Separator from '@/design-system/layout/Separator'
import Title from '@/design-system/layout/Title'
import { displaySuccessToast } from '@/helpers/toasts/displaySuccessToast'
import { useUpdateOrganisation } from '@/hooks/organisations/useUpdateOrganisation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useFetchOrganisation from '../../_hooks/useFetchOrganisation'
import DeconnexionButton from './DeconnexionButton'
import EmailVerificationModal from './_components/EmailVerificationModal'
import OrganisationFields from './_components/OrganisationFields'
import PersonalInfoFields from './_components/PersonalInfoFields'

export type Inputs = {
  name: string
  administratorName: string
  administratorTelephone: string
  hasOptedInForCommunications: boolean
  email: string
  organisationType: string
  position: string
  numberOfCollaborators: number
}

export default function ParametresPage() {
  const { user } = useUser()
  const [error, setError] = useState<string>('')
  const [dataForVerification, setDataForVerification] = useState<
    Inputs | undefined
  >()

  const { t } = useClientTranslation()

  const {
    data: organisation,
    isError,
    isLoading,
  } = useFetchOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { mutateAsync: updateOrganisation } = useUpdateOrganisation({
    email: user?.organisation?.administratorEmail ?? '',
  })

  const { register, handleSubmit } = useReactHookForm({
    defaultValues: {
      name: organisation?.name ?? '',
      administratorName: organisation?.administrators?.[0]?.name ?? '',
      hasOptedInForCommunications:
        organisation?.administrators?.[0]?.hasOptedInForCommunications ?? false,
      organisationType: organisation?.organisationType ?? '',
      email: organisation?.administrators?.[0]?.email ?? '',
      position: organisation?.administrators?.[0]?.position ?? '',
      numberOfCollaborators: organisation?.numberOfCollaborators ?? 0,
      administratorTelephone:
        organisation?.administrators?.[0]?.telephone ?? '',
    },
  })

  function handleSaveDataForVerification(data: Inputs) {
    setDataForVerification(data)
  }

  const handleUpdateOrganisation: SubmitHandler<Inputs> = async ({
    email,
    name,
    organisationType,
    numberOfCollaborators,
    position,
    administratorName,
    administratorTelephone,
    hasOptedInForCommunications,
  }) => {
    // Switch to the update email user flow
    if (email !== user?.organisation?.administratorEmail) {
      handleSaveDataForVerification({
        email,
        name,
        organisationType,
        numberOfCollaborators,
        position,
        administratorName,
        hasOptedInForCommunications,
        administratorTelephone,
      })
      return
    }

    try {
      trackEvent(organisationsParametersUpdateInformations)

      await updateOrganisation({
        name,
        organisationType,
        numberOfCollaborators,
        position,
        administratorName,
        hasOptedInForCommunications,
        administratorTelephone,
      })

      displaySuccessToast(t('Vos informations ont bien été mises à jour.'))
    } catch (error) {
      setError(t('Une erreur est survenue. Veuillez réessayer.'))
    }
  }

  if (isLoading || (!organisation && !isError)) {
    return <OrganisationLoader />
  }

  if (isError && !isLoading && !organisation) {
    return (
      <OrganisationFetchError organisation={organisation} isError={isError} />
    )
  }

  return (
    <MaxWidthContent className="pb-8">
      <Title
        title={
          <span>
            <Trans>Paramètres de </Trans>
            <strong className="text-primary-700">{organisation?.name}</strong>
          </span>
        }
      />

      <Form
        error={error}
        className="mb-4 mt-8"
        onSubmit={handleSubmit(handleUpdateOrganisation)}>
        <h2>
          <Trans>Votre organisation</Trans>
        </h2>

        <OrganisationFields
          organisation={organisation}
          register={register as any}
        />

        <Separator className="my-6" />

        <h2 className="mt-6">
          <Trans>Vos informations personnelles</Trans>
        </h2>

        <PersonalInfoFields
          organisation={organisation}
          register={register as any}
        />
      </Form>

      {!!dataForVerification && (
        <EmailVerificationModal
          data={dataForVerification}
          closeModal={() => setDataForVerification(undefined)}
          onSuccess={() =>
            displaySuccessToast(
              t('Vos informations ont bien été mises à jour.')
            )
          }
        />
      )}

      <Separator className="my-4" />

      <DeconnexionButton organisation={organisation} />

      <ToastContainer />
    </MaxWidthContent>
  )
}
