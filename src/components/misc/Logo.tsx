'use client'

import { useIframe } from '@/hooks/useIframe'
import Image from 'next/image'
import Link from '../Link'

export default function Logo({ className }: { className?: string }) {
  const { isIframeOnlySimulation } = useIframe()

  return (
    <div className={`flex items-center ${className}`}>
      <Link
        href="/"
        data-cypress-id="home-logo-link"
        className={`mx-auto my-1 flex items-center justify-center no-underline md:my-4 lg:mx-auto lg:my-4 ${
          // @bjlaa : this is a hack to prevent the logo from being clickable in the iframe
          // not a recommended method a11y-wise, but in this case it's a good fit
          isIframeOnlySimulation ? 'pointer-events-none' : ''
        }`}>
        <Image
          src="/images/misc/petit-logo@3x.png"
          alt="Logo Nos Gestes Climat"
          width="200"
          height="200"
          className="h-auto w-[44px]"
        />

        <div
          className={`ml-2 text-base font-extrabold uppercase !leading-[0.85] text-primaryDark lg:block`}>
          <span className="block w-full !leading-[0.85]">Nos</span>
          <span className="block w-full !leading-[0.85]">Gestes</span>
          <span className="block w-full !leading-[0.85]">Climat</span>
        </div>
      </Link>
    </div>
  )
}
