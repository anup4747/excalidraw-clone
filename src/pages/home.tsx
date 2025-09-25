import React, { useRef,useState } from "react";
import { ToolsMenu } from "../componants/toolsMenu";
import { SideMenu } from "../componants/sideMenu";
import { Footer } from "../componants/footer";
import { ToolProvider } from "../context/toolContext";
import Canvas from "../componants/canvas";

export const Home: React.FC = () => {

  const [elements, setElements] = useState([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Reset the canvas
  const onResetCanvas = () => {
    setElements([]);
    localStorage.removeItem("drawing");
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    // added beacause drawtool is rerenderning the previous drawing
    location.reload()
    // console.log(localStorage);
  };

  return (
    <section>
      <ToolProvider>
        <ToolsMenu />
        <SideMenu onResetCanvas={onResetCanvas}/>
        <Canvas elements={elements}
          setElements={setElements}
          canvasRef={canvasRef}/>
        <Footer />
      </ToolProvider>
    </section>
  );
};
