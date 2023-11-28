import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import DocumentationRouter from './_components/DocumentationRouter'
import DocumentationServer from './_components/documentationRouter/DocumentationServer'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Documentation, votre simulateur d'empreinte carbone - Nos Gestes Climat",
    description:
      'Notre documentation détaille les calculs qui nous ont permis de calculer votre bilan carbone personnel.',
  })
}

// The page content is in layout.tsx in order to persist the state
// between the server and the client
export default async function DocumentationPage({
  params: { slug },
}: {
  params: { slug: string[] }
}) {
  const supportedRegions = await getSupportedRegions()

  return (
    <DocumentationRouter
      supportedRegions={supportedRegions}
      slug={slug}
      serverComponent={
        <DocumentationServer supportedRegions={supportedRegions} slugs={slug} />
      }
    />
  )
}
