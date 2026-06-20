import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes: marketing homepage, free audit, and auth flows. Everything else requires auth.
const isPublicRoute = createRouteMatcher([
  "/",
  "/audit(.*)",
  "/sample-audit(.*)",
  "/demo(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/data-deletion(.*)",
  "/security(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|gif|png|svg|ico|webp|woff2?|ttf|map)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
