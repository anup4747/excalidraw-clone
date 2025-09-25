import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  AiOutlineGithub,
  AiOutlineX,
  AiOutlineDiscord,
  AiOutlineMail,
} from "react-icons/ai";
import {
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaBook,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const [findMe, setFindMe] = useState<boolean>(false);
  const findMeRef = useRef<HTMLDivElement>(null);

  const handleFindMe = () => {
    setFindMe(!findMe);
  };

  // handle mouse event
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        findMeRef.current &&
        !findMeRef.current.contains(event.target as Node)
      ) {
        setFindMe(false);
      }
    };

    if (findMe) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [findMe]);
  return (
    <footer>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 w-full  text-white flex items-center justify-between p-4 z-20"
      >
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <FaMinus className="text-white" />
          </button>
          <span className="text-sm">50%</span>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <FaPlus className="text-white" />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <FaUndo className="text-white" />
          </button>
          <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition">
            <FaRedo className="text-white" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 transition">
            <FaShareAlt className="text-white" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition">
            <FaBook className="text-white" />
            <span>Library</span>
          </button>
          <div className="relative group" ref={findMeRef}>
            <button
              onClick={handleFindMe}
              className="flex items-center space-x-2 px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 transition"
            >
              <AiOutlineMail className="text-white" />
              <span>Find Me</span>
            </button>
            {findMe && (
              <div className="absolute bottom-12 right-0 flex flex-col space-y-2 bg-gray-800 p-2 rounded shadow-lg">
                <a
                  href="https://x.com/anup23257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
                >
                  <AiOutlineX />
                  <span>Twitter</span>
                </a>
                <a
                  href="mailto:anupdcodes@gmail.com"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
                >
                  <AiOutlineMail />
                  <span>Email</span>
                </a>
                <a
                  href="https://discord.com/users/858686500757045270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
                >
                  <AiOutlineDiscord />
                  <span>Discord</span>
                </a>
                <a
                  href="https://github.com/anup4747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition"
                >
                  <AiOutlineGithub />
                  <span>GitHub</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </footer>
  );
};
