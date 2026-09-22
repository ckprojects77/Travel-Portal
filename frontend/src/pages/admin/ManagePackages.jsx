import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import ConfirmModal from "../../components/admin/ConfirmModal";
import EntityFormModal from "../../components/admin/EntityFormModal";
import Loader from "../../components/common/Loader";
import ApiErrorState from "../../components/common/ApiErrorState";
import { useToast } from "../../components/common/Toast";
import useApi from "../../hooks/useApi";
import api from "../../utils/api";

const FIELDS = [
  { name: "id", label: "Slug / ID", required: true, placeholder: "e.g. bali-bliss-7d" },
  { name: "title", label: "Title", required: true, placeholder: "e.g. Bali Bliss Retreat" },
  { name: "destinationId", label: "Destination Slug", required: true, placeholder: "must match a destination's id, e.g. bali-indonesia", hint: "Used to link this package to a destination page." },
  { name: "destination", label: "Destination Display Name", required: true, placeholder: "e.g. Bali, Indonesia" },
  { name: "duration", label: "Duration (days)", required: true, type: "number", placeholder: "7" },
  { name: "price", label: "Price (USD)", required: true, type: "number", placeholder: "899" },
  { name: "originalPrice", label: "Original Price (optional, for discount badge)", type: "number", placeholder: "1099" },
  { name: "category", label: "Category", required: true, placeholder: "Beach / Culture / Mountain..." },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "groupSize", label: "Group Size (optional)", placeholder: "2-12" },
  { name: "rating", label: "Rating (optional)", type: "number", placeholder: "4.8" },
  { name: "reviews", label: "Review count (optional)", type: "number", placeholder: "412" },
  { name: "highlights", label: "Highlights (comma-separated, optional)", type: "array", placeholder: "Private villa, Sunrise trek" },
  { name: "included", label: "Included (comma-separated, optional)", type: "array", placeholder: "Breakfast, Airport transfers" },
  { name: "excluded", label: "Excluded (comma-separated, optional)", type: "array", placeholder: "Flights, Insurance" },
];

export default function ManagePackages() {
  const { data: rows, loading, error, refetch } = useApi("/packages");
  const [target, setTarget] = useState(null);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const columns = [
    { key: "image", label: "", render: (r) => <img src={r.image} className="h-10 w-14 rounded-lg object-cover" /> },
    { key: "title", label: "Package" },
    { key: "destination", label: "Destination" },
    { key: "duration", label: "Duration", render: (r) => `${r.duration} Days` },
    { key: "price", label: "Price", render: (r) => `$${r.price}` },
    { key: "rating", label: "Rating" },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/packages/${target.id}`, { auth: true });
      showToast("Package removed.", "success");
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't remove package.", "error");
    }
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editing?.id) {
        const { id, ...rest } = payload;
        await api.put(`/packages/${editing.id}`, rest, { auth: true });
        showToast("Package updated.", "success");
      } else {
        await api.post("/packages", payload, { auth: true });
        showToast("Package created.", "success");
      }
      setEditing(null);
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't save package.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ApiErrorState error={error} onRetry={refetch} />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Manage Tour Packages</h1>
          <p className="text-sm text-ink-900/50">{(rows || []).length} packages listed</p>
        </div>
        <button onClick={() => setEditing({})} className="btn-primary !px-4 !py-2.5 text-sm">
          <Plus className="h-4 w-4" /> Add Package
        </button>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} rows={rows || []} searchKey="title" onDelete={(row) => setTarget(row)} onEdit={(row) => setEditing(row)} />
      </div>
      <ConfirmModal open={!!target} onClose={() => setTarget(null)} itemName={target?.title} onConfirm={handleDelete} />
      <EntityFormModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
        fields={editing?.id ? FIELDS.map((f) => (f.name === "id" ? { ...f, disabled: true } : f)) : FIELDS}
        initial={editing?.id ? editing : null}
        title={editing?.id ? "Edit Package" : "Add Package"}
        submitting={submitting}
      />
    </div>
  );
}
