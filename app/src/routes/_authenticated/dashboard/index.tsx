import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Ruler, Scale, User } from "lucide-react";
import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";
import { useContext } from "@/lib/use-context";
import CreateNoteModal from "@/components/modals/notes/create-note-modal";
import Notes from "@/components/notes";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { createNoteModal } = useContext();

  return (
    <>
      <main className="w-[60vw] p-5 space-y-4 relative">
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
            Dashboard
          </motion.p>

          <motion.p
            className="text-sm text-gray-500"
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
            {Intl.DateTimeFormat("US-en", {
              month: "long",
              day: "2-digit",
              year: "numeric",
            }).format(new Date())}
          </motion.p>
        </motion.div>
        <div className="border border-gray-100 rounded-md w-full h-140 grid place-items-center">
          Chart
        </div>
        <motion.div
          className="w-full grow flex h-60 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            className="w-3/5 h-full grid grid-cols-2 gap-4"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={itemVariants as any}
              className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-blue-100"
            >
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <Scale />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Weight</p>
                <p>139lb</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants as any}
              className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-green-100"
            >
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <Ruler />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Height</p>
                <p>5' 1"</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants as any}
              className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-red-100"
            >
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <User />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">Age</p>
                <p>27</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants as any}
              className="w-full h-full rounded-md flex gap-2 justify-center items-center bg-indigo-100"
            >
              <div className="w-15 h-15 rounded-full bg-white grid place-items-center">
                <Gauge />
              </div>
              <div className="flex text-center flex-col">
                <p className="text-gray-500">BMI</p>
                <p>26.44</p>
              </div>
            </motion.div>
          </motion.div>

          <Notes />
        </motion.div>
        {createNoteModal && <CreateNoteModal />}
      </main>
      <div className="w-[20vw] border-l border-l-gray-100 p-5">
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
            className="text-xl font-extrabold tracking-tighter"
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
            Todays Activities
          </motion.p>
        </motion.div>
      </div>
    </>
  );
}
