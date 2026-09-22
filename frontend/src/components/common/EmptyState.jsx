import { SearchX } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", message = "Try adjusting your filters.", icon: Icon = SearchX }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink-900/15 py-20 text-center">
      <div className="rounded-full bg-teal-50 p-4">
        <Icon className="h-8 w-8 text-teal-600" />
      </div>
      <h3 className="text-lg font-bold text-ink-900">{title}</h3>
      <p className="max-w-xs text-sm text-ink-900/50">{message}</p>
    </div>
  );
}
