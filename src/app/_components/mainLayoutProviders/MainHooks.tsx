/**
 * This component is used to track split testing data, page views, locale, and region.
 * It needs to be inside UserProvider (because of useTrackRegion).
 * That's why those hooks are in their own component.
 */
'use client'

import { useTrackLocale } from '@/hooks/tracking/useTrackLocale'
import { useTrackPageView } from '@/hooks/tracking/useTrackPageView'
import { useTrackSplitTesting } from '@/hooks/tracking/useTrackSplitTesting'

export default function MainHooks() {
  useTrackSplitTesting()
  useTrackPageView()
  useTrackLocale()

  return null
}
