import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { FormProvider } from '@/publicodes-state'
import { Metadata } from 'next'
import Faq from './_components/Faq'
import Simulateur from './_components/Simulateur'
import Tracking from './_components/Tracking'

type Props = { params: { root: string } }

export const metadata: Metadata = {
  title: 'Simulateur d’empreinte climat - Nos Gestes Climat',
  description:
    'Calculez votre empreinte sur le climat en 10 minutes chrono. Découvrez les gestes qui comptent vraiment pour le climat.',
}

export default function SimulateurPage({ params }: Props) {
  return (
    <FormProvider root={params.root}>
      <div className="hidden md:block">
        <Title title={<Trans>Votre bilan climat personnel</Trans>} />
      </div>

      <Simulateur />

      <Faq />

      <Tracking />
    </FormProvider>
  )
}
