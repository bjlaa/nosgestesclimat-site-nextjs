'use client'

import CountryFlag from '@/components/misc/CountryFlag'
import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import { fetchSupportedRegions } from '@/helpers/localisation/fetchSupportedRegions'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'
import { use } from 'react'
import RegionModelAuthors from './RegionModelAuthors'
import RegionSelector from './RegionSelector'

export default function Localisation({ title = 'Ma région de simulation' }) {
  const { t } = useClientTranslation()

  const locale = useLocale()

  const supportedRegions: SuppportedRegions = use(fetchSupportedRegions)

  const { user, updateRegion } = useUser()
  const { region, initialRegion } = user || {}

  const isRegionSupported = Object.keys(supportedRegions)?.some(
    (supportedRegion: string) => supportedRegion === region?.code
  )

  return (
    <div className="mt-8">
      <h2 className="text-lg">
        <span
          role="img"
          aria-label="emoji pin"
          className="inline-blocl mr-3"
          aria-hidden>
          📍
        </span>
        <span>{t(title)}</span>
      </h2>

      {region && (
        <div className="my-4">
          <span>
            <TransClient>Vous faites cette simulation depuis :</TransClient>{' '}
            <strong>{region.name}</strong>
            <CountryFlag code={region.code} className="inline-block ml-2" />.
          </span>
          {!isRegionSupported && (
            <>
              {t('components.localisation.Localisation.warnMessage', {
                countryName: region.country,
              })}
            </>
          )}

          <div className="flex gap-2 items-baseline">
            {region.code !== initialRegion.code && (
              <div className="mt-2">
                <Button
                  color="text"
                  size="sm"
                  onClick={() => {
                    updateRegion(
                      initialRegion as { code: string; name: string }
                    )
                  }}>
                  <TransClient>Revenir à ma région par défaut </TransClient>{' '}
                  <span aria-label={initialRegion.nom}>
                    <CountryFlag
                      code={initialRegion.code}
                      className="inline-block ml-2"
                    />
                  </span>
                </Button>
              </div>
            )}
            <RegionModelAuthors
              authors={supportedRegions[region.code][locale || 'fr'].authors}
            />
          </div>
        </div>
      )}

      {!region && (
        <p>
          <TransClient i18nKey="components.localisation.Localisation.warnMessage2">
            Nous n'avons pas pu détecter votre pays de simulation, le modèle
            Français vous est proposé par défaut.
          </TransClient>
        </p>
      )}
      <RegionSelector supportedRegions={supportedRegions} />
    </div>
  )
}
