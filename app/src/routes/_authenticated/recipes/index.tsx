import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AlertCircleIcon, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/lib/api";
import RecipeOptionsModal from "@/components/modals/recipes/recipe-options-modal";
import { useContext } from "@/lib/use-context";

export const Route = createFileRoute("/_authenticated/recipes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { recipeOptionsModal, setRecipeOptionsModal } = useContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return (
    <div className="w-full p-5 space-y-7">
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
      {data && (
        <div className="w-full grid grid-cols-4 gap-7 place-items-start">
          {data.data.map((recipe) => (
            <>
              <div
                onClick={() => setRecipeOptionsModal(true)}
                key={recipe.id}
                className="w-full rounded-md border border-gray-100 px-5 py-2 flex flex-col h-30 cursor-pointer relative"
              >
                <div className="grow flex justify-start items-start">
                  <p className="text-xl font-extrabold tracking-tighter">
                    {recipe.name}
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  <div className="px-2 py-1 rounded-md border border-gray-100">
                    <p className="text-xs capitalize">{recipe.category}</p>
                  </div>
                </div>
              </div>
              {recipeOptionsModal && <RecipeOptionsModal recipe={recipe} />}
            </>
          ))}
        </div>
      )}
      {isLoading && (
        <div className="w-full h-30 grid place-items-center">
          <div className="w-5 h-5 rounded-full border border-gray-500 animate-spin border-r-transparent!" />
        </div>
      )}
      {error && (
        <div className="w-full h-30 flex flex-col justify-center items-center gap-2">
          <AlertCircleIcon size={40} className="text-red-500" />
          <p className="text-sm text-gray-500 text-center">
            Something went wrong
            <br />
            try again
          </p>
        </div>
      )}
    </div>
  );
}
