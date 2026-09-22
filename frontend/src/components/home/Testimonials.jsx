import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Rating from "../common/Rating";
import SkeletonCard from "../common/SkeletonCard";
import { staggerContainer, fadeUp } from "../../hooks/useScrollReveal";
import useApi from "../../hooks/useApi";

export default function Testimonials() {
  const { data, loading } = useApi("/reviews");
  const testimonials = (data || []).slice(0, 4);

  return (
    <section className="bg-mesh bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-eyebrow">
            Traveler stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold text-ink-900 sm:text-4xl"
          >
            Loved by wanderers everywhere
          </motion.h2>
        </div>

        {loading ? (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {testimonials.map((t) => (
              <motion.div key={t._id || t.id} variants={fadeUp} whileHover={{ y: -6 }} className="card flex flex-col p-6">
                <Quote className="h-7 w-7 text-teal-200" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-900/70">"{t.text}"</p>
                <Rating value={t.rating} showValue={false} size={13} />
                <div className="mt-4 flex items-center gap-3 border-t border-ink-900/5 pt-4">
                  <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-900/45">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
