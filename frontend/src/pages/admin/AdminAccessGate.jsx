import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, Lock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast";

// The second gate: reached only after a real admin JWT already passed ProtectedRoute's
// role check. This proves the person at the keyboard right now knows the admin access
// code too -- a valid admin login alone isn't enough to reach the dashboard.
export default function AdminAccessGate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyAdminCode } = useAuth();
  const { showToast } = useToast();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      showToast("Enter the admin access code.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await verifyAdminCode(code);
      showToast("Admin access granted.", "success");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      showToast(err.message || "Incorrect admin access code.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sunset-500 to-red-500">
            <ShieldAlert className="h-6 w-6 text-white" />
          </span>
          <h1 className="text-xl font-extrabold text-ink-900">Admin Access Required</h1>
          <p className="mt-1 text-sm text-ink-900/50">
            Your account has admin rights, but the dashboard needs a second access code before it unlocks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-900/30" />
            <input
              type="password"
              placeholder="Admin access code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-field pl-11"
              autoFocus
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? "Verifying..." : "Unlock Dashboard"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-ink-900/40">
          This code is separate from your password and is set by whoever configured the backend's <code>ADMIN_SECRET</code>.
        </p>
      </motion.div>
    </div>
  );
}
