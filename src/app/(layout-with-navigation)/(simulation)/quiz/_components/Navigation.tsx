import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useEndPage } from '@/hooks/navigation/useEndPage'
import { useClientTranslation } from '@/hooks/useClientTranslation'

type Props = {
  answer: string | null
  isAnswerValidated: boolean
  setIsAnswerValidated: (value: boolean) => void
}
export default function Navigation({
  answer,
  isAnswerValidated,
  setIsAnswerValidated,
}: Props) {
  const { t } = useClientTranslation()

  const { linkToEndPage } = useEndPage()

  return (
    <div className="mb-8 flex justify-between border-b border-gray-200 pb-8">
      <ButtonLink
        href={getLinkToSimulateur({
          question: 'services sociétaux . question rhétorique', //TODO: should be dynamic
        })}
        color="secondary"
        title={t('revenir au test')}>
        ←
      </ButtonLink>

      {!answer ? (
        <ButtonLink color="secondary" href={linkToEndPage}>
          <Trans>Passer la question →</Trans>
        </ButtonLink>
      ) : null}

      {isAnswerValidated ? (
        <Button onClick={() => setIsAnswerValidated(true)}>
          <Trans>Valider</Trans>
        </Button>
      ) : (
        <ButtonLink href={linkToEndPage}>
          <Trans>Voir mes résultats →</Trans>
        </ButtonLink>
      )}
    </div>
  )
}
