import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationContent from '../_components/DocumentationContent'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

type Props = {
  params: {
    slug: string[]
  }
}
export default async function DocumentationPage({ params }: Props) {
  const supportedRegions = await getSupportedRegions()

  return (
    <DocumentationContent
      supportedRegions={supportedRegions}
      slugs={params.slug}
    />
  )
}
