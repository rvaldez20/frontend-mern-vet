import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

// se define el context
const PacientesContext = createContext();

// se define el provider
export const PacientesProvider = ({children}) => {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    const obtenerPacientes = async() => {
      try {
        const token = localStorage.getItem('token');
        if(!token) return 

        const configAxios = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios.get('/pacientes', configAxios)      

        // agregamos al state los pacientes
        setPacientes(data);

      } catch (error) {
        console.log(error)
      }
    }
    obtenerPacientes();
  }, [])

  // función para guardar un paciente
  const guardarPaciente = async (paciente) => {

    if(paciente.id) {
      console.log('editando....')
    } else {
      console.log('Nuevo')
    }

    return

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
      console.log(error.response.data.msg)
    }
  }


  const setEdicion = (paciente) => {
    setPaciente(paciente)
  }

  return(
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext;