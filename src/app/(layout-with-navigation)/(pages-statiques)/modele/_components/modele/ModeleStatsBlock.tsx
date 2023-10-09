'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'

export default function ModeleStatsBlock({
  supportedRegions,
}: {
  supportedRegions: SuppportedRegions
}) {
  const locale = useLocale()

  const { user } = useUser()

  const { data: rules } = useRules({
    lang: locale,
    region: supportedRegions[user.region?.code] ? user.region.code : 'FR',
    isOptim: false,
  })

  if (!rules) return <p>Chargement du modèle...</p>

  const numberOfRules = Object.keys(rules).length
  const numberOfQuestions = Object.values(rules).filter(
    (el) => el && el.question
  ).length

  const NumberOfRules = () => <span>{numberOfRules}</span>
  const NumberOfQuestions = () => <span>{numberOfQuestions}</span>

  return (
    <div>
      <p>
        <Trans i18nKey={'model.stats'}>
          Le modèle comprend aujourd'hui <NumberOfRules /> règles de calcul.
          Parmi elles, <NumberOfQuestions /> règles sont des questions à poser à
          l'utilisateur pour calculer un résultat précis.
        </Trans>
      </p>
      <p>
        <Trans i18nKey={'model.questions'}>
          Découvrez{' '}
          <Link href="/questions">
            la liste des questions disponibles dans le modèle
          </Link>
          .
        </Trans>
      </p>
    </div>
  )
}
