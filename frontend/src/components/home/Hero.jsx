import { motion } from "framer-motion";
import { Plane, Sparkles } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink-900 pt-24">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient" />
      </div>

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-[22%] hidden lg:block"
      >
        <div className="glass-dark flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-white shadow-glow">
          <Plane className="h-4 w-4 text-sky-300" /> Direct flights to 120+ cities
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[6%] top-[38%] hidden lg:block"
      >
        <div className="glass-dark flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-white shadow-glow">
          <Sparkles className="h-4 w-4 text-sunset-400" /> 4.9★ rated experiences
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow bg-white/10 text-white backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5" /> Curated journeys, zero guesswork
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
        >
          Find your next
          <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-sunset-300 bg-clip-text text-transparent"> unforgettable </span>
          escape
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 max-w-xl text-base text-white/75 sm:text-lg"
        >
          Handpicked destinations, all-inclusive packages, and boutique stays — planned around how you actually like to travel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9"
        >
          <SearchBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 text-white/80"
        >
          <div>
            <p className="text-2xl font-extrabold text-white">120K+</p>
            <p className="text-xs uppercase tracking-wider">Happy Travelers</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">450+</p>
            <p className="text-xs uppercase tracking-wider">Destinations</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-white">4.9/5</p>
            <p className="text-xs uppercase tracking-wider">Avg. Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
