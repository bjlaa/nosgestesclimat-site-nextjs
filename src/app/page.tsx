import Main from '@/design-system/layout/Main'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import Actions from './_components/Actions'
import Amis from './_components/Amis'
import Contributions from './_components/Contributions'
import Explanations from './_components/Explanations'
import Heading from './_components/Heading'
import Organisations from './_components/Organisations'

export async function generateMetadata() {
  return getMetadataObject({
    title:
      "Votre calculateur d'empreinte carbone personnelle - Nos Gestes Climat",
    description:
      'Connaissez-vous votre empreinte sur le climat ? Faites le test et découvrez comment réduire votre empreinte carbone sur le climat.',
  })
}

export default function Homepage() {
  return (
    <Main>
      <Heading />
      <div className="mx-auto mb-12 flex w-full max-w-5xl flex-col flex-wrap items-center gap-12 px-4 md:mb-20 md:flex-row md:items-start md:px-8 lg:gap-28">
        <Amis />
        <Actions />
      </div>
      <Organisations />
      <Explanations />
      <Contributions />
    </Main>
  )
}
