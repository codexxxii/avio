import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";

const workouts = {
  chest: [
    "Bench Press",
    "Incline Dumbbell Press",
    "Chest Press Machine",
    "Cable Fly",
    "Pec Deck",
    "Push-Ups",
  ],

  back: [
    "Lat Pulldown",
    "Pull-Ups",
    "Assisted Pull-Ups",
    "Seated Cable Row",
    "Barbell Row",
    "Dumbbell Row",
    "Face Pulls",
    "Straight-Arm Pulldown",
  ],

  legs: [
    "Barbell Squat",
    "Leg Press",
    "Romanian Deadlift",
    "Leg Extension",
    "Leg Curl",
    "Walking Lunges",
    "Bulgarian Split Squat",
    "Calf Raises",
  ],

  shoulders: [
    "Overhead Shoulder Press",
    "Dumbbell Shoulder Press",
    "Lateral Raises",
    "Front Raises",
    "Rear-Delt Fly",
    "Face Pulls",
  ],

  biceps: [
    "Dumbbell Curls",
    "Hammer Curls",
    "Barbell Curls",
    "Preacher Curls",
    "Cable Curls",
  ],

  triceps: [
    "Tricep Pushdowns",
    "Overhead Tricep Extensions",
    "Skull Crushers",
    "Dips",
    "Close-Grip Bench Press",
  ],

  core: [
    "Crunches",
    "Cable Crunches",
    "Hanging Leg Raises",
    "Reverse Crunches",
    "Planks",
    "Ab Wheel Rollouts",
    "Russian Twists",
  ],

  cardio: [
    "Treadmill",
    "StairMaster",
    "Elliptical",
    "Stationary Bike",
    "Rowing Machine",
    "Incline Walking",
  ],
} as const;

type MuscleGroup = keyof typeof workouts;

type SelectedWorkout = {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: number;
};

type WorkoutPlan = {
  id: string;
  date: string;
  workouts: SelectedWorkout[];
};

type AddWorkoutModalProps = {
  onCreate?: (workout: WorkoutPlan) => void;
};

