import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DestinationCard from "../destinations/DestinationCard";
import SkeletonCard from "../common/SkeletonCard";
import ApiErrorState from "../common/ApiErrorState";
import useApi from "../../hooks/useApi";

export default function PopularDestinations() {
  const { data, loading, error, refetch } = useApi("/destinations?sort=rating");
  const destinations = (data || []).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-eyebrow">
            Where to next
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl"
          >
            Popular Destinations
          </motion.h2>
        </div>
        <Link to="/destinations" className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:gap-2 transition-all">
          View all destinations <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {error && <div className="mt-10"><ApiErrorState error={error} onRetry={refetch} /></div>}

      {!error && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : destinations.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)}
        </div>
      )}
    </section>
  );
}
