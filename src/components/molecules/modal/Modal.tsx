import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-50 w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
