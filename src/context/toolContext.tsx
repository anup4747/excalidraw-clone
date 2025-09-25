import { createContext, useContext, useState, ReactNode } from "react";
import Tool from "../data/data";

interface ToolContextType {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export const ToolProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.None);

  return (
    <ToolContext.Provider value={{ activeTool, setActiveTool }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useTool must be used within a ToolProvider");
  }
  return context;
};
