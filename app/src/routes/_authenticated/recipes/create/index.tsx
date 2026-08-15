import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/recipes/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-5 w-full">Hello "/_authenticated/recipes/create/"!</div>
  );
}
