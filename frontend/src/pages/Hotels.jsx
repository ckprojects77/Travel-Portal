import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import HotelCard from "../components/hotels/HotelCard";
import SkeletonCard from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import ApiErrorState from "../components/common/ApiErrorState";
import useApi from "../hooks/useApi";

const hotelCategories = ["All", "Luxury", "Boutique", "Traditional"];

export default function Hotels() {
  const [category, setCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(700);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (minRating) params.set("minRating", minRating);
    params.set("maxPrice", maxPrice);
    return params.toString();
  }, [category, minRating, maxPrice]);

  const { data, loading, error, refetch } = useApi(`/hotels?${queryString}`, { deps: [queryString] });
  const hotels = data || [];

  return (
    <PageTransition>
      <div className="bg-sky-50/40 pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Hotels" }]} />
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Hotels & Stays
          </motion.h1>
          <p className="mt-2 text-ink-900/55">{loading ? "Loading..." : `${hotels.length} handpicked properties across our top destinations.`}</p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
            <aside>
              <div className="card p-6 lg:sticky lg:top-28">
                <h3 className="mb-5 flex items-center gap-2 font-bold text-ink-900">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </h3>

                <div className="mb-6">
                  <p className="mb-3 text-sm font-bold text-ink-900">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {hotelCategories.map((c) => (
                      <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${category === c ? "bg-teal-600 text-white" : "bg-sky-50 text-ink-900/60 hover:bg-teal-50"}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-3 text-sm font-bold text-ink-900">Minimum Rating</p>
                  <div className="flex gap-2">
                    {[0, 4, 4.5, 4.8].map((r) => (
                      <button key={r} onClick={() => setMinRating(r)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${minRating === r ? "bg-teal-600 text-white" : "bg-sky-50 text-ink-900/60 hover:bg-teal-50"}`}>
                        {r === 0 ? "Any" : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-bold text-ink-900">Max Price: ${maxPrice}/night</p>
                  <input type="range" min="80" max="700" step="10" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-teal-600" />
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {error ? (
                <ApiErrorState error={error} onRetry={refetch} />
              ) : (
                <>
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                    : hotels.map((h, i) => <HotelCard key={h.id} hotel={h} index={i} />)}

                  {!loading && hotels.length === 0 && (
                    <EmptyState title="No hotels match your filters" message="Try widening your price range or rating filter." />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
