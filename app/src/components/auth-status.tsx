import { Show, SignInButton, SignUpButton, SignOutButton } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

export default function AuthStatus() {
  return (
    <nav className="flex items-center gap-5">
      <Show when={"signed-in"}>
        <Link to="/dashboard">Dashboard</Link>
        <SignOutButton>
          <button className="bg-red-700 text-white">Sign Out</button>
        </SignOutButton>
      </Show>
      <Show when={"signed-out"}>
        <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
          <button className="border">Sign In</button>
        </SignInButton>
        <SignUpButton mode="modal" forceRedirectUrl={"/dashboard"}>
          <button className="bg-white text-black flex items-center gap-2 group">
            Get Started{" "}
            <ArrowRightIcon
              size={12}
              className="transition-all ease-in-out duration-300 group-hover:translate-x-0.5"
            />
          </button>
        </SignUpButton>
      </Show>
    </nav>
  );
}
