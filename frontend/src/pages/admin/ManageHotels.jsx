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
  { name: "id", label: "Slug / ID", required: true, placeholder: "e.g. ubud-jungle-retreat" },
  { name: "name", label: "Hotel Name", required: true, placeholder: "e.g. Ubud Jungle Retreat" },
  { name: "location", label: "Location", required: true, placeholder: "e.g. Bali, Indonesia" },
  { name: "category", label: "Category", required: true, placeholder: "Luxury / Boutique / Traditional" },
  { name: "price", label: "Price per night (USD)", required: true, type: "number", placeholder: "145" },
  { name: "image", label: "Image URL", required: true, placeholder: "https://..." },
  { name: "rating", label: "Rating (optional)", type: "number", placeholder: "4.7" },
  { name: "reviews", label: "Review count (optional)", type: "number", placeholder: "634" },
  { name: "amenities", label: "Amenities (comma-separated, optional)", type: "array", placeholder: "Free WiFi, Pool, Breakfast Included" },
];

export default function ManageHotels() {
  const { data: rows, loading, error, refetch } = useApi("/hotels");
  const [target, setTarget] = useState(null);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const columns = [
    { key: "image", label: "", render: (r) => <img src={r.image} className="h-10 w-14 rounded-lg object-cover" /> },
    { key: "name", label: "Hotel" },
    { key: "location", label: "Location" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price/night", render: (r) => `$${r.price}` },
    { key: "rating", label: "Rating" },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/hotels/${target.id}`, { auth: true });
      showToast("Hotel removed.", "success");
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't remove hotel.", "error");
    }
  };

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (editing?.id) {
        const { id, ...rest } = payload;
        await api.put(`/hotels/${editing.id}`, rest, { auth: true });
        showToast("Hotel updated.", "success");
      } else {
        await api.post("/hotels", payload, { auth: true });
        showToast("Hotel created.", "success");
      }
      setEditing(null);
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't save hotel.", "error");
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
          <h1 className="text-2xl font-extrabold text-ink-900">Manage Hotels</h1>
          <p className="text-sm text-ink-900/50">{(rows || []).length} properties listed</p>
        </div>
        <button onClick={() => setEditing({})} className="btn-primary !px-4 !py-2.5 text-sm">
          <Plus className="h-4 w-4" /> Add Hotel
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
        title={editing?.id ? "Edit Hotel" : "Add Hotel"}
        submitting={submitting}
      />
    </div>
  );
}
