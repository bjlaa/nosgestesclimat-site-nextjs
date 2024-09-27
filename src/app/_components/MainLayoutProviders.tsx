import { PropsWithChildren, Suspense } from 'react'
import MainHooks from './mainLayoutProviders/MainHooks'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'

export default function MainLayoutProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProviderWrapper>
      <Suspense fallback={null}>
        <MainHooks />
      </Suspense>
      {children}
    </QueryClientProviderWrapper>
  )
}
