import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineMenu,
  AiTwotoneFolder,
  AiOutlineDownload,
  AiOutlineExport,
  AiOutlineUsergroupAdd,
  AiOutlineThunderbolt,
  AiOutlineSearch,
  AiOutlineQuestionCircle,
  AiOutlineDelete,
  AiOutlineDingding,
  AiOutlineGithub,
  AiOutlineX,
  AiOutlineDiscord,
  AiOutlineLeftSquare,
} from "react-icons/ai";
import { OpenFile } from "./openFile";
import { SaveTo } from "./saveTo";
import { LiveCollab } from "./liveCollab";
import { ExportImage } from "./exportImage";
import { ResetCanvas } from "./resetCanvas";
import { Help } from "./help";
import { FindOnCanvas } from "./findOnCanvas";
import { CommandPallet } from "./commandPallet";

interface sideMenuItem {
  key:string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface sideMenuLink {
  key:string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SideMenuProps {
  onResetCanvas: () => void; // Prop to handle canvas reset
}

const sideMenuLinks: sideMenuLink[] = [
  {
    key:"1",
    label: "ExcaliDraw+",
    href: "https://plus.excalidraw.com/plus",
    icon: <AiOutlineDingding />,
  },
  {
    key:"2",
    label: "GitHub",
    href: "https://github.com/excalidraw/excalidraw",
    icon: <AiOutlineGithub />,
  },
  {key:"3", label: "Twitter", href: "https://x.com/excalidraw", icon: <AiOutlineX /> },
  {
    key:"4",
    label: "Discord",
    href: "https://discord.com/invite/UexuTaE",
    icon: <AiOutlineDiscord />,
  },
  {
    key:"5",
    label: "Signup",
    href: "https://app.excalidraw.com/sign-up",
    icon: <AiOutlineLeftSquare />,
  },
];

export const SideMenu: React.FC<SideMenuProps> = ({ onResetCanvas }) => {
  // menu states
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveToOpen, setIsSaveToOpen] = useState(false);
  const [isExportImageOpen, setIsExportImageOpen] = useState(false);
  const [isLiveCollabOpen, setIsLiveCollabOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isFindOnCanvasOpen, setFindOnCanvasOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetTheCanvasOpen, setResetTheCanvasOpen] = useState(false);

  // Refs for each modal to detect outside clicks
  const openFileRef = useRef<HTMLDivElement>(null);
  const saveToRef = useRef<HTMLDivElement>(null);
  const exportImageRef = useRef<HTMLDivElement>(null);
  const liveCollabRef = useRef<HTMLDivElement>(null);
  const commandPaletteRef = useRef<HTMLDivElement>(null);
  const findOnCanvasRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const resetCanvasRef = useRef<HTMLDivElement>(null);

  // Sample sidemenu option
  const sideMenuItems: sideMenuItem[] = [
    {
      key:"1",
      label: "Open",
      icon: <AiTwotoneFolder />,
      onClick: () => setIsModalOpen(true),
    },
    {
      key:"2",
      label: "Save to..",
      icon: <AiOutlineDownload />,
      onClick: () => setIsSaveToOpen(true),
    },
    {
      key:"3",
      label: "Export Image",
      icon: <AiOutlineExport />,
      onClick: () => setIsExportImageOpen(true),
    },
    {
      key:"4",
      label: "Live Collabration",
      icon: <AiOutlineUsergroupAdd />,
      onClick: () => setIsLiveCollabOpen(true),
    },
    {
      key:"5",
      label: "Command Palette",
      icon: <AiOutlineThunderbolt />,
      onClick: () => setIsCommandPaletteOpen(true),
    },
    {
      key:"6",
      label: "Find on canvas",
      icon: <AiOutlineSearch />,
      onClick: () => setFindOnCanvasOpen(true),
    },
    {
      key:"7",
      label: "Help",
      icon: <AiOutlineQuestionCircle />,
      onClick: () => setIsHelpOpen(true),
    },
    {
      key:"8",
      label: "Reset the canvas",
      icon: <AiOutlineDelete />,
      onClick: () => setResetTheCanvasOpen(true),
    },
  ];

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <section>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-5 p-2 left-5 bg-gradient-to-r from-gray-800 to-gray-700 shadow-lg z-20 rounded-xl"
      >
        <div
          onClick={handleMenu}
          className="cursor-pointer text-white text-2xl p-2 hover:bg-gray-700 rounded-sm z-20"
        >
          <AiOutlineMenu />
        </div>
      </motion.section>

      {isMenuOpen && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bg-gradient-to-r from-gray-800 to-gray-700 top-21 p-2 flex flex-col left-5 rounded-xl shadow-lg z-20"
          ref={menuRef}
        >
          <div className="">
            {sideMenuItems.map((items) => (
              <div
                key={items.key}
                onClick={() => {
                  items.onClick();
                  setIsMenuOpen(false);
                }}
                className="text-white text-left cursor-pointer p-2 hover:bg-gray-700 flex space-x-2 rounded-lg"
              >
                <div className="text-white text-2xl">{items.icon}</div>
                <div>{items.label}</div>
              </div>
            ))}
          </div>

          <hr className="border-gray-600 mb-2 mt-2" />

          <div className="">
            {sideMenuLinks.map((items) => (
              <div className="" key={items.key}>
                <a
                  href={items.href}
                  target="/blank"
                  className="text-white text-left cursor-pointer p-2 hover:bg-gray-700 flex space-x-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="text-white text-2xl">{items.icon}</div>
                  <div>{items.label}</div>
                </a>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* all side menu componanrts */}
      {isModalOpen && (
        <div ref={openFileRef}>
          <OpenFile onClose={() => setIsModalOpen(false)} />
        </div>
      )}

      {isSaveToOpen && (
        <div ref={saveToRef}>
          <SaveTo onClose={() => setIsSaveToOpen(false)} />
        </div>
      )}
      {isExportImageOpen && (
        <div ref={exportImageRef}>
          <ExportImage onClose={() => setIsExportImageOpen(false)} />
        </div>
      )}
      {isLiveCollabOpen && (
        <div ref={liveCollabRef}>
          <LiveCollab onClose={() => setIsLiveCollabOpen(false)} />
        </div>
      )}
      {isCommandPaletteOpen && (
        <div ref={commandPaletteRef}>
          <CommandPallet onClose={() => setIsCommandPaletteOpen(false)} />
        </div>
      )}
      {isFindOnCanvasOpen && (
        <div ref={findOnCanvasRef}>
          <FindOnCanvas onClose={() => setFindOnCanvasOpen(false)} />
        </div>
      )}
      {isHelpOpen && (
        <div ref={helpRef}>
          <Help onClose={() => setIsHelpOpen(false)} />
        </div>
      )}
      {isResetTheCanvasOpen && (
        <div ref={resetCanvasRef}>
          <ResetCanvas
            onReset={onResetCanvas}
            onClose={() => setResetTheCanvasOpen(false)}
          />
        </div>
      )}
    </section>
  );
};
