

export const MultiSelect = ({ label, options = [], value = [], onChange }) => {

  const handleSelect = (opt) => {
    const isSelected = value.find((v) => v.id === opt.id);
    if (isSelected) {
      onChange(value.filter((v) => v.id !== opt.id));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-1">
      <label className="ml-1 block text-sm font-medium">{label}</label>

     
      <div className="w-full border border-gray-200 rounded-xl overflow-hidden">

        {value.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-2.5 border-b border-gray-100 bg-gray-50">
            {value.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs bg-blue-50 border border-blue-200 text-blue-700"
              >
                {item.name}
                <button
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="hover:text-blue-900"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="max-h-28 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = value.find((v) => v.id === opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-100 border-b border-gray-50 last:border-0
                  ${isSelected
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {opt.type}
               
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};