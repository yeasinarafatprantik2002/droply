import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/register",
]);

export default clerkMiddleware(async (auth, req) => {
  const user = auth();
  const userId = (await user).userId;
  const url = new URL(req.url);

  if (userId && isPublicRoute(req) && url.pathname !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
