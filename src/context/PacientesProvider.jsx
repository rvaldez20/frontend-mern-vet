import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

// se define el context
const PacientesContext = createContext();

// se define el provider
export const PacientesProvider = ({children}) => {

  const [pacientes, setPacientes] = useState([])

  // función para guardar un paciente
  const guardarPaciente = async (paciente) => {
    // guardamos el paciente
    try {

      const token = localStorage.getItem('token')
      // console.log(token)

      const configAxios = {
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/pacientes', paciente, configAxios)

      // seleccionamos los campos que deseamos
      const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
      console.log(pacienteAlmacenado)

      // y guardamos el cliente almacenado en el state de pacientes
      setPacientes([pacienteAlmacenado, ...pacientes]);

    } catch (error) {
      console.log(error)
    }
  }

  return(
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext;