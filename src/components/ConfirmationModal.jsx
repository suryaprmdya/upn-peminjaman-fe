import { XIcon } from "lucide-react";

const ConfirmationModal = ({isOpen, onClose, onConfirm, title, message}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end space-x-3 p-6 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
