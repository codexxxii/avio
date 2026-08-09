import { sidebar } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/react";
import { Link, useLocation } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-1/5 border-r border-r-gray-100 p-5 flex flex-col justify-between">
      <div>
        <p className="mb-5 text-4xl font-extrabold tracking-tighter">avio</p>
        <div className="flex flex-col gap-4">
          <p className="text-xs text-gray-500">General</p>
          {sidebar.general.map((link) => (
            <Link to={link.href} key={link.id} className="w-full">
              <button
                className={cn(
                  "w-full flex items-center gap-2 h-10",
                  location.pathname === link.href
                    ? "bg-gray-100"
                    : "hover:bg-gray-100",
                )}
              >
                <link.icon size={17} strokeWidth={1} absoluteStrokeWidth />
                <p>{link.label}</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xs text-gray-500">Tools</p>
        {sidebar.tools.map((link) => (
          <Link to={link.href} key={link.id} className="w-full">
            <button
              className={cn(
                "w-full flex items-center gap-2 h-10",
                location.pathname === link.href
                  ? "bg-gray-100"
                  : "hover:bg-gray-100",
              )}
            >
              <link.icon size={17} strokeWidth={1} absoluteStrokeWidth />
              <p>{link.label}</p>
            </button>
          </Link>
        ))}
        <SignOutButton>
          <button className="w-full flex items-center gap-2 h-10 bg-red-500 text-white">
            <LogOut size={17} strokeWidth={1} absoluteStrokeWidth />
            <p>Log Out</p>
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
