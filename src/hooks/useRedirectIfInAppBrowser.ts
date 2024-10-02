import InApp from 'detect-inapp'
import { useEffect, useState } from 'react'

export const useRedirectIfInAppBrowser = () => {
  const [isInApp, setIsInApp] = useState(false)

  useEffect(() => {
    const inapp = new InApp(navigator.userAgent)
    setIsInApp(inapp.isInApp)
  }, [])

  // useEffect(() => {
  //   if (isInApp) {
  //     window.location.href = 'intent:https://www.nosgestesclimat.fr/#Intent;end'
  //   }
  // }, [])

  return { isInApp }
}