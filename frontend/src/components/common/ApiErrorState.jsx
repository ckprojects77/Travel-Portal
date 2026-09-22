import { WifiOff, RotateCw } from "lucide-react";

export default function ApiErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-red-200 bg-red-50/50 py-16 text-center">
      <div className="rounded-full bg-red-100 p-4">
        <WifiOff className="h-8 w-8 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-ink-900">Couldn't load data</h3>
      <p className="max-w-sm text-sm text-ink-900/50">
        {error?.message || "Something went wrong talking to the server."}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary !py-2 !px-4 text-sm">
          <RotateCw className="h-4 w-4" /> Try again
        </button>
      )}
    </div>
  );
}
