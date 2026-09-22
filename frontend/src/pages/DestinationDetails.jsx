import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Thermometer, Droplets, Wind, CheckCircle2, Star, Heart } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import Carousel from "../components/common/Carousel";
import Rating from "../components/common/Rating";
import PackageCard from "../components/packages/PackageCard";
import Loader from "../components/common/Loader";
import ApiErrorState from "../components/common/ApiErrorState";
import { fadeUp, staggerContainer } from "../hooks/useScrollReveal";
import useApi from "../hooks/useApi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/common/Toast";

export default function DestinationDetails() {
  const { id } = useParams();
  const [tab, setTab] = useState("overview");
  const { isAuthenticated, user, toggleSaved } = useAuth();
  const { showToast } = useToast();

  const { data: destination, loading, error, refetch } = useApi(`/destinations/${id}`);
  const { data: allPackages } = useApi("/packages", { skip: !destination });
  const { data: reviews } = useApi(`/reviews?targetType=destination&targetId=${id}`, { skip: !destination });

  const relatedPackages = (allPackages || []).filter((p) => p.destinationId === id);
  const isSaved = user?.savedDestinations?.includes(id);

  const handleSave = async () => {
    if (!isAuthenticated) {
      showToast("Log in to save destinations.", "info");
      return;
    }
    try {
      await toggleSaved(id);
      showToast(isSaved ? "Removed from saved." : "Saved to your profile.", "success");
    } catch {
      showToast("Couldn't update saved destinations.", "error");
    }
  };

  if (loading) return <Loader />;
  if (error || !destination) {
    return (
      <div className="pt-28">
        <div className="mx-auto max-w-3xl px-5">
          <ApiErrorState error={error || { message: "Destination not found." }} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Destinations", to: "/destinations" }, { label: destination.name }]} />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Carousel images={destination.gallery} />
            </div>

            <motion.div initial="hidden" animate="show" variants={staggerContainer(0.08)} className="card p-6">
              <motion.div variants={fadeUp} className="flex items-center justify-between">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">{destination.category}</span>
                <div className="flex items-center gap-3">
                  <Rating value={destination.rating} reviews={destination.reviews} />
                  <button onClick={handleSave} className="rounded-full bg-sky-50 p-2 transition hover:bg-sky-100">
                    <Heart className={`h-4 w-4 ${isSaved ? "fill-sunset-500 text-sunset-500" : "text-ink-900/40"}`} />
                  </button>
                </div>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mt-3 text-3xl font-extrabold text-ink-900">
                {destination.name}
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-1 flex items-center gap-1 text-sm text-ink-900/50">
                <MapPin className="h-4 w-4" /> {destination.country}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-sky-50 p-4">
                <div className="text-center">
                  <Thermometer className="mx-auto h-5 w-5 text-sky-600" />
                  <p className="mt-1 text-sm font-bold text-ink-900">{destination.weather?.temp}°C</p>
                  <p className="text-[10px] text-ink-900/50">{destination.weather?.condition}</p>
                </div>
                <div className="text-center">
                  <Droplets className="mx-auto h-5 w-5 text-sky-600" />
                  <p className="mt-1 text-sm font-bold text-ink-900">{destination.weather?.humidity}%</p>
                  <p className="text-[10px] text-ink-900/50">Humidity</p>
                </div>
                <div className="text-center">
                  <Wind className="mx-auto h-5 w-5 text-sky-600" />
                  <p className="mt-1 text-sm font-bold text-ink-900">{destination.weather?.wind} km/h</p>
                  <p className="text-[10px] text-ink-900/50">Wind</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 flex items-center justify-between border-t border-ink-900/5 pt-5">
                <div>
                  <span className="text-2xl font-extrabold text-ink-900">${destination.price}</span>
                  <span className="text-sm text-ink-900/50"> / person</span>
                </div>
                <Link to={`/booking?type=destination&id=${destination.id}`} className="btn-primary">
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-10 flex gap-2 border-b border-ink-900/10">
            {["overview", "attractions", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition ${
                  tab === t ? "border-b-2 border-teal-600 text-teal-700" : "text-ink-900/50 hover:text-ink-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "overview" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl leading-relaxed text-ink-900/70">
                {destination.description}
              </motion.p>
            )}

            {tab === "attractions" && (
              <motion.div
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {(destination.attractions || []).map((a) => (
                  <motion.div key={a} variants={fadeUp} className="flex items-center gap-3 rounded-2xl bg-sky-50 p-4">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-teal-600" />
                    <span className="text-sm font-medium text-ink-900">{a}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {tab === "reviews" && (
              <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="show" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {(reviews || []).length === 0 && (
                  <p className="text-sm text-ink-900/50">No reviews for this destination yet.</p>
                )}
                {(reviews || []).map((r) => (
                  <motion.div key={r._id} variants={fadeUp} className="card p-5">
                    <div className="flex items-center gap-3">
                      <img src={r.avatar || "https://i.pravatar.cc/100"} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-bold text-ink-900">{r.name}</p>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={12} className={i < r.rating ? "fill-sunset-500 text-sunset-500" : "text-ink-900/10"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-ink-900/60">{r.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {relatedPackages.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-extrabold text-ink-900">Available Packages</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPackages.map((p, i) => (
                  <PackageCard key={p.id} pkg={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
