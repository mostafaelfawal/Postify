import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  children: ReactNode;
  closeModal: VoidFunction;
};

export default function Modal({ children, closeModal }: ModalProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* الخلفية الشفافة */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/60 transition-opacity duration-200"
        onClick={closeModal}
      />

      {/* المودال */}
      <div className="relative bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all duration-200">
        {/* زر الإغلاق */}
        <button
          onClick={closeModal}
          className="absolute left-3 top-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FaTimes className="text-gray-600 dark:text-gray-300 text-base" />
        </button>

        {/* المحتوى */}
        {children}
      </div>
    </div>
  );
}
