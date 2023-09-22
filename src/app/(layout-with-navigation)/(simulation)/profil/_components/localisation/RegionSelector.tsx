import NewTabSvg from '@/components/icons/NewTabSvg'
import RegionGrid from '@/components/misc/RegionGrid'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import Loader from '@/design-system/layout/Loader'
import { sortSupportedRegions } from '@/helpers/localisation/sortSupportedRegions'
import { useLocale } from '@/hooks/useLocale'
import { useRules } from '@/hooks/useRules'
import { useUser } from '@/publicodes-state'
import { SuppportedRegions } from '@/types/international'

type Props = {
  isOpen?: boolean
  supportedRegions: SuppportedRegions
}

export default function RegionSelector({
  isOpen = false,
  supportedRegions,
}: Props) {
  const locale = useLocale()

  const orderedSupportedRegions = sortSupportedRegions({
    supportedRegions,
    currentLocale: locale || 'fr',
  })

  const numberOfRegions = Object.entries(orderedSupportedRegions).length

  const { updateRegion, user } = useUser()

  const { region } = user || {}

  const { isFetching } = useRules({
    lang: locale || 'fr',
    region: region?.code || 'FR',
  })

  return (
    <>
      <details open={isOpen}>
        <summary
          aria-disabled={isFetching || undefined}
          className={`middle w-auto cursor-pointer rounded-md bg-primaryLight p-4 ${
            isFetching ? 'pointer-events-none opacity-60' : ''
          }`}>
          <span>
            🗺️ <Trans>Choisir une autre région</Trans>{' '}
            <small title={`${numberOfRegions} régions`}>
              ({numberOfRegions} <Trans>disponibles</Trans>)
            </small>
          </span>
          {isFetching && (
            <Loader size="sm" color="dark" className="ml-4 text-right" />
          )}
        </summary>

        <RegionGrid
          updateCurrentRegion={(code: string) => {
            updateRegion({
              code,
              name: supportedRegions[code][locale as string]
                ?.nom as unknown as string,
            })
          }}
          selectedRegionCode={region?.code}
          className={isFetching ? 'pointer-events-none opacity-60' : ''}
          aria-disabled={isFetching || undefined}
        />
        <Card className="mt-4 flex-row items-center">
          <span
            role="img"
            aria-label="emoji world"
            aria-hidden
            className="mr-2">
            🌐
          </span>
          <p className="mb-0">
            <Trans>Envie de contribuer à une version pour votre région ?</Trans>{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="align-top"
              href="https://github.com/datagir/nosgestesclimat/blob/master/INTERNATIONAL.md">
              <Trans>Suivez le guide !</Trans>
              <NewTabSvg className="!-mt-1" />
            </a>
          </p>
        </Card>
      </details>
    </>
  )
}
