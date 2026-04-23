export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold">{title}</h2>
          <button className="cursor-pointer" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};