import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

// se define el context
const PacientesContext = createContext();

// se define el provider
export const PacientesProvider = ({children}) => {

  return(
    <PacientesContext.Provider
      value={{}}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext;