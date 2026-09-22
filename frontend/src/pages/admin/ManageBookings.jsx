import { useState } from "react";
import DataTable from "../../components/admin/DataTable";
import ConfirmModal from "../../components/admin/ConfirmModal";
import Loader from "../../components/common/Loader";
import ApiErrorState from "../../components/common/ApiErrorState";
import { useToast } from "../../components/common/Toast";
import useApi from "../../hooks/useApi";
import api from "../../utils/api";

export default function ManageBookings() {
  const { data: rows, loading, error, refetch } = useApi("/bookings");
  const [target, setTarget] = useState(null);
  const { showToast } = useToast();

  const columns = [
    { key: "id", label: "Booking ID", render: (r) => `#${r._id.slice(-6).toUpperCase()}` },
    { key: "title", label: "Package" },
    { key: "traveler", label: "Traveler", render: (r) => r.user?.name || r.traveler?.name || "—" },
    { key: "total", label: "Total", render: (r) => `$${r.total}` },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-sunset-50 text-sunset-600"}`}>
          {r.status}
        </span>
      ),
    },
    { key: "date", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/bookings/${target._id}`, { auth: true });
      showToast("Booking removed.", "success");
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't remove booking.", "error");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ApiErrorState error={error} onRetry={refetch} />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Manage Bookings</h1>
      <p className="text-sm text-ink-900/50">{(rows || []).length} bookings across all channels</p>
      <div className="mt-6">
        <DataTable columns={columns} rows={rows || []} searchKey="title" onDelete={(row) => setTarget(row)} />
      </div>
      <ConfirmModal open={!!target} onClose={() => setTarget(null)} itemName={target ? `#${target._id.slice(-6).toUpperCase()}` : ""} onConfirm={handleDelete} />
    </div>
  );
}
