/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useSetCurrentSimulationFromParams } from '@/hooks/simulation/useSetCurrentSimulationFromParams'
import { useTrackLocale } from '@/hooks/tracking/useTrackLocale'
import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'
import { useTrackRegion } from '@/hooks/tracking/useTrackRegion'
import { useTrackSplitTesting } from '@/hooks/tracking/useTrackSplitTesting'
import { useFixedRegion } from '@/hooks/useFixedRegion'
import { useInitSimulationParam } from '@/hooks/useInitSimulationParam'
import { useUserInfosParams } from '@/hooks/useUserInfosParams'
import { PropsWithChildren } from 'react'

export default function MainHooks({ children }: PropsWithChildren) {
  useTrackSplitTesting()
  useTrackPageView()
  useTrackLocale()
  useTrackRegion()
  useFixedRegion()
  useUserInfosParams()
  useInitSimulationParam()

  // Set the current simulation from the URL params (if applicable)
  const { isCorrectSimulationSet } = useSetCurrentSimulationFromParams()

  // if (!isCorrectSimulationSet)
  //   return (
  //     <div className="flex h-screen flex-1 items-center justify-center">
  //       <Loader color="dark" />
  //     </div>
  //   )

  return children
}
