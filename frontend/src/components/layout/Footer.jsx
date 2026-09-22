import { Link } from "react-router-dom";
import { Compass, Globe, Camera, MessageCircle, PlayCircle, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500">
                <Compass className="h-5 w-5 text-white" />
              </span>
              <span className="text-xl font-extrabold text-white">Wanderly</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Thoughtfully curated trips and stays across the world's most memorable destinations.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, Camera, MessageCircle, PlayCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition hover:border-teal-400 hover:text-teal-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/destinations" className="hover:text-teal-400">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-teal-400">Tour Packages</Link></li>
              <li><Link to="/hotels" className="hover:text-teal-400">Hotels</Link></li>
              <li><Link to="/about" className="hover:text-teal-400">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contact" className="hover:text-teal-400">Contact Us</Link></li>
              <li><a href="#" className="hover:text-teal-400">FAQs</a></li>
              <li><a href="#" className="hover:text-teal-400">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-teal-400">Terms & Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-400" /> hello@wanderly.travel</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-teal-400" /> +1 (555) 234-7890</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-400" /> 48 Harbor Street, San Francisco</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Wanderly Travel Co. All rights reserved.</p>
          <p>Designed for wanderers, built for peace of mind.</p>
        </div>
      </div>
    </footer>
  );
}
