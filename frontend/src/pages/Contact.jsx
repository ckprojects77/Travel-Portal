import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Breadcrumb from "../components/common/Breadcrumb";
import FAQAccordion from "../components/common/FAQAccordion";
import { faqs } from "../data/faqs";
import { useToast } from "../components/common/Toast";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    showToast("Message sent! We'll get back to you within 24 hours.", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageTransition>
      <div className="bg-sky-50/40 pb-20 pt-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-3xl font-extrabold text-ink-900 sm:text-4xl">
            Get in Touch
          </motion.h1>
          <p className="mt-2 max-w-lg text-ink-900/55">Questions about a booking or planning something custom? We're happy to help.</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email us", value: "hello@wanderly.travel" },
                { icon: Phone, label: "Call us", value: "+1 (555) 234-7890" },
                { icon: MapPin, label: "Visit us", value: "48 Harbor Street, San Francisco, CA" },
              ].map((c) => (
                <div key={c.label} className="card flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-teal-50">
                    <c.icon className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-900/50">{c.label}</p>
                    <p className="font-semibold text-ink-900">{c.value}</p>
                  </div>
                </div>
              ))}

              <div className="card overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop"
                  alt="Office"
                  className="h-48 w-full object-cover"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="card space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-field" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email address" className="input-field" />
              </div>
              <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="input-field" />
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
                rows={6}
                className="input-field resize-none"
              />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Message <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-extrabold text-ink-900">Frequently Asked Questions</h2>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
