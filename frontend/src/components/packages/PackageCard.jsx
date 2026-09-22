import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, ArrowUpRight } from "lucide-react";
import Rating from "../common/Rating";

export default function PackageCard({ pkg, index = 0 }) {
  const discount = pkg.originalPrice ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden"
    >
      <Link to={`/packages/${pkg.id}`}>
        <div className="relative h-52 overflow-hidden">
          <img src={pkg.image} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-sunset-500 px-3 py-1 text-xs font-bold text-white shadow-card">
              {discount}% OFF
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 shadow-card">
            {pkg.category}
          </span>
        </div>

        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{pkg.destination}</p>
          <h3 className="mt-1 text-lg font-bold text-ink-900">{pkg.title}</h3>

          <div className="mt-3 flex items-center gap-4 text-xs text-ink-900/50">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {pkg.duration} Days</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {pkg.groupSize} People</span>
          </div>

          <div className="mt-3">
            <Rating value={pkg.rating} reviews={pkg.reviews} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-ink-900/5 pt-4">
            <div className="flex items-baseline gap-2">
              {pkg.originalPrice && <span className="text-xs text-ink-900/40 line-through">${pkg.originalPrice}</span>}
              <span className="text-xl font-extrabold text-ink-900">${pkg.price}</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-teal-600 transition group-hover:gap-2">
              Details <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
