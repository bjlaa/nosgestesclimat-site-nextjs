import MDXContent from '@/components/mdx/MDXContent'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ContentEn from '@/locales/pages/en/CGU.mdx'
import ContentFr from '@/locales/pages/fr/CGU.mdx'

export async function generateMetadata() {
  return getMetadataObject({
    title: t('CGU - Nos Gestes Climat'),
    description: t("Conditions générales d'utilisation du site."),
    alternates: {
      canonical: '/cgu',
    },
  })
}

export default function CGUPage() {
  return <MDXContent contentEn={ContentEn} contentFr={ContentFr} />
}
