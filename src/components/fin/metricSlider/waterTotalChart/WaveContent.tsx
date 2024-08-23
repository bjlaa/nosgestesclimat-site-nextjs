import Trans from '@/components/translation/Trans'
import Wave from 'react-wavify'
import Octopus from './waveContent/Octopus'

type Props = {
  isStatic?: boolean
}
export default function WaveContent({ isStatic }: Props) {
  return (
    <div className="relative overflow-hidden rounded-b-xl px-4 pb-6 pt-12 transition-opacity lg:pb-8 lg:pt-14">
      <Wave
        fill="#5152D0"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full"
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.11,
          points: 3,
        }}
      />
      <Octopus />
      <p className="relative mx-auto mb-0 max-w-[44rem] text-xs italic text-white lg:text-base">
        {isStatic ? (
          <Trans>
            L'empreinte eau, c'est l'ensemble de l'eau consommée pour produire
            et distribuer les biens et services de votre quotidien.
          </Trans>
        ) : (
          <>
            <Trans>Ce chiffre vous semble impressionnant ?</Trans>
            <br />
            <Trans>
              C'est pourtant bien l'eau qui sert à produire ce que vous
              consommez :
              <br className="hidden lg:inline" /> votre empreinte eau, c'est
              l'impact de votre mode de vie sur les cycles naturels de l'eau.
            </Trans>
          </>
        )}
      </p>
    </div>
  )
}
