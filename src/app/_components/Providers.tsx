'use client'

import { IframeOptionsProvider } from '@/contexts/IframeOptionsContext'
import { UserProvider } from '@/publicodes-state'
import { PropsWithChildren, useEffect } from 'react'
import { IsClientCtxProvider } from './IsClientCtxProvider'
import { IframeResizer } from './providers/IframeResizer'
import PageViewTracker from './providers/PageViewTracker'
import QueryClientProviderWrapper from './providers/QueryClientProviderWrapper'

export default function Providers({
  children,
  region,
}: PropsWithChildren<{ region: { code: string; name: string } }>) {
  useEffect(() => {
    console.log('first render')
  }, [])
  return (
    <IsClientCtxProvider>
      <IframeOptionsProvider>
        <QueryClientProviderWrapper>
          <PageViewTracker>
            <IframeResizer />
            <UserProvider initialRegion={region}>
              <IsClientCtxProvider>{children}</IsClientCtxProvider>
            </UserProvider>
          </PageViewTracker>
        </QueryClientProviderWrapper>
      </IframeOptionsProvider>
    </IsClientCtxProvider>
  )
}
