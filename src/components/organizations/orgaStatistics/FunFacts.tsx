import Trans from '@/components/translation/Trans'
import Emoji from '@/design-system/utils/Emoji'

export default function FunFacts({
  funFacts,
}: {
  funFacts: {
    percentageOfBicycleUsers: number
    percentageOfVegetarians: number
    percentageOfCarOwners: number
  }
}) {
  return (
    <section className="flex justify-center">
      <div className="flex flex-col gap-4 md:flex-row md:gap-16">
        <div className="text-lg">
          <Emoji className="mr-2 inline-block">🚴</Emoji>
          <span className="text-2xl font-medium">
            {Math.round(funFacts?.percentageOfBicycleUsers)}
          </span>{' '}
          <span>%</span>{' '}
          <span>
            <Trans>se déplacent à vélo</Trans>
          </span>
        </div>

        <div className="text-lg">
          <Emoji className="mr-2 inline-block">🥗</Emoji>
          <span className="text-2xl font-medium">
            {Math.round(funFacts?.percentageOfVegetarians)}
          </span>{' '}
          <span>%</span>{' '}
          <span>
            <Trans>sont végétariens</Trans>
          </span>
        </div>

        <div className="text-lg">
          <Emoji className="mr-2 inline-block">🚗</Emoji>
          <span className="text-2xl font-medium">
            {Math.round(funFacts?.percentageOfCarOwners)}
          </span>{' '}
          <span>%</span>{' '}
          <span>
            <Trans>roulent en voiture</Trans>
          </span>
        </div>
      </div>
    </section>
  )
}
