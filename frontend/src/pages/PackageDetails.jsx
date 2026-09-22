import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, CheckCircle2, XCircle, MapPin, Minus, Plus } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import Carousel from "../components/common/Carousel";
import Rating from "../components/common/Rating";
import Loader from "../components/common/Loader";
import ApiErrorState from "../components/common/ApiErrorState";
import useApi from "../hooks/useApi";
import { fadeUp, staggerContainer } from "../hooks/useScrollReveal";

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pkg, loading, error, refetch } = useApi(`/packages/${id}`);
  const [travelers, setTravelers] = useState(2);
  const [tab, setTab] = useState("itinerary");

  if (loading) return <Loader />;
  if (error || !pkg) {
    return (
      <div className="pt-28">
        <div className="mx-auto max-w-3xl px-5">
          <ApiErrorState error={error || { message: "Package not found." }} onRetry={refetch} />
        </div>
      </div>
    );
  }

  const subtotal = pkg.price * travelers;
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + taxes;

  return (
    <PageTransition>
      <div className="pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Tour Packages", to: "/packages" }, { label: pkg.title }]} />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Carousel images={pkg.gallery} ratio="aspect-[16/9]" />

              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">{pkg.destination}</p>
                <h1 className="mt-1 text-3xl font-extrabold text-ink-900">{pkg.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Rating value={pkg.rating} reviews={pkg.reviews} />
                  <span className="flex items-center gap-1 text-sm text-ink-900/50"><Clock className="h-4 w-4" /> {pkg.duration} Days</span>
                  <span className="flex items-center gap-1 text-sm text-ink-900/50"><Users className="h-4 w-4" /> {pkg.groupSize} People</span>
                  <span className="flex items-center gap-1 text-sm text-ink-900/50"><MapPin className="h-4 w-4" /> {pkg.destination}</span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(pkg.highlights || []).map((h) => (
                    <span key={h} className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">{h}</span>
                  ))}
                </div>

                <div className="mt-8 flex gap-2 border-b border-ink-900/10">
                  {["itinerary", "included", "excluded"].map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`px-5 py-3 text-sm font-semibold capitalize transition ${tab === t ? "border-b-2 border-teal-600 text-teal-700" : "text-ink-900/50 hover:text-ink-900"}`}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  {tab === "itinerary" && (
                    <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="show" className="space-y-4">
                      {(pkg.itinerary || []).map((day) => (
                        <motion.div key={day.day} variants={fadeUp} className="flex gap-4 rounded-2xl bg-sky-50 p-5">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white">
                            {day.day}
                          </div>
                          <div>
                            <h4 className="font-bold text-ink-900">{day.title}</h4>
                            <p className="mt-1 text-sm text-ink-900/60">{day.details}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {tab === "included" && (
                    <motion.div variants={staggerContainer(0.06)} initial="hidden" animate="show" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(pkg.included || []).map((i) => (
                        <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                          <span className="text-sm text-ink-900/75">{i}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {tab === "excluded" && (
                    <motion.div variants={staggerContainer(0.06)} initial="hidden" animate="show" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(pkg.excluded || []).map((i) => (
                        <motion.div key={i} variants={fadeUp} className="flex items-center gap-3">
                          <XCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                          <span className="text-sm text-ink-900/75">{i}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="card sticky top-28 p-6">
                <div className="flex items-baseline gap-2">
                  {pkg.originalPrice && <span className="text-sm text-ink-900/40 line-through">${pkg.originalPrice}</span>}
                  <span className="text-3xl font-extrabold text-ink-900">${pkg.price}</span>
                  <span className="text-sm text-ink-900/50">/ person</span>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-sm font-semibold text-ink-900">Travelers</p>
                  <div className="flex items-center justify-between rounded-2xl bg-sky-50 p-2">
                    <button onClick={() => setTravelers((t) => Math.max(1, t - 1))} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-ink-900">{travelers}</span>
                    <button onClick={() => setTravelers((t) => Math.min(15, t + 1))} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-ink-900/5 pt-5 text-sm">
                  <div className="flex justify-between text-ink-900/60">
                    <span>Subtotal ({travelers} x ${pkg.price})</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-ink-900/60">
                    <span>Taxes & fees</span>
                    <span>${taxes}</span>
                  </div>
                  <div className="flex justify-between border-t border-ink-900/5 pt-2 text-base font-extrabold text-ink-900">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/booking?type=package&id=${pkg.id}&travelers=${travelers}`)}
                  className="btn-primary mt-6 w-full"
                >
                  Book Now
                </button>
                <p className="mt-3 text-center text-xs text-ink-900/40">Free cancellation up to 14 days before departure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
