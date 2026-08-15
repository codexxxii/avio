import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/recipes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full p-5">
      <motion.div
        className="w-full flex justify-between items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        <motion.p
          className="text-4xl font-extrabold tracking-tighter"
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              },
            },
          }}
        >
          My Recipes
        </motion.p>
        <Link to="/recipes/create">
          <motion.button
            className="bg-black text-white h-7! w-7! p-0! grid place-items-center"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Plus size={15} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
