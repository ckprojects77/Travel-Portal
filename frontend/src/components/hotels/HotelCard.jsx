import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Rating from "../common/Rating";

export default function HotelCard({ hotel, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6 }}
      className="card group flex flex-col overflow-hidden sm:flex-row"
    >
      <div className="relative h-52 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-64">
        <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-700 shadow-card">
          {hotel.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-ink-900">{hotel.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-ink-900/50">
                <MapPin className="h-3.5 w-3.5" /> {hotel.location}
              </p>
            </div>
            <Rating value={hotel.rating} reviews={hotel.reviews} />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((a) => (
              <span key={a} className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-ink-900/5 pt-4">
          <div>
            <span className="text-xl font-extrabold text-ink-900">${hotel.price}</span>
            <span className="text-xs text-ink-900/50"> / night</span>
          </div>
          <Link to={`/booking?type=hotel&id=${hotel.id}`} className="btn-primary !px-5 !py-2.5 text-sm">
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
