import { captureException } from '@sentry/nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import i18nMiddleware from './middlewares/i18nMiddleware'
import splitTestingMiddleware from './middlewares/splitTestingMiddleware'

export const middlewares = [splitTestingMiddleware, i18nMiddleware]

export async function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next()

    for await (const middlewareFunction of middlewares) {
      const middlewareResponse = await middlewareFunction(request)

      if (isRedirecting(middlewareResponse)) {
        return middlewareResponse
      }
      if (isRewriting(middlewareResponse)) {
        return middlewareResponse
      }
      if (isI18n(middlewareResponse)) {
        return middlewareResponse
      }
    }
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // You can add Sentry logging here if needed
    captureException(error)
    return NextResponse.next()
  }
}

function isRedirecting(response: NextResponse): boolean {
  return response.status === 307 || response.status === 308
}
function isRewriting(response: NextResponse): boolean {
  return response.headers.has('x-middleware-rewrite')
}
function isI18n(response: NextResponse): boolean {
  return response.headers.has('x-next-i18n-router-locale')
}

/**
 * Evite que le middleware soit appliqué à certaines routes
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - images (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.webmanifest (manifest file)
     */
    {
      source:
        '/((?!api|_next/static|favicon.ico|images|manifest.webmanifest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}
