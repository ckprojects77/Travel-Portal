import { useState } from "react";
import DataTable from "../../components/admin/DataTable";
import ConfirmModal from "../../components/admin/ConfirmModal";
import Loader from "../../components/common/Loader";
import ApiErrorState from "../../components/common/ApiErrorState";
import { useToast } from "../../components/common/Toast";
import useApi from "../../hooks/useApi";
import api from "../../utils/api";

export default function ManageReviews() {
  const { data: rows, loading, error, refetch } = useApi("/reviews");
  const [target, setTarget] = useState(null);
  const { showToast } = useToast();

  const columns = [
    { key: "avatar", label: "", render: (r) => <img src={r.avatar || "https://i.pravatar.cc/100"} className="h-9 w-9 rounded-full object-cover" /> },
    { key: "name", label: "Reviewer" },
    { key: "trip", label: "Trip" },
    { key: "rating", label: "Rating", render: (r) => `${r.rating} ★` },
    { key: "text", label: "Review", render: (r) => <span className="line-clamp-1 max-w-xs">{r.text}</span> },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/reviews/${target._id}`, { auth: true });
      showToast("Review removed.", "success");
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't remove review.", "error");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ApiErrorState error={error} onRetry={refetch} />;

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-ink-900">Manage Reviews</h1>
      <p className="text-sm text-ink-900/50">{(rows || []).length} reviews across all destinations</p>
      <div className="mt-6">
        <DataTable columns={columns} rows={rows || []} onDelete={(row) => setTarget(row)} />
      </div>
      <ConfirmModal open={!!target} onClose={() => setTarget(null)} itemName={target?.name} onConfirm={handleDelete} />
    </div>
  );
}
