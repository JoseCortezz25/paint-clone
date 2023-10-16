import PropTypes from "prop-types";
import { useContext } from "react";
import { ButtonsContext } from "./ButtonsContext";

const TOOLS = {
  BRUSH: "brush",
  RECTANGLE: "rectangle",
  CIRCLE: "circle",
  TRIANGLE: "triangle",
  ERASER: "eraser",
};

const Option = ({
  children,
  icon,
  setSelectedTool,
  tool = null,
}) => {
  const { setSelectedEraser } = useContext(ButtonsContext);

  return (
    <li
      className={`option`}
      onClick={() => {
        setSelectedTool((prevState) => {
          return {
            ...prevState.isFill,
            tool: tool,
          };
        })
      }}
    >
      <img src={icon} alt="Icon" />
      <span>{children}</span>
    </li>
  );
};

Option.propTypes = {
  icon: PropTypes.string,
  tool: PropTypes.string,
  setSelectedTool: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.bool
};

export { Option };
