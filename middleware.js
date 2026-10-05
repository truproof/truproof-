import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Sirf Dashboard aur private management routes ko lock rakhein
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  },
  {
    frontendApiProxy: {
      enabled: true,
    },
  }
);

export const config = {
  matcher: [
    // Next.js static files aur internals ko chhod kar sab par run hoga
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Clerk production proxy endpoint for vercel.app
    '/__clerk(.*)',
  ],
};
