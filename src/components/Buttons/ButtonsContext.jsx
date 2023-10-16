import React, { useState } from 'react'
import PropTypes from "prop-types";

const ButtonsContext = React.createContext();

function ButtonsProvider({ children }) {
  const [isSelectedEraser, setSelectedEraser] = useState(false);

  return (
		<ButtonsContext.Provider value={{isSelectedEraser, setSelectedEraser}}>
			{children}
		</ButtonsContext.Provider>
  )
}

ButtonsProvider.propTypes = {
  children: PropTypes.any
}

export { ButtonsContext, ButtonsProvider }