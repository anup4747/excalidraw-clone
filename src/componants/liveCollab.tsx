import React from "react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
interface LiveCollabProps {
  onClose: () => void;
}

export const LiveCollab: React.FC<LiveCollabProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartSession = () => {
    setIsStarting(true);
    // Simulate session start
    setTimeout(() => {
      setIsStarting(false);
      alert("Session started! (This is just a demo)");
    }, 1500);
  };

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
      <div ref={modalRef} className="bg-gray-800 border border-gray-600 rounded-lg p-8 text-white text-center max-w-sm mx-auto shadow-xl">
        <h1 className="text-xl font-semibold text-blue-400 mb-4">
          Live collaboration
        </h1>

        <p className="text-gray-300 mb-2 text-sm">
          Invite people to collaborate on your drawing.
        </p>

        <p className="text-gray-400 text-xs mb-6 leading-relaxed">
          Don't worry, the session is end-to-end encrypted, and fully private.
          Not even our server can see what you draw.
        </p>

        <button
          onClick={handleStartSession}
          disabled={isStarting}
          className="
          bg-blue-500 hover:bg-blue-600 
          disabled:bg-blue-600 disabled:opacity-70
          text-white font-medium 
          px-6 py-3 rounded-lg 
          flex items-center justify-center gap-2 
          transition-all duration-200
          shadow-lg hover:shadow-xl
          transform hover:scale-105 active:scale-95
          min-w-[140px] mx-auto
        "
        >
          <BsFillPlayFill
            size={16}
            className={isStarting ? "animate-pulse" : ""}
          />
          {isStarting ? "Starting..." : "Start session"}
        </button>
      </div>
    </motion.div>
  );
};
