import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, Heart } from "lucide-react";
import { useState } from "react";
import Rating from "../common/Rating";

export default function DestinationCard({ destination, index = 0 }) {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="card group overflow-hidden"
    >
      <Link to={`/destinations/${destination.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />

          {destination.tags?.[0] && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-card">
              {destination.tags[0]}
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setSaved((s) => !s);
            }}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-card transition hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-sunset-500 text-sunset-500" : "text-ink-900/60"}`} />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <h3 className="text-lg font-bold">{destination.name}</h3>
              <p className="flex items-center gap-1 text-xs text-white/80">
                <MapPin className="h-3 w-3" /> {destination.country}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <Rating value={destination.rating} reviews={destination.reviews} />
            <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{destination.category}</span>
          </div>
          <div className="flex items-center justify-between border-t border-ink-900/5 pt-3">
            <div>
              <span className="text-lg font-extrabold text-ink-900">${destination.price}</span>
              <span className="text-xs text-ink-900/50"> / person</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-teal-600 transition group-hover:gap-2">
              Explore <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
