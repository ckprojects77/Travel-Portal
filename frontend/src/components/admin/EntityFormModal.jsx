import { useEffect, useState } from "react";
import Modal from "../common/Modal";

// Generic Add/Edit form used by ManageDestinations, ManagePackages, ManageHotels.
// `fields` describes each input; `initial` pre-fills for edit mode (null = create mode).
export default function EntityFormModal({ open, onClose, onSubmit, fields, initial, title, submitting }) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (open) {
      const defaults = {};
      fields.forEach((f) => {
        defaults[f.name] = initial?.[f.name] ?? (f.type === "array" ? "" : "");
      });
      // arrays are edited as comma-separated text, pre-fill by joining
      fields.forEach((f) => {
        if (f.type === "array" && Array.isArray(initial?.[f.name])) {
          defaults[f.name] = initial[f.name].join(", ");
        }
      });
      setValues(defaults);
    }
  }, [open, initial, fields]);

  const handleChange = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    fields.forEach((f) => {
      const raw = values[f.name];
      if (f.type === "number") payload[f.name] = raw === "" ? undefined : Number(raw);
      else if (f.type === "array") payload[f.name] = raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [];
      else payload[f.name] = raw;
    });
    onSubmit(payload);
  };

  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">
        {fields.map((f) => (
          <div key={f.name}>
            <label className="mb-1.5 block text-xs font-semibold text-ink-900/60">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={f.type === "number" ? "number" : "text"}
              required={f.required}
              disabled={f.disabled}
              value={values[f.name] ?? ""}
              onChange={(e) => handleChange(f.name, e.target.value)}
              placeholder={f.placeholder}
              className="input-field disabled:cursor-not-allowed disabled:opacity-50"
            />
            {f.hint && <p className="mt-1 text-[11px] text-ink-900/40">{f.hint}</p>}
          </div>
        ))}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary flex-1 !py-2.5 text-sm">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1 !py-2.5 text-sm disabled:opacity-60">
            {submitting ? "Saving..." : initial ? "Save Changes" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
