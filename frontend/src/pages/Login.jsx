import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Compass, Eye, EyeOff } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import { useToast } from "../components/common/Toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      showToast("Please enter your email and password.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      showToast("Welcome back!", "success");
      navigate(location.state?.from || "/profile");
    } catch (err) {
      showToast(err.message || "Login failed. Please try again.", "error");
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
            <h1 className="text-2xl font-extrabold text-ink-900">Welcome back</h1>
            <p className="mt-1 text-sm text-ink-900/50">Log in to manage your bookings and trips</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                type={showPw ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field pl-11 pr-11"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-900/30">
                {showPw ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-900/60">
                <input type="checkbox" className="accent-teal-600" /> Remember me
              </label>
              <a href="#" className="font-semibold text-teal-600">Forgot password?</a>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
              {submitting ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-5 rounded-xl bg-sky-50 p-3 text-center text-xs text-ink-900/50">
            Demo accounts: <span className="font-semibold text-ink-900">admin@wanderly.travel</span> / admin123 (admin) &middot;{" "}
            <span className="font-semibold text-ink-900">demo@wanderly.travel</span> / demo1234 (customer)
          </p>

          <p className="mt-4 text-center text-sm text-ink-900/60">
            Don't have an account? <Link to="/register" className="font-semibold text-teal-600">Sign up</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
