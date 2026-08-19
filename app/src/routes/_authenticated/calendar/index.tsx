import Calendar from "@/components/calendar";
import AddEventModal from "@/components/modals/calendar/add-event-modal";
import AddRecipeModal from "@/components/modals/calendar/add-recipe-modal";
import AddWorkoutModal from "@/components/modals/calendar/add-workout-modal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full p-5 flex gap-7">
      <div className="w-3/5">
        <Calendar />
      </div>
      <div className="w-2/5 flex flex-col gap-7">
        <AddRecipeModal />
        <AddWorkoutModal />
        <AddEventModal />
      </div>
    </div>
  );
}
