import Modal from "../common/Modal";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({ open, onClose, onConfirm, itemName }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm Deletion">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <p className="text-sm text-ink-900/70">
          Are you sure you want to delete <span className="font-semibold text-ink-900">{itemName}</span>? This action cannot be undone.
        </p>
      </div>
      <div className="mt-6 flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1 !py-2.5 text-sm">Cancel</button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="flex-1 rounded-full bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
