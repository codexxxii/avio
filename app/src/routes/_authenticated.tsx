import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    const user = context.queryClient.fetchQuery(userQueryOptions);
    return user;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  if (!user) {
    return Navigate({ to: "/" });
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
