import { Star } from "lucide-react";

export default function Rating({ value = 0, reviews, size = 14, showValue = true }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < full
                ? "fill-sunset-500 text-sunset-500"
                : i === full && hasHalf
                ? "fill-sunset-300 text-sunset-500"
                : "fill-ink-900/10 text-ink-900/10"
            }
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-semibold text-ink-900">{value}</span>}
      {reviews != null && <span className="text-xs text-ink-900/50">({reviews.toLocaleString()})</span>}
    </div>
  );
}
