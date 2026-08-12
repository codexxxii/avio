import { sidebar } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/react";
import { Link, useLocation } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { sidebarVariants, itemVariants } from "@/lib/animations";

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.div
      className="w-1/5 border-r border-r-gray-100 p-5 flex flex-col justify-between"
      variants={sidebarVariants as any}
      initial="hidden"
      animate="visible"
    >
      <div>
        <motion.p
          variants={itemVariants as any}
          className="mb-5 text-4xl font-extrabold tracking-tighter"
        >
          avio
        </motion.p>
        <div className="flex flex-col gap-4">
          <motion.p
            variants={itemVariants as any}
            className="text-xs text-gray-500"
          >
            General
          </motion.p>
          {sidebar.general.map((link) => (
            <motion.div key={link.id} variants={itemVariants as any}>
              <Link to={link.href} className="w-full">
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
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <motion.p
          variants={itemVariants as any}
          className="text-xs text-gray-500"
        >
          Tools
        </motion.p>
        {sidebar.tools.map((link) => (
          <motion.div key={link.id} variants={itemVariants as any}>
            <Link to={link.href} className="w-full">
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
          </motion.div>
        ))}
        <motion.div variants={itemVariants as any}>
          <SignOutButton>
            <button className="w-full flex items-center gap-2 h-10 bg-red-500 text-white">
              <LogOut size={17} strokeWidth={1} absoluteStrokeWidth />
              <p>Log Out</p>
            </button>
          </SignOutButton>
        </motion.div>
      </div>
    </motion.div>
  );
}
