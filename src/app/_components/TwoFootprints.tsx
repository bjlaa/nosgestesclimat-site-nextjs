import Trans from '@/components/translation/Trans'
import ColorLine from '@/design-system/layout/ColorLine'
import Separator from '@/design-system/layout/Separator'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'
import LearnMoreCarbonLink from './twoFootprints/LearnMoreCarbonLink'
import LearnMoreWaterLink from './twoFootprints/LearnMoreWaterLink'

export default async function TwoFootprints() {
  const { t } = await getServerTranslation()
  return (
    <div className="my-16 flex flex-col items-center px-4 md:mx-auto md:my-20 md:max-w-5xl">
      <div className="relative mb-16 pb-4 md:mb-20">
        <h2 className="mb-0 text-center text-2xl md:text-3xl">
          <Trans>Un calculateur, deux empreintes</Trans>
        </h2>
        <ColorLine className="bg-rainbow absolute bottom-0 left-[15%] h-[3px] w-[70%] animate-rainbow-slow transition-all md:left-0 md:w-full" />
      </div>

      {/* Displayed on desktop only */}
      <Image
        src="/images/misc/graphiques-empreinte-carbone-eau.png"
        className="hidden md:block"
        alt={t("Deux représentations graphiques de l'empreinte carbone et eau")}
        width={600}
        height={800}
      />

      <div className="flex flex-col gap-16 md:flex-row md:gap-8">
        <div className="flex flex-col">
          <div className="flex flex-col">
            {/* Displayed on mobile only */}
            <div className="-mb-10 flex justify-center md:hidden">
              <Image
                src="/images/misc/graphique-empreinte-carbone.png"
                alt=""
                width={300}
                height={300}
              />
            </div>

            <h3 className="mb-0 text-xl md:text-2xl">
              <Trans>L'empreinte carbone</Trans>
            </h3>

            <Separator className="my-4" />
          </div>

          <p className="mb-6 text-sm md:text-lg">
            <Trans>
              <strong className="text-primary-700">L’empreinte carbone</strong>{' '}
              représente la quantité de gaz à effet de serre émise par les
              activités humaines. Le calculateur d’empreinte carbone aide à{' '}
              <strong className="text-primary-700">repérer les usages</strong>{' '}
              qui contribuent le plus au changement climatique et à{' '}
              <strong className="text-primary-700">choisir les actions</strong>{' '}
              les plus efficaces pour réduire son impact.
            </Trans>
          </p>

          <LearnMoreCarbonLink />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col">
            {/* Displayed on mobile only */}
            <div className="-mb-10 flex justify-center md:hidden">
              <Image
                src="/images/misc/graphique-empreinte-eau.png"
                alt=""
                width={300}
                height={300}
              />
            </div>

            <h3 className="mb-0 text-xl md:text-2xl">
              <Trans>L'empreinte eau</Trans>
            </h3>

            <Separator className="my-4" />
          </div>

          <p className="mb-6 text-sm md:text-lg">
            <Trans>
              <strong className="text-primary-700">L’empreinte eau</strong>{' '}
              mesure la quantité totale d’eau utilisée pour produire les biens
              et services que nous consommons. Contrairement à l’eau domestique,{' '}
              <strong className="text-primary-700">
                elle inclut l’eau invisible
              </strong>{' '}
              nécessaire pour cultiver nos aliments, fabriquer nos vêtements et
              produire de l’énergie.
            </Trans>
          </p>

          <LearnMoreWaterLink />
        </div>
      </div>
    </div>
  )
}