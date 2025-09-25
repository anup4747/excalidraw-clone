import React from "react";
import { useState, useEffect, useRef } from "react";
import { SlPencil } from "react-icons/sl";
import { IoMdRemove } from "react-icons/io";
import { HiOutlineHand } from "react-icons/hi";
import {
  BiLockOpen,
  BiLock,
  BiText,
  BiCircle,
  BiSolidRightArrowAlt,
  BiNavigation,
  BiPhotoAlbum,
  BiEraser,
  BiSolidGrid,
  BiSquareRounded,
} from "react-icons/bi";
import { BsDiamond } from "react-icons/bs";
import { FaPaintBrush } from "react-icons/fa";
import { MdOutlineStarBorder } from "react-icons/md";
import { GiPaintBucket } from "react-icons/gi";
import { motion } from "framer-motion";
import { useTool } from "../context/toolContext";
import Tool from "../data/data"

interface ToolConfig {
  name: Tool;
  icon: React.ReactNode;
  key?: string;
  isSubmenu?: boolean;
}

const tools: ToolConfig[] = [
  { name: Tool.Hand, icon: <HiOutlineHand />, key: "h" },
  { name: Tool.Selection, icon: <BiNavigation />, key: "1" },
  { name: Tool.Rectangle, icon: <BiSquareRounded />, key: "2" },
  { name: Tool.Diamond, icon: <BsDiamond />, key: "3" },
  { name: Tool.Ellipse, icon: <BiCircle />, key: "4" },
  { name: Tool.Arrow, icon: <BiSolidRightArrowAlt />, key: "5" },
  { name: Tool.Line, icon: <IoMdRemove />, key: "6" },
  { name: Tool.Draw, icon: <SlPencil />, key: "7" },
  { name: Tool.Text, icon: <BiText />, key: "8" },
  { name: Tool.Image, icon: <BiPhotoAlbum />, key: "9" },
  { name: Tool.Eraser, icon: <BiEraser />, key: "0" },
];

const extraTools: ToolConfig[] = [
  { name: Tool.PaintBrush, icon: <FaPaintBrush />, isSubmenu: true },
  { name: Tool.Star, icon: <MdOutlineStarBorder />, isSubmenu: true },
  { name: Tool.PaintBucket, icon: <GiPaintBucket />, isSubmenu: true },
];

export const ToolsMenu: React.FC = () => {
  const [locked, setLocked] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const extraToolsRef = useRef<HTMLDivElement>(null);
  const { activeTool: activeToolContext, setActiveTool: setActiveToolContext } = useTool();

  const handleLockToggle = () => {
    setLocked(!locked);
  };

  const handleToolsMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const selectTool = (tool: Tool) => {
    console.log(`Selecting tool: ${tool}`);
    setActiveToolContext(tool); 
    if (tool !== Tool.None) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        extraToolsRef.current &&
        !extraToolsRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (locked) return;
      const tool = tools.find((t) => t.key === event.key);
      if (tool) {
        selectTool(tool.name);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [locked]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveToolContext(Tool.None);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ToolButton: React.FC<{
    tool: Tool;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
  }> = ({ tool, icon, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`cursor-pointer text-white text-2xl p-2 hover:bg-gray-700  rounded-sm ${
        isActive
          ? "bg-blue-900 hover:bg-blue-900 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"
          : ""
      }`}
    >
      {icon}
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute top-5 p-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 to-gray-600 rounded-xl shadow-lg z-20"
    >
      <div className="flex flex-row relative justify-center items-center space-x-2">
        <ToolButton
          tool={Tool.None}
          icon={locked ? <BiLock /> : <BiLockOpen />}
          isActive={locked}
          onClick={handleLockToggle}
        />

        {tools
          .filter((tool) => !tool.isSubmenu)
          .map((tool) => (
            <ToolButton
              key={tool.name}
              tool={tool.name}
              icon={tool.icon}
              isActive={activeToolContext === tool.name}
              onClick={() => selectTool(tool.name)}
            />
          ))}

        <ToolButton
          key={Tool.None}
          tool={Tool.None}
          icon={<BiSolidGrid />}
          isActive={isMenuOpen}
          onClick={handleToolsMenu}
        />
      </div>

      {isMenuOpen && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          ref={extraToolsRef}
          className="absolute top-full right-1 mt-2 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-2 flex flex-col gap-2 shadow-lg z-20"
        >
          {extraTools
            .filter((extraTool) => extraTool.isSubmenu)
            .map((extraTool) => (
              <ToolButton
                key={extraTool.name}
                tool={extraTool.name}
                icon={extraTool.icon}
                isActive={activeToolContext === extraTool.name}
                onClick={() => selectTool(extraTool.name)}
              />
            ))}
        </motion.section>
      )}
    </motion.section>
  );
};
