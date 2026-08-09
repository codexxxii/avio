import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-5 flex w-full bg-red-500 h-screen">
      <main className="w-[60vw]">main</main>
      <div className="w-20vw border-l border-l-gray-100">right bar</div>
    </div>
  );
}
