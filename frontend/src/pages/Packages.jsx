import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowDownUp } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import PackageCard from "../components/packages/PackageCard";
import SkeletonCard from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import ApiErrorState from "../components/common/ApiErrorState";
import useApi from "../hooks/useApi";

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function Packages() {
  const [maxPrice, setMaxPrice] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const [durationFilter, setDurationFilter] = useState("Any");
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.set("maxPrice", maxPrice);
    if (minRating) params.set("minRating", minRating);
    if (sort !== "popular") params.set("sort", sort);
    return params.toString();
  }, [maxPrice, minRating, sort]);

  const { data, loading, error, refetch } = useApi(`/packages?${queryString}`, { deps: [queryString] });

  const filtered = useMemo(() => {
    let list = data || [];
    if (durationFilter === "1-3 Days") list = list.filter((p) => p.duration <= 3);
    if (durationFilter === "4-6 Days") list = list.filter((p) => p.duration >= 4 && p.duration <= 6);
    if (durationFilter === "7+ Days") list = list.filter((p) => p.duration >= 7);
    return list;
  }, [data, durationFilter]);

  const FiltersPanel = () => (
    <div className="space-y-7">
      <div>
        <p className="mb-3 text-sm font-bold text-ink-900">Max Price: ${maxPrice}</p>
        <input type="range" min="500" max="2500" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-teal-600" />
      </div>
      <div>
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
        <p className="mb-3 text-sm font-bold text-ink-900">Duration</p>
        <div className="flex flex-col gap-2">
          {["Any", "1-3 Days", "4-6 Days", "7+ Days"].map((d) => (
            <button key={d} onClick={() => setDurationFilter(d)} className={`rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${durationFilter === d ? "bg-teal-50 text-teal-700" : "text-ink-900/60 hover:bg-sky-50"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="bg-sky-50/40 pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Tour Packages" }]} />
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Tour Packages
          </motion.h1>
          <p className="mt-2 text-ink-900/55">{loading ? "Loading..." : `${filtered.length} all-inclusive packages ready to book.`}</p>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <div className="card sticky top-28 p-6">
                <h3 className="mb-5 flex items-center gap-2 font-bold text-ink-900">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </h3>
                <FiltersPanel />
              </div>
            </aside>

            <div>
              <div className="mb-6 flex items-center justify-between gap-3">
                <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary !px-4 !py-2 text-xs lg:hidden">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
                <div className="ml-auto flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card">
                  <ArrowDownUp className="h-4 w-4 text-ink-900/40" />
                  <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent text-sm font-medium text-ink-900 outline-none">
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {showFilters && (
                <div className="card mb-6 p-6 lg:hidden">
                  <FiltersPanel />
                </div>
              )}

              {error ? (
                <ApiErrorState error={error} onRetry={refetch} />
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {loading
                      ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                      : filtered.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
                  </div>
                  {!loading && filtered.length === 0 && (
                    <EmptyState title="No packages match your filters" message="Try increasing your budget or clearing filters." />
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
