'use client'

import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { useEndGuard } from '@/hooks/navigation/useEndGuard'
import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import Carbone from './_components/Carbone'
import DocumentationBlock from './_components/DocumentationBlock'
import Eau from './_components/Eau'
import FeedbackBanner from './_components/FeedbackBanner'
import GetResultsByEmail from './_components/GetResultsByEmail'
import InformationBlock from './_components/InformationBlock'
import MetricSlider from './_components/MetricSlider'
import Poll from './_components/Poll'
import ShareBlock from './_components/ShareBlock'
import TotalSticky from './_components/TotalSticky'

const titles = {
  carbone: <Trans>carbone</Trans>,
  eau: <Trans>eau</Trans>,
}
export default function FinPage() {
  // Guarding the route and redirecting if necessary
  const { isGuardInit, isGuardRedirecting } = useEndGuard()

  // Set the current simulation from the URL params (if applicable)
  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  const { currentMetric } = useCurrentMetric()

  if (!isGuardInit || isGuardRedirecting) return null

  if (!isCorrectSimulationSet) return null

  return (
    <>
      <IframeDataShareModal />
      <Poll />

      <MetricSlider />

      <TotalSticky />

      <div className="relative -mt-6 flex flex-col-reverse gap-16 lg:-mt-16 lg:flex-row lg:gap-10">
        <div className="flex flex-1 flex-col gap-16 lg:mt-7">
          {currentMetric === 'carbone' && <Carbone />}

          {currentMetric === 'eau' && <Eau />}

          <GetResultsByEmail />

          <ShareBlock />

          <div id="categories-block">
            <Title tag="h2" className="text-lg md:text-2xl">
              <Trans>Le détail de mon empreinte</Trans>{' '}
              <strong className="text-secondary-700">
                {titles[currentMetric]}
              </strong>
            </Title>
            <CategoriesAccordion metric={currentMetric} />
          </div>

          <FeedbackBanner
            className="mb-8 mt-12"
            text={
              <Trans i18nKey="publicodes.northstar.learned">
                Est-ce que "Nos Gestes Climat" vous a permis d'apprendre quelque
                chose ?
              </Trans>
            }
            type="learned"
          />

          <DocumentationBlock />
        </div>
        <div className="top-28 flex w-full flex-col gap-4 self-start lg:sticky lg:z-30 lg:w-[22rem] short:gap-2">
          <InformationBlock />
        </div>
      </div>
    </>
  )
}
