import { useState } from "react";
import { UserPlus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";
import ConfirmModal from "../../components/admin/ConfirmModal";
import Loader from "../../components/common/Loader";
import ApiErrorState from "../../components/common/ApiErrorState";
import { useToast } from "../../components/common/Toast";
import useApi from "../../hooks/useApi";
import api from "../../utils/api";

export default function ManageUsers() {
  const { data: users, loading, error, refetch } = useApi("/users");
  const [target, setTarget] = useState(null);
  const { showToast } = useToast();

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Joined", render: (r) => new Date(r.createdAt).toLocaleDateString() },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${r.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-ink-900/5 text-ink-900/50"}`}>
          {r.status}
        </span>
      ),
    },
  ];

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${target.id}`, { auth: true });
      showToast("User removed.", "success");
      refetch();
    } catch (err) {
      showToast(err.message || "Couldn't remove user.", "error");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ApiErrorState error={error} onRetry={refetch} />;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900">Manage Users</h1>
          <p className="text-sm text-ink-900/50">{(users || []).length} registered users</p>
        </div>
        <button onClick={() => showToast("User invite sent (demo).", "success")} className="btn-primary !px-4 !py-2.5 text-sm">
          <UserPlus className="h-4 w-4" /> Invite User
        </button>
      </div>

      <div className="mt-6">
        <DataTable columns={columns} rows={users || []} searchKey="name" onDelete={(row) => setTarget(row)} />
      </div>

      <ConfirmModal open={!!target} onClose={() => setTarget(null)} itemName={target?.name} onConfirm={handleDelete} />
    </div>
  );
}
