import { useContext } from "@/lib/use-context";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateNote, createNoteSchema } from "@server/shared-types";
import { createNote } from "@/lib/api";
import { toast } from "sonner";

export default function CreateNoteModal() {
  const { setCreateNoteModal } = useContext();

  const form = useForm<CreateNote>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (values: CreateNote) => {
    toast.promise(async () => await createNote(values), {
      loading: "Creating note...",
      success: "Note Created",
      error: "Failed to create note",
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed grid place-items-center inset-0 top-0 right-0">
        <motion.div
          className="absolute inset-0 z-999 bg-white/10 backdrop-blur-sm"
          onClick={() => setCreateNoteModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        <FormProvider {...form}>
          <motion.form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/5 h-100 rounded-md border border-gray-100 p-5 bg-white z-1000 shadow-md space-y-4 flex flex-col"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <div className="w-full">
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Title"
                    className="w-full h-full outline-none border-none text-3xl font-extrabold"
                  />
                )}
              />
            </div>

            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Note"
                  className="resize-none grow outline-none"
                />
              )}
            />

            <div className="w-full flex justify-end items-center gap-4">
              <motion.button
                type="button"
                onClick={() => setCreateNoteModal(false)}
                className="bg-red-500 text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Cancel
              </motion.button>

              <motion.button
                type="submit"
                className="bg-black text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Save
              </motion.button>
            </div>
          </motion.form>
        </FormProvider>
      </div>
    </AnimatePresence>
  );
}
