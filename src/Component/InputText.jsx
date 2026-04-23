import React from "react";

export const InputText = ({ label, placeholder, value , onChange , required  }) => {
  return (
    <div className="space-y-1">
      <label className="ml-1 block text-sm font-medium">{label}</label>
      <input
        type="text"
        required={required}
        placeholder={placeholder || ""}
        className="bg-neutral-secondary-medium border border-default-medium text-heading
        text-sm rounded-xl focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
        value={ value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
