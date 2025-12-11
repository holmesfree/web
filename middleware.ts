import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CANONICAL_DOMAIN = 'freeholmes.org'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Skip for localhost development
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return NextResponse.next()
  }

  // Skip for Vercel preview deployments
  if (host.includes('vercel.app')) {
    return NextResponse.next()
  }

  // Redirect non-canonical domains to canonical
  if (!host.includes(CANONICAL_DOMAIN)) {
    url.host = CANONICAL_DOMAIN
    url.protocol = 'https'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  // Ensure HTTPS on canonical domain
  if (request.headers.get('x-forwarded-proto') !== 'https') {
    url.protocol = 'https'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
