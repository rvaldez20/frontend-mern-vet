import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  // states para: saber cuando ya se confirmo, un loader(cargando) y la alerta
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  // es un hook de react-router-dom para obtener los params d ela url
  const params = useParams();
  // console.log(params)

  const { token } = params;
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        // url y se hace la petieción get para confirmar la cuenta
        const url =`http://localhost:4000/api/veterinarios/confirmar/${token}`;
        const { data } = await axios.get(url);

        // como en etse punto ya sabemos que se confirmo se cambia confirmarCuenta a true y se mustra una alerta
        // con el mensaje de la respuesta satisfactoria del backend
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        // si hay algun error en confirmar mostramos una alerta con el mensaje de error del backend
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      // como en este punto ya se obtuvo la respuesta por lo que cargando cambia a false el loader(cargando)
      setCargando(false);
    }
    confirmarCuenta();
  }, []);


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y comienza a administrar{""}  
          <span className="text-black">tus Pacientes</span> 
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 roudend-xl bg-white">

        { 
          // se verifica si el loader(cargado ya finalizo y si es false mustra la alerta) 
          !cargando && 
            <Alerta 
              alerta={alerta}
            />
        }

        {
          // verificamos si ya se confirmo la cuenta (state cuentaConfirmada) mostramos el enlace para iniciar sesión
          cuentaConfirmada && (
            <Link
              className="block text-center my-5 text-gray-500"
              to="/">Iniciar Sesión
            </Link>
          )
        }

      </div>   
    </>
  )
}

export default ConfirmarCuenta;