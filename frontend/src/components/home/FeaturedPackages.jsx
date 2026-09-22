import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PackageCard from "../packages/PackageCard";
import SkeletonCard from "../common/SkeletonCard";
import ApiErrorState from "../common/ApiErrorState";
import useApi from "../../hooks/useApi";

export default function FeaturedPackages() {
  const { data, loading, error, refetch } = useApi("/packages?sort=rating");
  const packages = (data || []).slice(0, 3);

  return (
    <section className="bg-sky-50/50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-eyebrow">
              Ready to book
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-3 text-3xl font-extrabold text-ink-900 sm:text-4xl"
            >
              Featured Tour Packages
            </motion.h2>
          </div>
          <Link to="/packages" className="flex items-center gap-1 text-sm font-semibold text-teal-600 hover:gap-2 transition-all">
            View all packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {error && <div className="mt-10"><ApiErrorState error={error} onRetry={refetch} /></div>}

        {!error && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : packages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}
