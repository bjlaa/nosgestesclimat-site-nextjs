import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import CopyInput from '@/design-system/inputs/CopyInput'
import { Organisation } from '@/types/organisations'
import { twMerge } from 'tailwind-merge'
import CTACard from './CTACard'

export default function ShareSection({
  organisation,
  className,
}: {
  organisation: Organisation
  className?: string
}) {
  return (
    <section
      className={twMerge('rounded-lg bg-grey-100 px-4 py-10', className)}>
      <div className="flex flex-wrap items-center justify-center gap-8 lg:flex-nowrap lg:items-start">
        <CTACard
          id="orga-partage"
          className="transition-colors duration-500 lg:w-2/3"
          overLabel={<Trans>Via un lien de partage</Trans>}
          title={<Trans>Partagez le test</Trans>}
          description={
            <Trans>
              Partagez simplement cette page à vos employés, utilisateurs,
              élèves, et suivez leurs résultats
            </Trans>
          }>
          <CopyInput
            textToDisplay={`${window.location.host}/o/${organisation?.slug}/${organisation?.polls[0].slug}`}
            textToCopy={`${window.location.origin}/o/${organisation?.slug}/${organisation?.polls[0].slug}`}
          />
        </CTACard>

        <CTACard
          className="lg:w-1/3"
          overLabel={<Trans>Services web et mobiles</Trans>}
          title={<Trans>Intégration en iframe</Trans>}
          description={
            <Trans>
              Intégrez le test sur un article de blog, ou une page dédiée de
              votre site ou application mobile{' '}
            </Trans>
          }>
          <ButtonLink href="/diffuser" className="self-start">
            <Trans>Découvrez le guide</Trans>
          </ButtonLink>
        </CTACard>
      </div>
    </section>
  )
}
