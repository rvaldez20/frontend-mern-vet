import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

// se define el context
const PacientesContext = createContext();

// se define el provider
export const PacientesProvider = ({children}) => {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  useEffect(() => {
    /* ========================================================
     *función para obtener los pacientes del veterinario logueado
    =========================================================== */
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



  /* ========================================================
      *función para guardar un paciente nuevo o actualizado
  =========================================================== */
  const guardarPaciente = async (paciente) => {

    // obtenemos el token de localstorage
    const token = localStorage.getItem('token')
    // console.log(token)

    const configAxios = {
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if(paciente.id) {      
      // Guardamos la actualización
      try {        
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, configAxios);
        // console.log(data)

        const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )
        setPacientes(pacientesActualizado)
        
      } catch (error) {
        console.log(error.response.data.msg)
      }
    } else {      
      // guardamos el nuevo paciente
      try {          
        const { data } = await clienteAxios.post('/pacientes', paciente, configAxios)
  
        // seleccionamos los campos que deseamos
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
        // console.log(pacienteAlmacenado)
  
        // y guardamos el cliente almacenado en el state de pacientes
        setPacientes([...pacientes, pacienteAlmacenado]);
  
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
  }



  /* ========================================================
      *función para setear un paciente a editar
  =========================================================== */
  const setEdicion = (paciente) => {
    setPaciente(paciente)
  }


  /* ========================================================
      *función para eliminar un paciente
  =========================================================== */
  const eliminarPaciente = async(id) => {

    const confirmar = confirm('¿Estás seguro de eliminar al paciente ??')
    
    if(confirmar) {
        
      try {
        // obtenemos el token de localstorage
        const token = localStorage.getItem('token')
        // console.log(token)

        const configAxios = {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        // console.log(id);

        // eliminamos el paciente
        const { data } = await clienteAxios.delete(`/pacientes/${id}`, configAxios);
        // console.log(data);

        const pacientesUpd = pacientes.filter( pacienteState => pacienteState._id !== id);
        setPacientes(pacientesUpd);
      } catch (error) {
        console.log(error.response.data.msg)
      } 
    }
  }

  return(
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  )
}

export default PacientesContext;