import { useContext } from "@/lib/use-context";

export default function CreateNoteModal() {
  const { setCreateNoteModal } = useContext();

  return (
    <div
      className="fixed inset-0 z-1000 bg-white/10 backdrop-blur-md grid place-items-center"
      onClick={() => setCreateNoteModal(false)}
    >
      <div className="w-2/5 h-100 rounded-md border border-gray-100 px-5 py-2 bg-white">
        <div>
          <input type="text" placeholder="Title" />
        </div>
        <textarea placeholder="Note" />
        <div>
          <button onClick={() => setCreateNoteModal(false)}>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}
