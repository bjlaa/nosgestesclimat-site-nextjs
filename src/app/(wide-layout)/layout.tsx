import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

export default async function PageLayout({ children }: PropsWithChildren) {
  return (
    <Main className="m-auto w-full max-w-5xl p-4 md:mx-auto md:px-8 md:py-8">
      {children}
    </Main>
  )
}
