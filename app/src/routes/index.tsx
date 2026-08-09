import AuthStatus from "@/components/auth-status";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <header className="w-full h-15">
        <MaxWidthWrapper className="h-full border-b border-b-gray-900 flex justify-between items-center">
          <p className="text-3xl font-semibold tracking-tighter">Avio</p>
          <AuthStatus />
        </MaxWidthWrapper>
      </header>
      <MaxWidthWrapper className="py-5">
        <h3>Welcome Home!</h3>
      </MaxWidthWrapper>
    </div>
  );
}
