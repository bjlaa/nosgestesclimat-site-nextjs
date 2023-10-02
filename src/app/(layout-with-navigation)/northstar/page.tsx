import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import NorthStarIframe from './_components/NorthStarIframe'

export async function generateMetadata() {
  return getMetadataObject({
    title: 'Nos statistiques "phares" - Nos Gestes Climat',
    description:
      "Observez nos l'évolution de nos deux mesures d'impact principales.",
  })
}

export default async function NorthStarPage() {
  const { t } = await getServerTranslation()

  const title = t('Statistiques Northstar')

  return (
    <div>
      <Title title={title} />

      <p>
        {t(
          'Le chargement prend parfois plusieurs minutes, visualiser ce dashboard demande un peu de patience ! 🕙'
        )}
      </p>

      <NorthStarIframe />
    </div>
  )
}
