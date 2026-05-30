import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

const publicRoutes = ['/signin', '/signup'];


const isAuthenticated = (token: string | undefined) => {
    return !!token;
}

const isPublicRoute = (pathname: string) => {
    return publicRoutes.includes(pathname);
}


export const proxy = (request: NextRequest) => {
     const token = request.cookies.get('notes-access')?.value;
    const { pathname } = request.nextUrl;
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }
    if (!isAuthenticated(token) && !isPublicRoute(pathname)) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }
    return NextResponse.next();
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
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
