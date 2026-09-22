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
  { name: "id", label: "Slug / ID", required: true, placeholder: "e.g. bali-indonesia" },
  { name: "name", label: "Name", required: true, placeholder: "e.g. Bali" },
  { name: "country", label: "Country", required: true, placeholder: "e.g. Indonesia" },
  { name: "category", label: "Category", required: true, placeholder: "Beach / Mountain / Culture / Adventure / Island" },
  { name: "price", label: "Price (USD)", required: true, type: "number", placeholder: "899" },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "rating", label: "Rating (optional)", type: "number", placeholder: "4.8" },
  { name: "reviews", label: "Review count (optional)", type: "number", placeholder: "2140" },
  { name: "description", label: "Description (optional)", placeholder: "Short description" },
  { name: "attractions", label: "Attractions (comma-separated, optional)", type: "array", placeholder: "Temple, Beach, Market" },
  { name: "tags", label: "Tags (comma-separated, optional)", type: "array", placeholder: "Trending, Honeymoon" },
];

export default function ManageDestinations() {
  const { data: rows, loading, error, refetch } = useApi("/destinations");
  const [target, setTarget] = useState(null);
  const [editing, setEditing] = useState(null); // row object, or {} for create, or null for closed
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const columns = [
    { key: "image", label: "", render: (r) => <img src={r.image} className="h-10 w-14 rounded-lg object-cover" /> },
    { key: "name", label: "Destination" },
    { key: "country", label: "Country" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (r) => `$${r.price}` },
    { key: "rating", label: "Rating" },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/destinations/${target.id}`, { auth: true });
      showToast("Destination removed.", "success");
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't remove destination.", "error");
    }
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editing?.id) {
        // editing an existing one: don't let them change the slug via this field
        const { id, ...rest } = payload;
        await api.put(`/destinations/${editing.id}`, rest, { auth: true });
        showToast("Destination updated.", "success");
      } else {
        await api.post("/destinations", payload, { auth: true });
        showToast("Destination created.", "success");
      }
      setEditing(null);
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't save destination.", "error");
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
          <h1 className="text-2xl font-extrabold text-ink-900">Manage Destinations</h1>
          <p className="text-sm text-ink-900/50">{(rows || []).length} destinations listed</p>
        </div>
        <button onClick={() => setEditing({})} className="btn-primary !px-4 !py-2.5 text-sm">
          <Plus className="h-4 w-4" /> Add Destination
        </button>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} rows={rows || []} onDelete={(row) => setTarget(row)} onEdit={(row) => setEditing(row)} />
      </div>
      <ConfirmModal open={!!target} onClose={() => setTarget(null)} itemName={target?.name} onConfirm={handleDelete} />
      <EntityFormModal
        open={!!editing}
        onClose={() => setEditing(null)}
        onSubmit={handleSubmit}
        fields={editing?.id ? FIELDS.map((f) => (f.name === "id" ? { ...f, disabled: true } : f)) : FIELDS}
        initial={editing?.id ? editing : null}
        title={editing?.id ? "Edit Destination" : "Add Destination"}
        submitting={submitting}
      />
    </div>
  );
}
