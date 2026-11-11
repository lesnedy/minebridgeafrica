import { createFileRoute, Outlet } from "@tanstack/react-router";

// The news desk renders its own sign-in card when there is no session, so a
// direct visit to /admin can log in instead of bouncing to a separate page.
export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  staticData: { sitemap: false },
  component: () => <Outlet />,
});
