'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'
import { IsClientCtxProvider } from './IsClientCtxProvider'
import CheckFixedRegion from './mainLayoutProviders/CheckFixedRegion'
import { IframeResizer } from './mainLayoutProviders/IframeResizer'
import PageViewTracker from './mainLayoutProviders/PageViewTracker'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import QueryParamsProvider from './mainLayoutProviders/QueryParamsProvider'
import SimulationFromUrlLoader from './mainLayoutProviders/SimulationFromUrlLoader'

export default function MainLayoutProviders({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  return (
    <IsClientCtxProvider>
      <QueryParamsProvider>
        <IframeOptionsProvider>
          <QueryClientProviderWrapper>
            <PageViewTracker>
              <IframeResizer />
              <UserProvider
                initialRegion={region}
                storageKey="nosgestesclimat::v3">
                <SimulationFromUrlLoader />
                <CheckFixedRegion />
                <IsClientCtxProvider>{children}</IsClientCtxProvider>
              </UserProvider>
            </PageViewTracker>
          </QueryClientProviderWrapper>
        </IframeOptionsProvider>
      </QueryParamsProvider>
    </IsClientCtxProvider>
  )
}
