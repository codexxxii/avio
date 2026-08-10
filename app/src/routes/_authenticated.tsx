import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import Sidebar from "@/components/sidebar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    const user = context.queryClient.fetchQuery(userQueryOptions);
    return user;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const user = Route.useRouteContext();

  if (!user) {
    return Navigate({ to: "/" });
  }
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <main className="w-4/5 flex">
        <Outlet />
      </main>
    </div>
  );
}
