import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {

    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      // console.log(token)

      if(!token) {
        setCargando(false);
        return;
      }

      // ingresamos al perfil pero hay que enviar el berer token
      const config = {
        headers: {
          "content-type": 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        const url = '/veterinarios/perfil';
        const { data } = await clienteAxios.get(url, config)

        // guardamos en context los datos del usuario loguado
        setAuth(data)
        
        // console.log(data)
      } catch (error) {
        console.log(error.response.data.msg)
        setAuth({})
      } 
      
      setCargando(false);

    }
    autenticarUsuario();
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setAuth({});
  }


  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem('token');
    // console.log(token)

    if(!token) {
      setCargando(false);
      return;
    }

    const configAxios = {
      headers: {
        "content-type": 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteAxios.put(url, datos, configAxios)

      // console.log(data)
      return {
        msg: 'Almacenado Correctamente',
      }

    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }    
  }


  const guardarPassword = async(datos) => {
    const token = localStorage.getItem('token');
    // console.log(token)

    if(!token) {
      setCargando(false);
      return;
    }

    const configAxios = {
      headers: {
        "content-type": 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {

      const url = '/veterinarios/actualizar-password'

      const { data } = await clienteAxios.put(url, datos, configAxios);
      // console.log(data);

      return {
        msg: data.msg
      }
      
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  return(
    <AuthContext.Provider 
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}



export {
  AuthProvider
}

export default AuthContext;