import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import DestinationCard from "../components/destinations/DestinationCard";
import SkeletonCard from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import ApiErrorState from "../components/common/ApiErrorState";
import Pagination from "../components/common/Pagination";
import useApi from "../hooks/useApi";

const categories = ["All", "Beach", "Mountain", "Culture", "Adventure", "Island"];
const PAGE_SIZE = 6;

export default function Destinations() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category !== "All") params.set("category", category);
    return params.toString();
  }, [query, category]);

  const { data, loading, error, refetch } = useApi(`/destinations?${queryString}`, {
    deps: [queryString],
  });

  const destinations = data || [];
  const totalPages = Math.max(1, Math.ceil(destinations.length / PAGE_SIZE));
  const paged = destinations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <PageTransition>
      <div className="bg-sky-50/40 pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Destinations" }]} />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl"
          >
            Explore Destinations
          </motion.h1>
          <p className="mt-2 max-w-xl text-ink-900/55">
            {loading ? "Loading..." : `${destinations.length} handpicked destinations waiting for your next trip.`}
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-card sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-sky-50 px-4 py-3">
              <Search className="h-4.5 w-4.5 text-teal-600" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by destination or country..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-ink-900/40"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <SlidersHorizontal className="h-4 w-4 flex-shrink-0 text-ink-900/40" />
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    category === c ? "bg-teal-600 text-white shadow-soft" : "bg-sky-50 text-ink-900/60 hover:bg-teal-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {error ? (
            <div className="mt-10">
              <ApiErrorState error={error} onRetry={refetch} />
            </div>
          ) : (
            <>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
                  : paged.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
              </div>

              {!loading && destinations.length === 0 && (
                <EmptyState title="No destinations found" message="Try a different search term or category filter." />
              )}

              {!loading && destinations.length > 0 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
