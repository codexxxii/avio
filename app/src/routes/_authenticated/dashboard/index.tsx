import { createFileRoute } from "@tanstack/react-router";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MaxWidthWrapper className="">
      <p>
        {Intl.DateTimeFormat("US-en", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date())}
      </p>
    </MaxWidthWrapper>
  );
}
