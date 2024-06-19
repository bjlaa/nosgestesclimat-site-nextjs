import Trans from '@/components/translation/Trans'
import { classementCreateGroup } from '@/constants/tracking/pages/classements'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { linkToGroupCreation } from '@/helpers/navigation/groupPages'

export default function CreateFirstGroupSection() {
  return (
    <section className="mt-4">
      <h2 className="mb-2 mt-0 text-lg font-medium">
        <Trans>Créez votre premier groupe</Trans>
      </h2>
      <p className="mb-6 text-sm">
        <Trans>
          Invitez vos proches pour comparer vos résultats. Cela prend
        </Trans>{' '}
        <strong className="text-secondary-700">
          <Trans>1 minute</Trans>
        </strong>{' '}
        !
      </p>
      <ButtonLink
        href={linkToGroupCreation}
        trackingEvent={classementCreateGroup}
        data-cypress-id="button-create-first-group">
        <Trans>Commencer</Trans>
      </ButtonLink>
    </section>
  )
}
