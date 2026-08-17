import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState } from "react";

const recipes = {
  breakfast: [
    "Protein Pancakes",
    "Avocado Toast",
    "Greek Yogurt Bowl",
    "Egg & Turkey Breakfast",
    "Overnight Oats",
  ],

  lunch: [
    "Grilled Chicken Rice Bowl",
    "Turkey Sandwich",
    "Chicken Caesar Salad",
    "Steak Burrito Bowl",
    "Tuna Pasta Salad",
  ],

  dinner: [
    "Chicken Alfredo",
    "Beef & Broccoli",
    "Grilled Salmon & Rice",
    "Chicken Fajitas",
    "Turkey Pasta",
  ],

  snack: [
    "Protein Shake",
    "Protein Bar",
    "Greek Yogurt & Berries",
    "Peanut Butter Banana",
    "Cottage Cheese & Fruit",
  ],
} as const;

type MealType = keyof typeof recipes;

type SelectedRecipe = {
  id: string;
  name: string;
  mealType: MealType;
};

type MealPlan = {
  id: string;
  date: string;
  meals: SelectedRecipe[];
};

type AddRecipeModalProps = {
  onCreate?: (mealPlan: MealPlan) => void;
};

export default function AddRecipeModal({ onCreate }: AddRecipeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState("");

  const [mealType, setMealType] = useState<MealType>("breakfast");

  const [selectedRecipes, setSelectedRecipes] = useState<SelectedRecipe[]>([]);

  function toggleRecipe(recipeName: string) {
    const existingRecipe = selectedRecipes.find(
      (recipe) => recipe.name === recipeName,
    );

    if (existingRecipe) {
      setSelectedRecipes((current) =>
        current.filter((recipe) => recipe.id !== existingRecipe.id),
      );

      return;
    }

    setSelectedRecipes((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: recipeName,
        mealType,
      },
    ]);
  }

  function handleCreateMealPlan(e: React.FormEvent) {
    e.preventDefault();

    if (!date || selectedRecipes.length === 0) {
      return;
    }

    const mealPlan: MealPlan = {
      id: crypto.randomUUID(),
      date,
      meals: selectedRecipes,
    };

    onCreate?.(mealPlan);

    setDate("");
    setSelectedRecipes([]);
    setMealType("breakfast");

    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {/* Add Recipe Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="h-20! w-full flex items-center justify-center gap-2 bg-emerald-300 text-2xl"
      >
        Add Recipe
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 10,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl"
            >
              {/* Header */}
              <div className="flex shrink-0 items-start justify-between border-b border-gray-100 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Plan Meals
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Choose what you want to eat on a future date.
                  </p>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="grid size-8 place-items-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X className="size-5" />
                </motion.button>
              </div>

              <form
                onSubmit={handleCreateMealPlan}
                className="flex min-h-0 flex-1 flex-col"
              >
                {/* Date */}
                <div className="shrink-0 px-6 pt-5">
                  <label
                    htmlFor="recipe-date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>

                  <input
                    id="recipe-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {/* Meal Type */}
                <div className="shrink-0 px-6 pt-5">
                  <label className="text-sm font-medium text-gray-700">
                    Meal
                  </label>

                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {Object.keys(recipes).map((type) => {
                      const typedType = type as MealType;

                      const active = mealType === typedType;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setMealType(typedType)}
                          className={[
                            "rounded-md border text-sm capitalize transition",
                            active
                              ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recipes */}
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                  <label className="text-sm font-medium text-gray-700">
                    Recipes
                  </label>

                  <div className="mt-2 space-y-2">
                    {recipes[mealType].map((recipe) => {
                      const selected = selectedRecipes.some(
                        (item) => item.name === recipe,
                      );

                      return (
                        <motion.button
                          key={recipe}
                          type="button"
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleRecipe(recipe)}
                          className={[
                            "flex w-full items-center justify-between rounded-lg border text-left transition",
                            selected
                              ? "border-emerald-300 bg-emerald-50"
                              : "border-gray-200 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          <div>
                            <p
                              className={[
                                "text-sm font-medium",
                                selected ? "text-emerald-700" : "text-gray-700",
                              ].join(" ")}
                            >
                              {recipe}
                            </p>
                          </div>

                          <div
                            className={[
                              "grid size-5 place-items-center rounded border transition",
                              selected
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : "border-gray-300",
                            ].join(" ")}
                          >
                            {selected && <Check className="size-3.5" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-between border-t border-gray-100 p-6">
                  <p className="text-sm text-gray-500">
                    {selectedRecipes.length}{" "}
                    {selectedRecipes.length === 1 ? "recipe" : "recipes"}{" "}
                    selected
                  </p>

                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="h-10! rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: date && selectedRecipes.length > 0 ? 1.02 : 1,
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!date || selectedRecipes.length === 0}
                      className="h-10! rounded-md bg-emerald-500 px-4 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Add to Calendar
                    </motion.button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
