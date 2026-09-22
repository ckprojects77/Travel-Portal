import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Compass } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import { useToast } from "../components/common/Toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      showToast("Please complete all fields.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password);
      showToast("Account created successfully!", "success");
      navigate("/profile");
    } catch (err) {
      showToast(err.message || "Registration failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-mesh bg-sky-50/60 px-5 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card w-full max-w-md p-8"
        >
          <div className="mb-6 text-center">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500">
              <Compass className="h-6 w-6 text-white" />
            </span>
            <h1 className="text-2xl font-extrabold text-ink-900">Create your account</h1>
            <p className="mt-1 text-sm text-ink-900/50">Start planning your next trip in minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-900/30" />
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field pl-11"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-900/30" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field pl-11"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-900/30" />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-11"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-ink-900/50">
              <input type="checkbox" required className="mt-0.5 accent-teal-600" />
              I agree to the Terms of Service and Privacy Policy
            </label>

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-900/60">
            Already have an account? <Link to="/login" className="font-semibold text-teal-600">Log in</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
