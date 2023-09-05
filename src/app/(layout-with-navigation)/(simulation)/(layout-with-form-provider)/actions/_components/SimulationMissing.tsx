'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'

export default function SimulationMissing() {
  return (
    <div className="mb-8">
      <Card className="flex-col !bg-primaryLight">
        <h2>
          <TransClient>Calcul d'empreinte carbone manquant</TransClient>
        </h2>
        <p>
          🔒{' '}
          <TransClient
            i18nKey={'publicodes.SimulationMissing.simulationManquante'}>
            Pour débloquer ce parcours, vous devez d'abord terminer le test.
          </TransClient>
        </p>

        <div>
          <ButtonLink href="/simulateur/bilan">
            <TransClient>Faire le test</TransClient>
          </ButtonLink>
        </div>

        <p className="mb-0 mt-4">
          <small>
            <TransClient i18nKey={'publicodes.SimulationMissing.personnas'}>
              Vous pouvez aussi continuer avec un{' '}
              <Link href={'/personas'}>profil type</Link>.
            </TransClient>
          </small>
        </p>
      </Card>
    </div>
  )
}
