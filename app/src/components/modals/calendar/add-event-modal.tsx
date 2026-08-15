import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

type Event = {
  id: string;
  name: string;
  date: string;
  time: string;
};

type AddEventModalProps = {
  onCreate?: (event: Event) => void;
};

export default function AddEventModal({ onCreate }: AddEventModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();

    if (!eventName.trim() || !date || !time) return;

    const newEvent: Event = {
      id: crypto.randomUUID(),
      name: eventName.trim(),
      date,
      time,
    };

    onCreate?.(newEvent);

    // Reset form
    setEventName("");
    setDate("");
    setTime("");

    setIsOpen(false);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      {/* Add Event Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="h-20! w-full flex items-center justify-center gap-2 bg-sky-300 text-2xl"
      >
        Add Event
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 grid place-items-center">
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
              className="relative z-10 w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl"
            >
              {/* Header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Create Event
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Add a new event to your calendar.
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

              {/* Form */}
              <form onSubmit={handleCreateEvent} className="space-y-5">
                {/* Event Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="event-name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Event Name
                  </label>

                  <input
                    id="event-name"
                    type="text"
                    placeholder="e.g. Team Meeting"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    autoFocus
                    className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label
                      htmlFor="event-date"
                      className="text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>

                    <input
                      id="event-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="event-time"
                      className="text-sm font-medium text-gray-700"
                    >
                      Time
                    </label>

                    <input
                      id="event-time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">
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
                      scale: eventName.trim() && date && time ? 1.02 : 1,
                    }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!eventName.trim() || !date || !time}
                    className="h-10 rounded-md bg-black px-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Create Event
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
