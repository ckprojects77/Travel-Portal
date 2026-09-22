import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded-full border border-ink-900/10 p-2 text-ink-900 transition hover:bg-teal-50 disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-9 w-9 rounded-full text-sm font-semibold transition ${
            p === page ? "bg-teal-600 text-white shadow-soft" : "text-ink-900/60 hover:bg-teal-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-full border border-ink-900/10 p-2 text-ink-900 transition hover:bg-teal-50 disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
