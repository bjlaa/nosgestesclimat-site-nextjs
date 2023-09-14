import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import ButtonStart from './_components/ButtonStart'

import AutresQuestions from './_components/AutresQuestions'
import AvantDeCommencer from './_components/AvantDeCommencer'

export default function Tutoriel() {
  return (
    <div className="flex flex-col p-4">
      <Title
        data-cypress-id="tutoriel-title"
        className="text-lg md:text-3xl"
        title={
          <>
            <span className="inline text-secondary">
              <Trans>10 minutes</Trans>
            </span>{' '}
            <Trans>chrono pour calculer votre empreinte sur le climat</Trans>
          </>
        }
      />
      <AvantDeCommencer />

      <AutresQuestions />

      <div className="mb-8 flex justify-between border-t border-gray-200 pt-8">
        <ButtonLink href="/" color="secondary">
          ←
        </ButtonLink>
        <ButtonStart />
      </div>
    </div>
  )
}
