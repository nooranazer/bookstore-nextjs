
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // Publicly accessible paths
// const publicPaths = ['/', '/login', '/register', '/about']

// export function middleware(request: NextRequest) {
//   console.log('Middleware running')
//   const token = request.cookies.get('token')?.value
//   const pathname = request.nextUrl.pathname

//   // If the current path is public
//   const isPublic = publicPaths.includes(pathname)

//   // Redirect to login if not public and no token
//   if (!isPublic && !token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png).*)',
//   ],
// }

import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/', '/login', '/register', '/api/set-cookie'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/booklist', '/addbook', '/editbook/:path*', '/api/:path*'], // list all protected routes
};
