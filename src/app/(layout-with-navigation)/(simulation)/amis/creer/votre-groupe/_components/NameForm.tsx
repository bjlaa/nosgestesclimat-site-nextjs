'use client'

import Trans from '@/components/translation/Trans'
import { GROUP_EMOJIS } from '@/constants/group'
import Button from '@/design-system/inputs/Button'
import GridRadioInputs from '@/design-system/inputs/GridRadioInputs'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useCreateGroup } from '@/hooks/groups/useCreateGroup'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { captureException } from '@sentry/react'
import { useContext, useEffect, useState } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import { GroupCreationContext } from '../../_contexts/GroupCreationContext'

type Inputs = {
  name: string
  emoji: string
}

export default function NameForm() {
  const { t } = useClientTranslation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const { user, updateName, updateEmail } = useUser()

  const { groupValues } = useContext(GroupCreationContext)

  const { mutateAsync: createGroup, isPending, isSuccess } = useCreateGroup()

  const [shouldNavigate, setShouldNavigate] = useState<string | undefined>(
    undefined
  )

  const currentSimulation = useCurrentSimulation()
  const hasCompletedTest = currentSimulation.progression === 1

  const { goToSimulateurPage } = useSimulateurPage()
  const { goToEndPage } = useEndPage()

  useEffect(() => {
    if (
      shouldNavigate &&
      currentSimulation.groups?.includes(shouldNavigate || '')
    ) {
      setShouldNavigate(undefined)
      if (hasCompletedTest) {
        goToEndPage({ allowedToGoToGroupDashboard: true })
      } else {
        goToSimulateurPage()
      }
    }
  }, [
    currentSimulation.groups,
    hasCompletedTest,
    goToEndPage,
    goToSimulateurPage,
    shouldNavigate,
  ])

  async function onSubmit({ name, emoji }: Inputs) {
    try {
      const { administratorEmail, administratorName } = groupValues ?? {}

      const group = await createGroup({
        groupInfo: {
          name: name ?? '',
          emoji: emoji ?? '',
          administratorEmail: administratorEmail ?? '',
          administratorName: administratorName ?? '',
          userId: user.userId,
          simulation: currentSimulation,
        },
      })

      // Update user info
      updateName(administratorName ?? '')
      updateEmail(administratorEmail ?? '')

      // Update current simulation with group id (to redirect after test completion)
      currentSimulation.update({
        groupToAdd: group._id,
      })

      setShouldNavigate(group._id)
    } catch (e) {
      captureException(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Choisissez un nom pour ce groupe</Trans>}
        helperText={
          <Trans>Pour le retrouver facilement dans votre liste</Trans>
        }
        error={errors.name?.message}
        {...register('name', {
          required: t('Ce champ est obligatoire.'),
          maxLength: { value: 50, message: t('Ce champ est trop long') },
        })}
      />

      <GridRadioInputs
        control={control as any}
        label={<Trans>Et une illustration</Trans>}
        helperText={<Trans>Pour faire joli et le reconnaitre !</Trans>}
        name="emoji"
        items={GROUP_EMOJIS.map((emoji) => ({ value: emoji, label: emoji }))}
        rules={{ required: t('Ce champ est obligatoire.') }}
        error={errors.emoji?.message}
      />

      <Button
        type="submit"
        data-cypress-id="button-create-group"
        className="mt-4 self-start"
        disabled={isPending || isSuccess}>
        {hasCompletedTest ? (
          <Trans>Créer le groupe</Trans>
        ) : (
          <Trans>Créer et passer mon test</Trans>
        )}
      </Button>
    </form>
  )
}