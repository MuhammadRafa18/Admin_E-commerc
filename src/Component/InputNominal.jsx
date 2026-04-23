import React from "react";

export const InputNominal = ({ label, value, onChange, required, Rp }) => {
  const formatRupiah = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const parseNumber = (value) => {
    return value.replace(/\D/g, "");
  };
  return (
    <div className="space-y-1 w-1/2">
      <label className="block text-sm font-medium">{label}</label>
      {Rp ? (
        <div className="flex items-center ">
          <span className="text-sm border text-body border-default-medium border-r-0 rounded-l-xl px-2 py-2">
            {Rp}
          </span>
          <input
            type="text"
            required={required}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-r-xl focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            value={formatRupiah(value) || ""}
            onChange={(e) => onChange(parseNumber(e.target.value))}
          />
        </div>
      ) : (
        <div className="flex items-center ">
          <input
            type="text"
            required={required}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            value={formatRupiah(value) || ""}
            onChange={(e) => onChange(parseNumber(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};
