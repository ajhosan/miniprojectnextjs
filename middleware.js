import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: false
    })
    console.log("DATATOKEN")
    console.log(req.nextUrl.pathname)
    // if (req.nextUrl.pathname.startsWith('/csr') && token) {
    //     return NextResponse.redirect(new URL('/csr', req.url))
    // }
    if (req.nextUrl.pathname.startsWith('/csr') && !token) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    if (req.nextUrl.pathname.startsWith('/ssr') && !token) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/csr',
        '/csr/:path*',
        '/ssr',
        '/ssr/:path*'
    ]
}