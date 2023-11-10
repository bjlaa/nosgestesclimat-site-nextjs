import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Kicker from '@/design-system/layout/Kicker'
import Screenshot from './actions/Screenshot'

export default function Actions() {
  return (
    <div className="flex-1">
      <div className="mb-6 justify-center overflow-hidden rounded-lg bg-grey-100 px-8 pt-8 md:px-12 md:pt-12">
        <Screenshot />
      </div>
      <Kicker>
        <Trans>Agir pour le climat</Trans>
      </Kicker>
      <h2 className="font-medium md:text-3xl">
        <Trans>Comment agir&#8239;?</Trans>
      </h2>
      <p className="max-w-xs md:mb-8 md:max-w-sm md:text-lg">
        <Trans>
          Découvrez nos <span>pistes personnalisées</span> pour agir dès
          aujourd’hui pour le climat.
        </Trans>
      </p>
      <ButtonLink color="secondary" href="/actions">
        <Trans>Toutes les actions</Trans>
      </ButtonLink>
    </div>
  )
}
