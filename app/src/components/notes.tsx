import { motion } from "framer-motion";
import { itemVariants } from "@/lib/animations";
import { useContext } from "@/lib/use-context";
import { Eye, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NoteModal from "./modals/notes/note-modal";
import { useState } from "react";

export default function Notes() {
  const { setCreateNoteModal, setViewNoteModal, viewNoteModal } = useContext();
  const [note, setNote] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return (
    <motion.div
      className="w-2/5 h-full space-y-4"
      variants={itemVariants as any}
    >
      <motion.div
        className="w-full flex justify-between items-center"
        variants={itemVariants as any}
      >
        <p className="text-lg font-extrabold tracking-tighter">Notes</p>

        <motion.button
          className="bg-black text-white h-7! w-7! p-0! grid place-items-center"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setCreateNoteModal(true)}
        >
          <Plus size={15} />
        </motion.button>
      </motion.div>
      {isLoading && <p>loading...</p>}
      {error && <p>Somthing went wrong, try again</p>}
      {data?.data && (
        <>
          {data.data.map((note) => (
            <div
              key={note.id}
              className="w-full flex justify-between items-center gap-2"
            >
              <div className="grow">
                <p>- {note.title}</p>
              </div>
              <Eye
                size={17}
                className="cursor-pointer"
                onClick={() => {
                  setNote({
                    id: note.id,
                    title: note.title,
                    content: note.content,
                  });
                  setViewNoteModal(true);
                }}
              />
            </div>
          ))}
        </>
      )}
      {viewNoteModal && (
        <NoteModal
          id={note?.id!}
          title={note?.title!}
          content={note?.content!}
        />
      )}
    </motion.div>
  );
}
