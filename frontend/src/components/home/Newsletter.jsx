import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail } from "lucide-react";
import { useToast } from "../common/Toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return showToast("Please enter a valid email address.", "error");
    showToast("You're subscribed! Watch your inbox for deals.", "success");
    setEmail("");
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-teal-600 via-sky-600 to-teal-700 px-6 py-14 text-center sm:px-16"
      >
        <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-sunset-400/20 blur-3xl" />

        <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
          <Mail className="h-6 w-6 text-white" />
        </div>
        <h2 className="relative text-2xl font-extrabold text-white sm:text-3xl">Get exclusive deals in your inbox</h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-white/80">
          Join 80,000+ travelers getting first access to flash sales and new destinations.
        </p>

        <form onSubmit={handleSubmit} className="relative mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@example.com"
            className="w-full flex-1 rounded-full border-none bg-white/95 px-5 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-900/40"
          />
          <button type="submit" className="btn-accent !py-3">
            Subscribe <Send className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}
