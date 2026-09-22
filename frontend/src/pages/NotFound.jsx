import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Home } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col items-center justify-center bg-mesh bg-sky-50/50 px-5 text-center">
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-teal-500 to-sky-500 shadow-glow"
        >
          <Compass className="h-10 w-10 text-white" />
        </motion.div>
        <h1 className="text-6xl font-extrabold text-ink-900">404</h1>
        <p className="mt-3 max-w-sm text-ink-900/60">
          Looks like this destination doesn't exist on the map. Let's get you back on route.
        </p>
        <Link to="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </PageTransition>
  );
}