export default function AddWorkoutModal({ onCreate }: AddWorkoutModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState("");
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>("chest");

  const [selectedWorkouts, setSelectedWorkouts] = useState<SelectedWorkout[]>(
    [],
  );

  function toggleWorkout(workoutName: string) {
    const exists = selectedWorkouts.some(
      (workout) => workout.name === workoutName,
    );

    if (exists) {
      setSelectedWorkouts((current) =>
        current.filter((workout) => workout.name !== workoutName),
      );

      return;
    }

    setSelectedWorkouts((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: workoutName,
        muscleGroup,
        sets: 3,
        reps: 10,
      },
    ]);
  }

  function updateWorkout(id: string, field: "sets" | "reps", value: number) {
    setSelectedWorkouts((current) =>
      current.map((workout) =>
        workout.id === id
          ? {
              ...workout,
              [field]: Math.max(1, value),
            }
          : workout,
      ),
    );
  }

  function removeWorkout(id: string) {
    setSelectedWorkouts((current) =>
      current.filter((workout) => workout.id !== id),
    );
  }

  function handleCreateWorkout(e: React.FormEvent) {
    e.preventDefault();

    if (!date || selectedWorkouts.length === 0) {
      return;
    }

    const workoutPlan: WorkoutPlan = {
      id: crypto.randomUUID(),
      date,
      workouts: selectedWorkouts,
    };

    onCreate?.(workoutPlan);

    setDate("");
    setSelectedWorkouts([]);
    setMuscleGroup("chest");

    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {/* Add Workout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="h-20! w-full flex items-center justify-center gap-2 bg-rose-300 text-2xl"
      >
        Add Workout
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
                    Create Workout
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Build a workout and schedule it for a future date.
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
                onSubmit={handleCreateWorkout}
                className="flex min-h-0 flex-1 flex-col"
              >
                {/* Date */}
                <div className="shrink-0 px-6 pt-5">
                  <label
                    htmlFor="workout-date"
                    className="text-sm font-medium text-gray-700"
                  >
                    Workout Date
                  </label>

                  <input
                    id="workout-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-2 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {/* Muscle Groups */}
                <div className="shrink-0 px-6 pt-5">
                  <label className="text-sm font-medium text-gray-700">
                    Muscle Group
                  </label>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {Object.keys(workouts).map((group) => {
                      const typedGroup = group as MuscleGroup;

                      const active = muscleGroup === typedGroup;

                      return (
                        <button
                          key={group}
                          type="button"
                          onClick={() => setMuscleGroup(typedGroup)}
                          className={[
                            "rounded-md border px-3 py-1.5 text-sm capitalize transition",
                            active
                              ? "border-rose-400 bg-rose-100 text-rose-700"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          {group}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Exercise List */}
                <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                  <label className="text-sm font-medium text-gray-700">
                    Exercises
                  </label>

                  <div className="mt-2 space-y-2">
                    {workouts[muscleGroup].map((workout) => {
                      const selected = selectedWorkouts.find(
                        (item) => item.name === workout,
                      );

                      return (
                        <div
                          key={workout}
                          className={[
                            "rounded-lg border transition",
                            selected
                              ? "border-rose-200 bg-rose-50"
                              : "border-gray-200",
                          ].join(" ")}
                        >
                          {/* Exercise selection */}
                          <button
                            type="button"
                            onClick={() => toggleWorkout(workout)}
                            className="flex w-full items-center justify-between p-3 text-left"
                          >
                            <span
                              className={[
                                "text-sm font-medium",
                                selected ? "text-rose-700" : "text-gray-700",
                              ].join(" ")}
                            >
                              {workout}
                            </span>

                            <div
                              className={[
                                "grid size-5 place-items-center rounded border text-xs",
                                selected
                                  ? "border-rose-500 bg-rose-500 text-white"
                                  : "border-gray-300",
                              ].join(" ")}
                            >
                              {selected && "✓"}
                            </div>
                          </button>

                          {/* Sets + Reps */}
                          <AnimatePresence>
                            {selected && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  height: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                }}
                                exit={{
                                  opacity: 0,
                                  height: 0,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="flex items-center gap-3 border-t border-rose-100 px-3 pb-3 pt-3">
                                  {/* Sets */}
                                  <div className="flex flex-1 items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2">
                                    <span className="text-xs text-gray-500">
                                      Sets
                                    </span>

                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateWorkout(
                                            selected.id,
                                            "sets",
                                            selected.sets - 1,
                                          )
                                        }
                                        className="grid size-7 place-items-center rounded bg-gray-100 hover:bg-gray-200"
                                      >
                                        <Minus className="size-3" />
                                      </button>

                                      <span className="w-5 text-center text-sm font-medium">
                                        {selected.sets}
                                      </span>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateWorkout(
                                            selected.id,
                                            "sets",
                                            selected.sets + 1,
                                          )
                                        }
                                        className="grid size-7 place-items-center rounded bg-gray-100 hover:bg-gray-200"
                                      >
                                        <Plus className="size-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Reps */}
                                  <div className="flex flex-1 items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2">
                                    <span className="text-xs text-gray-500">
                                      Reps
                                    </span>

                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateWorkout(
                                            selected.id,
                                            "reps",
                                            selected.reps - 1,
                                          )
                                        }
                                        className="grid size-7 place-items-center rounded bg-gray-100 hover:bg-gray-200"
                                      >
                                        <Minus className="size-3" />
                                      </button>

                                      <span className="w-5 text-center text-sm font-medium">
                                        {selected.reps}
                                      </span>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          updateWorkout(
                                            selected.id,
                                            "reps",
                                            selected.reps + 1,
                                          )
                                        }
                                        className="grid size-7 place-items-center rounded bg-gray-100 hover:bg-gray-200"
                                      >
                                        <Plus className="size-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Remove */}
                                  <button
                                    type="button"
                                    onClick={() => removeWorkout(selected.id)}
                                    className="grid size-9 place-items-center rounded-md text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                  >
                                    <Trash2 className="size-4" />
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-between border-t border-gray-100 p-6">
                  <p className="text-sm text-gray-500">
                    {selectedWorkouts.length}{" "}
                    {selectedWorkouts.length === 1 ? "exercise" : "exercises"}{" "}
                    selected
                  </p>

                  <div className="flex gap-2">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="h-10 rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>

                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: date && selectedWorkouts.length > 0 ? 1.02 : 1,
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!date || selectedWorkouts.length === 0}
                      className="h-10 rounded-md bg-rose-500 px-4 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Add Workout
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
