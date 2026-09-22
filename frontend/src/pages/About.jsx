import { motion } from "framer-motion";
import { Compass, Globe2, HeartHandshake, Leaf } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import Counter from "../components/common/Counter";
import { staggerContainer, fadeUp } from "../hooks/useScrollReveal";

const values = [
  { icon: Compass, title: "Curated Discovery", desc: "We hand-pick every itinerary with local partners who know the destination inside out." },
  { icon: HeartHandshake, title: "Traveler First", desc: "Transparent pricing, real reviews, and support that's actually there when you need it." },
  { icon: Leaf, title: "Responsible Travel", desc: "We prioritize partners committed to sustainable and community-first tourism." },
  { icon: Globe2, title: "Global Reach", desc: "Access to 450+ destinations across 6 continents, growing every season." },
];

export default function About() {
  return (
    <PageTransition>
      <div className="pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "About" }]} />

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="section-eyebrow">Our story</span>
              <h1 className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">
                Travel planning that feels like it was made by someone who's actually been there
              </h1>
              <p className="mt-4 leading-relaxed text-ink-900/60">
                Wanderly started in 2011 with a simple frustration: booking a trip meant piecing together a dozen
                different sites, none of which felt like they understood what made a destination special. We built
                Wanderly to fix that — combining locally-sourced itineraries, vetted stays, and a support team that
                treats your trip like it's their own.
              </p>
              <p className="mt-4 leading-relaxed text-ink-900/60">
                Today, we help over 120,000 travelers a year explore more than 450 destinations, from quiet
                mountain villages to iconic coastal capitals.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
              <img
                src="https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=1200&auto=format&fit=crop"
                alt="Team planning travel"
                className="rounded-4xl shadow-card"
              />
              <div className="glass absolute -bottom-6 -left-6 rounded-3xl p-5 shadow-card">
                <p className="text-2xl font-extrabold text-ink-900"><Counter value={15} suffix="+" /></p>
                <p className="text-xs text-ink-900/50">Years of Experience</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} whileHover={{ y: -6 }} className="card p-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 shadow-soft">
                  <v.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-900/55">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
