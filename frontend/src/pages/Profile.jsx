import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Edit3, Heart, CalendarCheck, Save } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import SkeletonCard from "../components/common/SkeletonCard";
import ApiErrorState from "../components/common/ApiErrorState";
import { useToast } from "../components/common/Toast";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [tab, setTab] = useState("bookings");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
  const [saving, setSaving] = useState(false);

  const { data: bookings, loading: bookingsLoading, error: bookingsError, refetch: refetchBookings } = useApi(
    "/bookings/mine",
    { skip: tab !== "bookings" }
  );
  const { data: savedDestinations, loading: savedLoading } = useApi(
    "/destinations",
    { skip: tab !== "saved" }
  );

  const mySaved = (savedDestinations || []).filter((d) => user?.savedDestinations?.includes(d.id));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      setEditing(false);
      showToast("Profile updated successfully.", "success");
    } catch (err) {
      showToast(err.message || "Couldn't update profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-sky-50/40 pb-20 pt-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Profile" }]} />

          <div className="mt-6 grid gap-8 lg:grid-cols-[300px_1fr]">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card h-fit p-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-sky-500 text-2xl font-bold text-white">
                  {(user?.name || "A").charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-4 font-bold text-ink-900">{user?.name || "Traveler"}</h2>
                <p className="text-xs text-ink-900/50">{user?.email}</p>
                {user?.role === "admin" && (
                  <span className="mt-2 rounded-full bg-sunset-50 px-3 py-1 text-xs font-semibold text-sunset-600">Admin</span>
                )}
                <button onClick={() => setEditing(!editing)} className="btn-secondary mt-4 w-full !py-2 text-xs">
                  <Edit3 className="h-3.5 w-3.5" /> Edit Profile
                </button>
              </div>

              <div className="mt-6 space-y-1 border-t border-ink-900/5 pt-6">
                {[
                  { id: "bookings", label: "Booking History", icon: CalendarCheck },
                  { id: "saved", label: "Saved Destinations", icon: Heart },
                  { id: "details", label: "Personal Details", icon: User },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${tab === t.id ? "bg-teal-50 text-teal-700" : "text-ink-900/60 hover:bg-sky-50"}`}
                  >
                    <t.icon className="h-4.5 w-4.5" /> {t.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {editing && (
                <form onSubmit={handleSave} className="card mb-6 space-y-4 p-6">
                  <h3 className="font-bold text-ink-900">Edit Personal Details</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Full name" />
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="Phone" />
                  </div>
                  <button type="submit" disabled={saving} className="btn-primary !py-2.5 text-sm disabled:opacity-60">
                    <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              )}

              {tab === "bookings" && (
                <div className="space-y-4">
                  {bookingsError && <ApiErrorState error={bookingsError} onRetry={refetchBookings} />}
                  {!bookingsError && bookingsLoading && (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}
                  {!bookingsError && !bookingsLoading && (bookings || []).length === 0 && (
                    <EmptyState title="No bookings yet" message="Once you book a trip, it will show up here." icon={CalendarCheck} />
                  )}
                  {!bookingsError && !bookingsLoading &&
                    (bookings || []).map((b) => (
                      <div key={b._id} className="card flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
                        <div>
                          <p className="font-bold text-ink-900">{b.title}</p>
                          <p className="text-xs text-ink-900/50">
                            Booking #{b._id.slice(-6).toUpperCase()} &middot; {new Date(b.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{b.status}</span>
                          <span className="font-bold text-ink-900">${b.total}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {tab === "saved" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {savedLoading && (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}
                  {!savedLoading && mySaved.length === 0 && (
                    <EmptyState title="No saved destinations" message="Tap the heart icon on any destination to save it here." icon={Heart} />
                  )}
                  {!savedLoading &&
                    mySaved.map((d) => (
                      <div key={d.id} className="card flex items-center gap-4 p-4">
                        <img src={d.image} alt={d.name} className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover" />
                        <div>
                          <p className="font-bold text-ink-900">{d.name}</p>
                          <p className="flex items-center gap-1 text-xs text-ink-900/50"><MapPin className="h-3 w-3" /> {d.country}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {tab === "details" && (
                <div className="card space-y-4 p-6">
                  <div className="flex items-center gap-3">
                    <User className="h-4.5 w-4.5 text-teal-600" />
                    <span className="text-sm text-ink-900/70">{user?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4.5 w-4.5 text-teal-600" />
                    <span className="text-sm text-ink-900/70">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4.5 w-4.5 text-teal-600" />
                    <span className="text-sm text-ink-900/70">{user?.phone || "Not set"}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
