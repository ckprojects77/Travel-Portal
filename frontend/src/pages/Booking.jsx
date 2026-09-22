import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, User, Mail, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import Loader from "../components/common/Loader";
import ApiErrorState from "../components/common/ApiErrorState";
import { useToast } from "../components/common/Toast";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import api from "../utils/api";

export default function Booking() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user } = useAuth();

  const type = params.get("type") || "package";
  const id = params.get("id");
  const travelersParam = Number(params.get("travelers")) || 2;

  const endpoint = type === "package" ? "packages" : type === "destination" ? "destinations" : "hotels";
  const { data: item, loading, error } = useApi(`/${endpoint}/${id}`, { skip: !id });

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    checkIn: "",
    checkOut: "",
    requests: "",
  });
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <Loader />;
  if (error || !item) {
    return (
      <div className="pt-28">
        <div className="mx-auto max-w-3xl px-5">
          <ApiErrorState error={error || { message: "Item not found." }} />
        </div>
      </div>
    );
  }

  const title = item.title || item.name;
  const image = item.image;
  const basePrice = item.price || 500;
  const nights = type === "hotel" ? 3 : 1;
  const subtotal = type === "hotel" ? basePrice * nights : basePrice * travelersParam;
  const taxes = Math.round(subtotal * 0.08);
  const total = subtotal + taxes;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      showToast("Please fill in all traveler details.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await api.post(
        "/bookings",
        {
          type,
          refId: id,
          title,
          travelers: travelersParam,
          checkIn: form.checkIn || undefined,
          checkOut: form.checkOut || undefined,
          traveler: { name: form.name, email: form.email, phone: form.phone, requests: form.requests },
          subtotal,
          taxes,
          total,
        },
        { auth: true }
      );
      setStep(2);
      showToast("Booking confirmed! Check your email for details.", "success");
    } catch (err) {
      showToast(err.message || "Couldn't complete the booking. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 2) {
    return (
      <PageTransition>
        <div className="flex min-h-[80vh] items-center justify-center px-5 pt-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card max-w-md p-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"
            >
              <CheckCircle2 className="h-9 w-9 text-emerald-500" />
            </motion.div>
            <h2 className="text-2xl font-extrabold text-ink-900">Booking Confirmed!</h2>
            <p className="mt-2 text-sm text-ink-900/60">
              Your trip to <span className="font-semibold text-ink-900">{title}</span> is booked and saved to your account. A confirmation has been sent to {form.email}.
            </p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => navigate("/profile")} className="btn-secondary flex-1 !py-2.5 text-sm">View Bookings</button>
              <button onClick={() => navigate("/")} className="btn-primary flex-1 !py-2.5 text-sm">Back Home</button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="bg-sky-50/40 pb-20 pt-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Booking" }]} />
          <h1 className="mt-4 text-3xl font-extrabold text-ink-900">Complete Your Booking</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <form onSubmit={handleSubmit} className="card space-y-6 p-6">
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-ink-900">
                  <User className="h-4.5 w-4.5 text-teal-600" /> Traveler Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input-field" />
                  <input required name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="input-field" />
                  <input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
                  <input name="requests" value={form.requests} onChange={handleChange} placeholder="Special Requests (optional)" className="input-field" />
                </div>
              </div>

              {type === "hotel" && (
                <div>
                  <h3 className="mb-4 font-bold text-ink-900">Stay Dates</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="input-field" />
                    <input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="input-field" />
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-ink-900">
                  <CreditCard className="h-4.5 w-4.5 text-teal-600" /> Payment Details
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <input placeholder="Card Number (dummy)" className="input-field" defaultValue="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM / YY" className="input-field" defaultValue="12/28" />
                    <input placeholder="CVC" className="input-field" defaultValue="123" />
                  </div>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-900/40">
                  <ShieldCheck className="h-3.5 w-3.5" /> This is a demo checkout — no real payment is processed.
                </p>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                {submitting ? "Processing..." : `Confirm & Pay $${total}`}
              </button>
            </form>

            <div className="card h-fit p-6">
              <h3 className="mb-4 font-bold text-ink-900">Booking Summary</h3>
              {image && <img src={image} alt={title} className="mb-4 h-40 w-full rounded-2xl object-cover" />}
              <p className="font-bold text-ink-900">{title}</p>
              <p className="text-xs uppercase tracking-wider text-teal-600">{type}</p>

              <div className="mt-5 space-y-2 border-t border-ink-900/5 pt-5 text-sm">
                {type === "hotel" ? (
                  <div className="flex justify-between text-ink-900/60">
                    <span>${basePrice} x {nights} nights</span>
                    <span>${subtotal}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-ink-900/60">
                    <span>${basePrice} x {travelersParam} travelers</span>
                    <span>${subtotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-ink-900/60">
                  <span>Taxes & fees</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between border-t border-ink-900/5 pt-2 text-base font-extrabold text-ink-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
