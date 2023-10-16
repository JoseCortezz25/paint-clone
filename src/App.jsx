import { useEffect, useRef, useState } from "react";
import rectangleIcon from "./assets/rectangle.svg";
import circleIcon from "./assets/circle.svg";
import triangleIcon from "./assets/triangle.svg";
import brushIcon from "./assets/brush.svg";
import eraserIcon from "./assets/eraser.svg";
import clearIcon from "./assets/clear.svg";
import downloadPhotoIcon from "./assets/download-photo.svg";
import { Option } from "./components/Buttons/Option";
import { CBEraser } from "./components/Buttons/Eraser";
import { Color } from "./components/Color/Color";
import { ButtonsProvider } from "./components/Buttons/ButtonsContext";
import "./App.css";

const TOOLS = {
  BRUSH: "brush",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  TRIANGLE: "triangle",
  ERASER: "eraser",
};

const colors = [
  { id: 1, value: "#ffffff" },
  { id: 2, value: "#000000" },
  { id: 3, value: "#e74c3c" },
  { id: 4, value: "#2ecc71" },
  { id: 5, value: "#3498db" },
  { id: 6, value: "#f9ca24" },
];

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [setting, setSetting] = useState({
    thickness: 3,
    color: "#000",
  });
  const [prevMouse, setPrevMouse] = useState({
    mouseX: 0,
    mouseY: 0,
    snapshot: 0,
  });

  const [selectedTool, setSelectedTool] = useState({
    tool: TOOLS.BRUSH,
    isFill: false,
  });

  const clearCanvas = () => {
    contextRef.current.clearRect(0,  0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png"); 
    const link = document.createElement("a"); 
    link.download = `${Date.now()}`; 
    link.href = image; 
    link.click(); 
  };

  const startDraw = (e) => {
    setIsDrawing(true);
    setPrevMouse({
      mouseX: e.clientX,
      mouseY: e.clientY,
      snapshot: contextRef.current.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      ),
    });
    contextRef.current.beginPath();
    contextRef.current.lineWidth = setting.thickness;
    contextRef.current.fillStyle = setting.color;
    contextRef.current.strokeStyle = setting.color;
  };

  const drawRect = (ctx, e) => {
    if (!selectedTool.isFill) {
      return ctx.strokeRect(
        e.clientX,
        e.clientY,
        prevMouse.mouseX - e.clientX,
        prevMouse.mouseY - e.clientY
      );
    }
    return ctx.fillRect(
      e.clientX,
      e.clientY,
      prevMouse.mouseX - e.clientX,
      prevMouse.mouseY - e.clientY
    );
  };

  const drawCircle = (ctx, e) => {
    ctx.beginPath();
    let radius = Math.sqrt(
      Math.pow(prevMouse.mouseX - e.clientX, 2) +
        Math.pow(prevMouse.mouseY - e.clientY, 2)
    );
    ctx.arc(prevMouse.mouseX, prevMouse.mouseY, radius, 0, 2 * Math.PI);

    !selectedTool.isFill ? ctx.stroke() : ctx.fill();
  };

  const drawBrush = (ctx, e) => {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  };

  const drawTriangle = (ctx, e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouse.mouseX, prevMouse.mouseY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.lineTo(prevMouse.mouseX * 2 - e.clientX, e.clientY);
    ctx.closePath();
    !selectedTool.isFill ? ctx.stroke() : ctx.fill();
  };

  const drawing = (e) => {
    if (!isDrawing) return;
    const context = contextRef.current;
    context.putImageData(prevMouse.snapshot, 0, 0);

    if (
      selectedTool.tool === TOOLS.BRUSH ||
      selectedTool.tool === TOOLS.ERASER
    ) {
      context.strokeStyle =
        selectedTool.tool === TOOLS.ERASER ? "#ecf0f1" : setting.color;
      drawBrush(context, e);
    } else if (selectedTool.tool === TOOLS.RECTANGLE) {
      drawRect(context, e);
    } else if (selectedTool.tool === TOOLS.CIRCLE) {
      drawCircle(context, e);
    } else if (selectedTool.tool === TOOLS.TRIANGLE) {
      drawTriangle(context, e);
    }
  };

  const handleSelectTool = (value) => {
    console.log('handleSelectTool', value);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = context.canvas.clientWidth;
    canvas.height = context.canvas.clientHeight;
    contextRef.current = context;
  }, []);

  return (
    <main className="container">
      <section className="board__tools">
        <ButtonsProvider>
          <div className="row">
            <label htmlFor="">Shapes</label>
            <ul>
              <Option
                setSelectedTool={setSelectedTool}
                icon={rectangleIcon}
                tool={TOOLS.RECTANGLE}
              >
                Reactangle
              </Option>

              <Option
                setSelectedTool={setSelectedTool}
                icon={circleIcon}
                tool={TOOLS.CIRCLE}
              >
                Circle
              </Option>

              <Option
                setSelectedTool={setSelectedTool}
                icon={triangleIcon}
                tool={TOOLS.TRIANGLE}
              >
                Triangle
              </Option>

              <CBEraser setSelectedTool={setSelectedTool} tool={selectedTool.tool}>
                Fill color
              </CBEraser>
            </ul>
          </div>

          <div className="row">
            <label htmlFor="">Options</label>
            <ul>
              <Option
                setSelectedTool={setSelectedTool}
                icon={brushIcon}
                tool={TOOLS.BRUSH}
              >
                Brush
              </Option>
              <Option
                setSelectedTool={setSelectedTool}
                icon={eraserIcon}
                tool={TOOLS.ERASER}
              >
                Eraser
              </Option>
              <li className={`option`}>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={setting.thickness}
                  onChange={({ target }) =>
                    setSetting((prevSetting) => ({
                      ...prevSetting,
                      thickness: target.value,
                    }))
                  }
                />
              </li>
            </ul>
          </div>

          <div className="row">
            <label htmlFor="">Colors</label>
            <ul className="colors">
              {colors.map((color) => (
                <Color
                  value={color.value}
                  key={color.id}
                  setSetting={setSetting}
                />
              ))}
            </ul>
          </div>
          
          <div className="row">
            <button onClick={clearCanvas} className="tooltip-wrapper">
              <img src={clearIcon} alt="Eraser icon" />
              <span className="tooltip">Clean</span>
            </button>
            <button onClick={downloadImage} className="tooltip-wrapper">
              <img src={downloadPhotoIcon} alt="Download image icon" />
              <span className="tooltip">Download</span>
            </button>
          </div>
        </ButtonsProvider>
      </section>

      <section className="board__drawing">
        <canvas
          onMouseDown={startDraw}
          onMouseUp={() => setIsDrawing(false)}
          onMouseMove={drawing}
          ref={canvasRef}
        ></canvas>
      </section>
    </main>
  );
}

export default App;
