import { i18nRouter } from 'next-i18n-router';
import i18nConfig from '@/app/i18nConfig';
import {cookies} from "next/headers";
import {decrypt} from "@/app/lib/sessions";
import {NextResponse} from "next/server";

const protectedRoutes = [
    '/dashboard',
    '/content/categories',
    '/logout'

]

const publicRoutes = [
    '/login'
]

export async function middleware(request) {

  const path = request.nextUrl.pathname
  const isProtected = protectedRoutes.includes(path)
  const isPublic = publicRoutes.includes(path)

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  if (isPublic && session?.userId && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};