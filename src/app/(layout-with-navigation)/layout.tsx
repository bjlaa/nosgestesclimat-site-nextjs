import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import Navigation from './_components/Navigation'

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Navigation />
        <Main className="w-full max-w-4xl px-4 py-8">{children}</Main>
      </div>
    </>
  )
}
