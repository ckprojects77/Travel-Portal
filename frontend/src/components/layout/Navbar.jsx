import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/hotels", label: "Hotels" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/85 shadow-card backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-sky-500 shadow-soft">
            <Compass className="h-5 w-5 text-white" />
          </span>
          <span className={`text-xl font-extrabold tracking-tight ${solid ? "text-ink-900" : "text-white"}`}>
            Wanderly
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-teal-600"
                    : solid
                    ? "text-ink-900/70 hover:text-teal-600"
                    : "text-white/90 hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-1.5 text-sm font-semibold ${solid ? "text-ink-900/70 hover:text-teal-600" : "text-white/90 hover:text-white"}`}
                >
                  <LayoutDashboard className="h-4 w-4" /> Admin
                </Link>
              )}
              <Link
                to="/profile"
                className={`flex items-center gap-1.5 text-sm font-semibold ${solid ? "text-ink-900/70 hover:text-teal-600" : "text-white/90 hover:text-white"}`}
              >
                <User className="h-4 w-4" /> {user?.name?.split(" ")[0] || "Profile"}
              </Link>
              <button onClick={handleLogout} className="btn-primary !px-5 !py-2.5 text-sm">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm font-semibold ${solid ? "text-ink-900/70 hover:text-teal-600" : "text-white/90 hover:text-white"}`}
              >
                Log in
              </Link>
              <Link to="/register" className="btn-primary !px-5 !py-2.5 text-sm">
                <User className="h-4 w-4" /> Sign up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden ${solid ? "text-ink-900" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pb-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-teal-50 text-teal-700" : "text-ink-900/70"}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-3 px-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="btn-secondary flex-1 !py-2.5 text-sm">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="btn-primary flex-1 !py-2.5 text-sm">
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-secondary flex-1 !py-2.5 text-sm">
                      Log in
                    </Link>
                    <Link to="/register" className="btn-primary flex-1 !py-2.5 text-sm">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
