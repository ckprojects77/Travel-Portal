import { motion } from "framer-motion";
import { ShieldCheck, Wallet, Headset, Sparkles } from "lucide-react";
import Counter from "../common/Counter";
import { staggerContainer, fadeUp } from "../../hooks/useScrollReveal";

const features = [
  { icon: ShieldCheck, title: "Verified Stays & Guides", desc: "Every hotel and local partner is vetted for safety and quality before it's listed." },
  { icon: Wallet, title: "Best Price Guarantee", desc: "Find it cheaper elsewhere within 24 hours and we'll match it, no questions asked." },
  { icon: Headset, title: "24/7 Travel Support", desc: "Real humans on call around the clock for the whole length of your trip." },
  { icon: Sparkles, title: "Curated, Not Generic", desc: "Every itinerary is shaped by travelers and locals, not auto-generated templates." },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-eyebrow">
          Why travelers trust us
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold text-ink-900 sm:text-4xl"
        >
          Everything you need for a worry-free trip
        </motion.h2>
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="card p-7 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 shadow-soft">
              <f.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-ink-900">{f.title}</h3>
            <p className="mt-2 text-sm text-ink-900/55">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 grid grid-cols-2 gap-6 rounded-4xl bg-gradient-to-r from-ink-900 to-teal-900 p-10 text-center text-white sm:grid-cols-4">
        <div>
          <p className="text-3xl font-extrabold sm:text-4xl"><Counter value={120} suffix="K+" /></p>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Travelers Served</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold sm:text-4xl"><Counter value={450} suffix="+" /></p>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Destinations</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold sm:text-4xl"><Counter value={98} suffix="%" /></p>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Satisfaction Rate</p>
        </div>
        <div>
          <p className="text-3xl font-extrabold sm:text-4xl"><Counter value={15} suffix="+" /></p>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Years Experience</p>
        </div>
      </div>
    </section>
  );
}
