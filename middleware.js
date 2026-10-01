import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Ye routes public rahenge taaki koi bhi anjaan visitor dekh sake
  publicRoutes: [
    "/",
    "/pricing",
    "/embed/(.*)",
    "/review/(.*)",
    "/api/testimonials",
    "/api/requests"
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
