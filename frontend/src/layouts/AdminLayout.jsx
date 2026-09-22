import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Package,
  Hotel,
  CalendarCheck,
  Star,
  Menu,
  X,
  Compass,
  LogOut,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin },
  { to: "/admin/packages", label: "Tour Packages", icon: Package },
  { to: "/admin/hotels", label: "Hotels", icon: Hotel },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <Link to="/" className="flex items-center gap-2 px-6 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500">
          <Compass className="h-5 w-5 text-white" />
        </span>
        <span className="text-lg font-extrabold text-white">Wanderly<span className="text-teal-400"> Admin</span></span>
      </Link>
      <nav className="flex-1 space-y-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? "bg-teal-500/15 text-teal-400" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pb-6">
        <Link to="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white">
          <LogOut className="h-4.5 w-4.5" />
          Back to site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-sky-50/40">
      <aside className="hidden w-64 flex-shrink-0 bg-ink-900 lg:block">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-ink-900 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-ink-900/5 bg-white px-5 py-4 lg:hidden">
          <span className="font-bold text-ink-900">Admin Panel</span>
          <button onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6 text-ink-900" />
          </button>
        </div>
        <div className="p-5 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
