import { createFileRoute } from "@tanstack/react-router";
import { Plus, Ruler, Scale, User } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="w-[60vw] p-5 space-y-4">
        <div className="w-full flex justify-between items-center">
          <p className="text-4xl font-extrabold tracking-tighter">Dashboard</p>
          <p className="text-sm text-gray-500">
            {Intl.DateTimeFormat("US-en", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            }).format(new Date())}
          </p>
        </div>
        <div className="border border-gray-100 rounded-md w-full h-140 grid place-items-center">
          Chart
        </div>
        <div className="w-full grow flex h-60 gap-4">
          <div className="w-3/5 h-full grid grid-cols-2 gap-4">
            <div className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-blue-100">
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <Scale />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Weight</p>
                <p>139lb</p>
              </div>
            </div>
            <div className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-green-100">
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <Ruler />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Height</p>
                <p>5' 1"</p>
              </div>
            </div>
            <div className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-red-100">
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <User />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Age</p>
                <p>27</p>
              </div>
            </div>
            <div className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-indigo-100">
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <User />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Age</p>
                <p>27</p>
              </div>
            </div>
          </div>
          <div className="w-2/5 h-full ">
            <div className="w-full flex justify-between items-center">
              <p className="text-lg font-extrabold tracking-tighter">Notes</p>
              <button className="bg-black text-white h-7! w-7! p-0! grid place-items-center">
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>
      </main>
      <div className="w-[20vw] border-l border-l-gray-100 p-5">right bar</div>
    </>
  );
}
