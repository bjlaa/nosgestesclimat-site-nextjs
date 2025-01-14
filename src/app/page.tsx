import DynamicCTAButtons from '@/components/cta/DynamicCTAButtons'
import JSONLD from '@/components/seo/JSONLD'
import Trans from '@/components/translation/Trans'
import { trackingActionClickCTA } from '@/constants/tracking/actions'
import LandingPage from '@/design-system/layout/LandingPage'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import {
  getLandingClickCTARestart,
  getLandingClickCTAResults,
  getLandingClickCTAResume,
  getLandingClickCTAStart,
} from '@/helpers/tracking/landings'
import { headers } from 'next/headers'
import Partners from '../components/landing-pages/Partners'
import CollectivelyCommit from './_components/CollectivelyCommit'
import DecryptChallenges from './_components/DecryptChallenges'
import DidYouKnowMainLanding from './_components/DidYouKnowMainLanding'
import InteractiveIllustration from './_components/InteractiveIllustration'
import Mobilise from './_components/Mobilise'
import ModelInfo from './_components/ModelInfo'
import TheySpeakAboutUs from './_components/TheySpeakAboutUs'
import TwoFootprints from './_components/TwoFootprints'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
    title: t('Calculez votre empreinte carbone et eau en 10 minutes !'),
    description: t(
      "2 millions de personnes ont déjà calculé leur empreinte sur le climat avec le calculateur Nos Gestes Climat ! Et vous, qu'attendez-vous pour faire le test ?"
    ),
    image: '/images/misc/calculer-empreinte-carbone-et-eau.png',
    alternates: {
      canonical: '',
    },
  })
}

export default async function Homepage() {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || '/'

  return (
    <>
      <JSONLD
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: 'https://nosgestesclimat.fr',
            name: 'Nos Gestes Climat',
            logo: 'https://nosgestesclimat.fr/_next/image?url=%2Fimages%2Fmisc%2Fpetit-logo%403x.png&w=640&q=75',
          },
        ]}
      />

      <LandingPage
        heroIllustration={
          <div className="flex flex-col gap-4">
            {/* Displayed on mobile only */}
            <p className="text-center text-sm sm:text-base md:hidden">
              <Trans>
                <strong className="text-primary-700">
                  2 millions de personnes
                </strong>{' '}
                ont déjà <br />
                calculé leur empreinte !
              </Trans>
            </p>

            <InteractiveIllustration />
          </div>
        }
        heroTitle={<Trans>Connaissez-vous votre empreinte écologique ?</Trans>}
        heroDescription={
          <div className="flex flex-col items-center gap-6 md:items-start md:gap-10">
            <p className="order-2 mb-0 text-lg md:order-1 md:text-2xl">
              <Trans>
                Calculez votre{' '}
                <strong className="text-primary-700">empreinte carbone</strong>{' '}
                et votre{' '}
                <strong className="text-primary-700">empreinte eau</strong> en{' '}
                <strong className="text-secondary-700">
                  seulement 10 minutes
                </strong>
                .
              </Trans>
            </p>

            <div className="order-1 mt-10 flex flex-col items-center gap-6 md:order-2 md:mt-0 md:max-w-[300px] md:items-start">
              <DynamicCTAButtons
                trackingEvents={{
                  start: getLandingClickCTAStart(
                    pathname,
                    trackingActionClickCTA
                  ),
                  resume: getLandingClickCTAResume(
                    pathname,
                    trackingActionClickCTA
                  ),
                  results: getLandingClickCTAResults(
                    pathname,
                    trackingActionClickCTA
                  ),
                  restart: getLandingClickCTARestart(
                    pathname,
                    trackingActionClickCTA
                  ),
                }}
                className="w-full"
              />

              {/* Displayed on desktop only */}
              <p className="hidden md:block">
                <Trans>
                  <strong className="text-primary-700">
                    2 millions de personnes
                  </strong>{' '}
                  ont déjà calculé leur empreinte !
                </Trans>
              </p>
            </div>
          </div>
        }
        heroPartners={<Partners />}>
        <TwoFootprints />

        <DidYouKnowMainLanding />

        <Mobilise />

        <DecryptChallenges />

        <CollectivelyCommit />

        <ModelInfo />

        <TheySpeakAboutUs />
      </LandingPage>
    </>
  )
}
