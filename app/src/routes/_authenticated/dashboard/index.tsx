import { createFileRoute } from "@tanstack/react-router";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MaxWidthWrapper className="">
      <p></p>
    </MaxWidthWrapper>
  );
}
