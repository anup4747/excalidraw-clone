import React from "react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

interface FindOnCanvasProps {
  onClose: () => void;
}

export const FindOnCanvas: React.FC<FindOnCanvasProps> = ({ onClose }) => {
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
      <div ref={modalRef} className="bg-gray-800 rounded-lg p-6 w-96 text-white">
        <h2 className="text-lg font-semibold">FindOncavas</h2>
        <p>Save your content here...</p>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-600 py-2 px-4 rounded hover:bg-gray-500"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};
