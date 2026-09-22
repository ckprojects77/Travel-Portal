import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function FAQAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-ink-900/10 rounded-3xl border border-ink-900/10 bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-semibold text-ink-900">{item.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="flex-shrink-0 text-teal-600">
              <Plus className="h-5 w-5" />
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink-900/60">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
