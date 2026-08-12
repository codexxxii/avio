import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";

type RootContext = {
  queryClient: QueryClient;
};

const RootLayout = () => (
  <>
    <Outlet />
    <Toaster />
  </>
);

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
});
