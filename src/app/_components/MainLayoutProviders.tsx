'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import { useTrackSplitTesting } from '@/hooks/useTrackSplitTesting'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'
import { IframeResizer } from './mainLayoutProviders/IframeResizer'
import PageViewTracker from './mainLayoutProviders/PageViewTracker'
import QueryClientProviderWrapper from './mainLayoutProviders/QueryClientProviderWrapper'
import QueryParamsProvider from './mainLayoutProviders/QueryParamsProvider'
import SimulationFromUrlLoader from './mainLayoutProviders/SimulationFromUrlLoader'

export default function MainLayoutProviders({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  // Handles sending split testing data to Matomo
  useTrackSplitTesting()

  return (
    <QueryParamsProvider>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <PageViewTracker>
            <IframeResizer />
            <UserProvider
              initialRegion={region}
              storageKey="nosgestesclimat::v3">
              <SimulationFromUrlLoader />

              {children}
            </UserProvider>
          </PageViewTracker>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </QueryParamsProvider>
  )
}
