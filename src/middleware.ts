import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'
import { NextRequest } from 'next/server'
import { ABTest } from './helpers/ab-testing/ab-test'

export function middleware(request: NextRequest) {
  const ABTestingResponse = ABTest(request)

  if (ABTestingResponse) {
    return ABTestingResponse
  }

  return i18nRouter(request, i18nConfig)
}

// only applies this middleware to files in the app directory
export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*|_next).*)',
}
