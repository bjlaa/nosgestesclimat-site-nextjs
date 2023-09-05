import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import ProgressCircle from '@/design-system/utils/ProgressCircle'
import { useForm } from '@/publicodes-state'
import TutorialLink from './TutorialLink'

export default function NoSimulationBanner() {
  const { progression } = useForm()

  if (progression > 0) return null

  return (
    <Card className="mt-4 flex !w-[35rem] max-w-full flex-col items-start gap-2 p-8 !shadow-none">
      <p>
        <span
          role="img"
          aria-label="hole emoji"
          className="mr-4 inline-block text-3xl">
          🕳️
        </span>

        <TransClient>Vous n'avez pas encore fait le test.</TransClient>
      </p>

      <div className="flex w-full flex-wrap items-center gap-4">
        <ButtonLink href="/simulateur/bilan">
          <ProgressCircle className="mr-2" white />

          <TransClient>Commencer le test</TransClient>
        </ButtonLink>

        <TutorialLink />
      </div>
    </Card>
  )
}
