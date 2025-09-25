import React from "react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

interface ResetCanvasProps {
  onClose: () => void;
  onReset: () => void;
}

export const ResetCanvas: React.FC<ResetCanvasProps> = ({ onClose,onReset }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-30"
    >
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-xl p-10 w-1/3 text-white"
      >
        <h2 className="text-xl font-semibold text-left mb-5">Clear canvas</h2>
        <hr className="border-gray-600 mb-5  w-full " />
        <p className="text-left">
          This will clear the whole canvas. Are you sure?
        </p>
        <div className="flex flex-row space-x-4 items-end justify-end">
          <button
            onClick={onClose}
            className="text-xm mt-4 bg-gray-600 py-3 px-4  rounded hover:bg-gray-500 transition"
          >
            Close
          </button>
          <button
            onClick={()=> {onClose(); onReset();}}
            className="text-xm mt-4 text-black bg-gray-300 py-3 px-4  rounded hover:bg-gray-400 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
};
