import Providers from '@/components/providers/Providers'
import { getSupportedRegions } from '@/helpers/getSupportedRegions'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  const supportedRegions = await getSupportedRegions()
  return (
    <Providers supportedRegions={supportedRegions} isOptim={false}>
      {children}
    </Providers>
  )
}
