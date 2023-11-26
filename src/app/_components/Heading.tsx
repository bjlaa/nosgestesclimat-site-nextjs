import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { Suspense } from 'react'
import ButtonStart from './heading/ButtonStart'
import Icons from './heading/Icons'
import Partners from './heading/Partners'

export default function Heading() {
  return (
    <>
      <div className="relative flex h-[36rem] items-center justify-center overflow-hidden bg-grey-100 p-4">
        <Suspense fallback={<div />}>
          <Icons />
        </Suspense>
        <div className="relative max-w-sm text-center md:max-w-xl">
          <h1 className="md:text-5xl">
            <Trans>Connaissez-vous votre empreinte sur le climat&#8239;?</Trans>
          </h1>
          <p className="mb-6 md:mb-10 md:text-2xl">
            <Trans>
              En <span className="text-secondary">10 minutes</span>, obtenez une
              estimation de votre empreinte carbone de consommation.
            </Trans>
          </p>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
            <ButtonStart />
            <Link className="md:text-lg" href="/documentation">
              <Trans>Notre méthode</Trans>
            </Link>
          </div>
        </div>
      </div>
      <Partners />
    </>
  )
}
