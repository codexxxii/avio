import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "@/lib/use-context";
import { deleteNote } from "@/lib/api";
import { toast } from "sonner";

export default function NoteModal({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const { setViewNoteModal } = useContext();

  const onDelete = (noteId: string) => {
    toast.promise(
      (async () => {
        await deleteNote({ id: noteId });
        setViewNoteModal(false);
      })(),
      {
        success: "Note deleted",
        loading: "Deleting note...",
        error: "Something went wrong when deleting note",
      },
    );
  };
  return (
    <AnimatePresence>
      <div className="fixed grid place-items-center inset-0 top-0 right-0">
        <motion.div
          className="absolute inset-0 z-999 bg-white/10 backdrop-blur-sm"
          onClick={() => setViewNoteModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="w-2/5 h-100 rounded-md border border-gray-100 p-5 bg-white z-1000 shadow-md space-y-7 flex flex-col"
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
            <p className="text-3xl font-extrabold">{title}</p>
          </div>

          <div className="grow">
            <p>{content}</p>
          </div>

          <div className="w-full flex justify-end items-center gap-7">
            <motion.button
              type="button"
              onClick={() => setViewNoteModal(false)}
              className="bg-red-500 text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Close
            </motion.button>

            <motion.button
              className="bg-black text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onDelete(id)}
            >
              Complete
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
