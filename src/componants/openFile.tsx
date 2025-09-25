import React from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";


interface OpenFileProps {
  onClose: () => void;
}

export const OpenFile: React.FC<OpenFileProps> = ({ onClose }) => {
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
      className="fixed inset-0 flex items-center justify-center z-30 bg-opacity-10 "
    >
      <div
        ref={modalRef}
        className="bg-gray-800 rounded-2xl p-10 w-1/2  text-white"
      >
        {/* Load from File Section */}
        <p className="text-xl font-semibold text-left mb-2">Load from file</p>
        <div className="bg-yellow-100 text-black p-8 rounded-xl mb-4 flex items-center gap-x-10">
          <span className="text-yellow-500 m-4">⚠️</span>
          <div>
            <p className="text-sm">
              Loading from a file will{" "}
              <span className=" font-bold ">
                replace your existing content.
              </span>{" "}
              You can back up your drawing first using one of the options below.
            </p>
          </div>
          <button className="w-96 bg-yellow-400 text-black py-2 text-xm rounded hover:bg-yellow-500 transition">
            Load from file
          </button>
        </div>

        {/* Options Section */}
        <div className="grid grid-cols-3 gap-8 mt-4">
          <div>
            <h2 className="font-extrabold mb-3 mt-3"> Export as image</h2>

            <p className="text-xs text-center w-full">
              Export the scene data as an image which you can import later.
            </p>
            <button className="w-56 px-3 text-xm mt-2 bg-gray-600 py-3 rounded hover:bg-gray-500 transition">
              Export as image
            </button>
          </div>
          <div>
            <h2 className="font-extrabold mb-3 mt-3">Save to disk</h2>

            <p className="text-xs text-center w-full">
              Export the scene data to a file which you can import later.
            </p>
            <button className="w-56 px-3 text-xm mt-2 bg-gray-600 py-3 rounded hover:bg-gray-500 transition">
              Save to disk
            </button>
          </div>
          <div>
            <h2 className="font-extrabold mb-3 mt-3">Excalidraw+</h2>
            <p className="text-xs text-center w-full">
              Save the scene to your Excalidraw+ <br /> workspace.
            </p>
            <button className="w-56 px-3 text-xm mt-2 bg-gray-600 py-3 rounded hover:bg-gray-500 transition">
              Export to Excalidraw+
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
