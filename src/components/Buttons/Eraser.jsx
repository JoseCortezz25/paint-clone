import PropTypes from "prop-types";
import { useContext } from "react";
import { ButtonsContext } from "./ButtonsContext";

const CBEraser = ({
  children,
  setSelectedTool
}) => {
  const { isSelectedEraser } = useContext(ButtonsContext);

  return (
    <li 
      className={`option`}  
      onClick={({ target }) => {
        setSelectedTool((prevState) => {
          return {
            tool: prevState.tool,
            isFill: target.checked,
          };  
        })
        
      }}>

        {isSelectedEraser ? <input type="checkbox" id="checkbox" checked /> : <input type="checkbox" id="checkbox" />}
      
      <label htmlFor="checkbox">{children}</label>
    </li>
  );
};

CBEraser.propTypes = {
  icon: PropTypes.string,
  tool: PropTypes.string,
  setSelectedTool: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.bool
};

export { CBEraser };
