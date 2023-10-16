import PropTypes from 'prop-types'
import { createContext, useState } from "react";

export const AccentContext = createContext(false);

export function AccentContextProvider({ children }) {
  const [selected, setSelected] = useState(false);

  <AccentContext.Provider value={{selected, setSelected}}>
    {children}
  </AccentContext.Provider>
}

AccentContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}