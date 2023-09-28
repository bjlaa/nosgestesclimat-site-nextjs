const groupExclusionRegexp = /\/(sondage|conférence)\//

declare global {
  interface Window {
    _paq: any[]
  }
}

export const trackEvent = (args: (string | null)[]) => {
  if (window.location.pathname.match(groupExclusionRegexp)) return

  // Pass a copy of the array to avoid mutation
  window?._paq?.push([...args])
}

export const trackPageView = (url: string) => {
  if (window.location.pathname.match(groupExclusionRegexp)) return

  window?._paq?.push(['setCustomUrl', url])
  window?._paq?.push(['setDocumentTitle', document?.title])

  // remove all previously assigned custom variables, requires Matomo (formerly Piwik) 3.0.2
  window?._paq?.push(['deleteCustomVariables', 'page'])
  window?._paq?.push(['setGenerationTimeMs', 0])

  window?._paq?.push(['trackPageView'])
}
