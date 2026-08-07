import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

type RootContext = {
  queryClient: QueryClient;
};

const RootLayout = () => (
  <>
    <Outlet />
  </>
);

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
