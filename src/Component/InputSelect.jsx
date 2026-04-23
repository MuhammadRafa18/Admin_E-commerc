import React from "react";

export const InputSelect = ({label, value, onChange, options = [], placeholder, required}) => {
  return (
    <div className="space-y-1">
      <label className="ml-1 block text-sm font-medium">{label}</label>
      <select
        required={required}
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs"
        value={value || ""}
        onChange={(e) =>
          onChange(
            e.target.value,
            options.find((o) => o.value == e.target.value),
          )
        }
      >
        <option value="">{placeholder ?? "Pilih..."}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
