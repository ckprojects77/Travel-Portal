import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-ink-900/60">
      <Link to="/" className="flex items-center gap-1 hover:text-teal-600">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-ink-900/30" />
          {item.to ? (
            <Link to={item.to} className="hover:text-teal-600">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-ink-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
