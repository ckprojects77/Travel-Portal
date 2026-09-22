import { useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Package, Hotel, CalendarCheck, TrendingUp, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Counter from "../../components/common/Counter";
import Loader from "../../components/common/Loader";
import ApiErrorState from "../../components/common/ApiErrorState";
import useApi from "../../hooks/useApi";

const COLORS = ["#0ea5e9", "#16a08a", "#f97316", "#10b981", "#a855f7"];

export default function Dashboard() {
  const { data: users, loading: l1, error: e1 } = useApi("/users");
  const { data: bookings, loading: l2, error: e2 } = useApi("/bookings");
  const { data: packages, loading: l3, error: e3 } = useApi("/packages");
  const { data: hotels, loading: l4, error: e4 } = useApi("/hotels");
  const { data: destinations, loading: l5 } = useApi("/destinations");

  const loading = l1 || l2 || l3 || l4 || l5;
  const error = e1 || e2 || e3 || e4;

  const stats = [
    { label: "Total Users", value: (users || []).length, icon: Users, color: "from-sky-500 to-sky-600" },
    { label: "Total Bookings", value: (bookings || []).length, icon: CalendarCheck, color: "from-teal-500 to-teal-600" },
    { label: "Tour Packages", value: (packages || []).length, icon: Package, color: "from-emerald-500 to-emerald-600" },
    { label: "Partner Hotels", value: (hotels || []).length, icon: Hotel, color: "from-sunset-500 to-sunset-600" },
  ];

  const totalRevenue = useMemo(() => (bookings || []).reduce((sum, b) => sum + (b.total || 0), 0), [bookings]);

  const revenueByMonth = useMemo(() => {
    const map = {};
    (bookings || []).forEach((b) => {
      const month = new Date(b.createdAt).toLocaleString("default", { month: "short" });
      map[month] = (map[month] || 0) + (b.total || 0);
    });
    return Object.entries(map).map(([month, revenue]) => ({ month, revenue }));
  }, [bookings]);

  const bookingsByDestination = useMemo(() => {
    const map = {};
    (bookings || []).forEach((b) => {
      const key = b.title || b.refId;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, bookings: count }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 6);
  }, [bookings]);

  const categoryBreakdown = useMemo(() => {
    const map = {};
    (destinations || []).forEach((d) => {
      map[d.category] = (map[d.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [destinations]);

  if (loading) return <Loader />;
  if (error) return <ApiErrorState error={error} />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Dashboard Overview</h1>
          <p className="text-sm text-ink-900/50">Live data from the connected database.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <TrendingUp className="h-4 w-4" /> ${totalRevenue.toLocaleString()} total revenue
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card p-5">
            <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr ${s.color}`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-extrabold text-ink-900"><Counter value={s.value} /></p>
            <p className="text-xs text-ink-900/50">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="card p-5 lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-ink-900">
            <DollarSign className="h-4.5 w-4.5 text-teal-600" /> Revenue Trend
          </h3>
          {revenueByMonth.length === 0 ? (
            <p className="py-16 text-center text-sm text-ink-900/40">No bookings yet — revenue trend will appear once bookings come in.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5f6f2" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#0f8272" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-bold text-ink-900">Destinations by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {categoryBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h3 className="mb-4 font-bold text-ink-900">Top Booked Trips</h3>
        {bookingsByDestination.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-900/40">No bookings yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={bookingsByDestination}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5f6f2" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="bookings" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
