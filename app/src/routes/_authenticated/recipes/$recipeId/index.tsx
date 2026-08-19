import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/recipes/$recipeId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { recipeId } = Route.useParams();

  return <div>Hello "/_authenticated/recipes/{recipeId}/"!</div>;
}
