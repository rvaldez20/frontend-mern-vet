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

  return(
    <AuthContext.Provider 
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion
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