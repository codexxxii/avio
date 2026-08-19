import { useContext } from "@/lib/use-context";
import { Eye, Trash, XIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { deleteRecipe } from "@/lib/api";

export default function RecipeOptionsModal({
  recipe,
}: {
  recipe: { id: string; name: string };
}) {
  const { setRecipeOptionsModal } = useContext();

  const onDelete = () => {
    toast.promise(
      async () => {
        await deleteRecipe(recipe.id);
        setRecipeOptionsModal(false);
      },
      {
        success: "Recipe deleted",
        loading: "Deleting recipe...",
        error: "Error occured while deleting recipe",
      },
    );
  };
  return (
    <div className="fixed inset-0 grid place-items-center">
      <div
        className="absolute inset-0 bg-white/10 backdrop-blur-md"
        onClick={() => setRecipeOptionsModal(false)}
      />
      <div className="w-full max-w-lg border border-gray-200 rounded-md px-5 py-4 flex flex-col gap-7 bg-white z-1000 shadow-md">
        <div className="w-full flex justify-between">
          <p className="text-2xl font-extrabold tracking-tighter">
            {recipe.name}
          </p>
          <button
            className="p-0! w-8 grid place-items-center bg-gray-100"
            onClick={() => setRecipeOptionsModal(false)}
          >
            <XIcon size={12} />
          </button>
        </div>
        <div className="w-ful flex gap-7">
          <Link
            to={"/recipes/$recipeId"}
            params={{ recipeId: recipe.id }}
            className="w-1/2"
          >
            <button
              className="w-full h-12 flex justify-center items-center gap-2 border border-emerald-300 bg-emerald-200"
              onClick={() => setRecipeOptionsModal(false)}
            >
              <Eye size={17} />
              <p className="text-md">View</p>
            </button>
          </Link>
          <button
            className="w-1/2 h-12 flex justify-center items-center gap-2 border border-rose-300 bg-rose-200"
            onClick={onDelete}
          >
            <Trash size={17} />
            <p className="text-md">Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
}
