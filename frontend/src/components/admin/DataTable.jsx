import { useState } from "react";
import { Search, Trash2, Pencil } from "lucide-react";

export default function DataTable({ columns, rows, onDelete, onEdit, searchKey = "name" }) {
  const [query, setQuery] = useState("");
  const filtered = rows.filter((r) => String(r[searchKey] || "").toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 border-b border-ink-900/5 p-4">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-sky-50 px-3 py-2">
          <Search className="h-4 w-4 text-ink-900/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-900/5 text-xs uppercase tracking-wider text-ink-900/40">
              {columns.map((c) => (
                <th key={c.key} className="px-5 py-3 font-semibold">{c.label}</th>
              ))}
              {(onEdit || onDelete) && <th className="px-5 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-900/5">
            {filtered.map((row, i) => (
              <tr key={row.id || i} className="transition hover:bg-sky-50/50">
                {columns.map((c) => (
                  <td key={c.key} className="px-5 py-3.5 text-ink-900/80">
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="rounded-lg p-1.5 text-sky-600 hover:bg-sky-50">
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="rounded-lg p-1.5 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-ink-900/40">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
