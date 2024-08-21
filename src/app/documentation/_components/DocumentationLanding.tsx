'use client'

import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useRules } from '@/hooks/useRules'

import Link from '@/components/Link'
import LightBulbIcon from '@/components/icons/LightBulbIcon'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { useRef } from 'react'
import SearchBar from './SearchBar'
import DocumentationLandingCard from './documentationLanding/DocumentationLandingCard'

export default function DocumentationLanding() {
  const { data: rules } = useRules({ isOptim: false })

  const { t } = useClientTranslation()

  // We want to be able to define an order for the cards and their summary here
  const fixedCardSummaries = useRef({
    bilan: t(
      `Le coeur de Nos Gestes Climat, c'est **le bilan** d'empreinte climat personnelle`
    ),
    'services sociétaux': t(
      `Les constantes de **services publics et marchands** calculées à partir des travaux du SDES`
    ),
    'alimentation . plats': t(
      `**6 repas** représentatifs de notre consommation`
    ),
    'alimentation . déchets': t(`Un modèle inédit d'empreinte des **déchets**`),
    'logement . chauffage . empreinte par défaut': t(
      `Un calcul statistique du **chauffage** résidentiel français moyen`
    ),
    'transport . voiture': t(
      `Le premier poste moyen d'empreinte, l'incontournable **voiture individuelle**`
    ),
  } as Record<string, string>)

  if (!rules) return null

  return (
    <div className="mt-4">
      <Title title={<Trans>Documentation</Trans>} />

      <div className="flex flex-wrap gap-8 md:flex-nowrap">
        <div>
          <p>
            <Trans>
              Le simulateur Nos Gestes Climat est basé sur le modèle de calcul
              du même nom, composé d'un ensemble de briques.
            </Trans>
          </p>
          <p>
            <Trans>
              Sur cette documentation, vous avez accès en toute transparence à
              l'ensemble des variables du calcul. À lire tranquillement au coin
              du feu.
            </Trans>
          </p>

          <div>
            <Link href="/modele" className="flex items-center">
              <LightBulbIcon className="mr-1 h-4 w-4 fill-primary-700" />
              <Trans> En savoir plus sur notre modèle</Trans>
            </Link>
          </div>
        </div>

        <Image
          className="-mt-8 ml-auto w-48 md:-mt-16 md:w-full"
          src="/images/illustrations/girl-reading-newspaper.svg"
          width="400"
          height="300"
          alt={t(
            'Un femme lisant le journal au coin du feu avec un chien assoupi.'
          )}
        />
      </div>

      <SearchBar rules={rules} />

      <h2 className="mt-4 text-xl">
        <Trans>Quelques suggestions </Trans>
      </h2>

      <ul className="grid max-w-[60rem] grid-cols-1 flex-wrap gap-2 p-0 sm:grid-cols-2 md:grid-cols-3">
        {Object.keys(fixedCardSummaries.current).map((dottedName) => {
          return (
            <li key={dottedName}>
              <DocumentationLandingCard
                dottedName={dottedName}
                summary={fixedCardSummaries.current[dottedName]}
                rule={rules[dottedName]}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
