import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    isOpen && (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex justify-end">
                  <button
                    className="text-gray-300 hover:text-gray-600 transition-colors duration-300 focus:outline-none"
                    onClick={closeModal}
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
