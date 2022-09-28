import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)

  // obtenemos el token de la url
  const params = useParams();  
  const { token } = params;
  console.log(token)

  useEffect(() => {
    const comprobarToken = async() => {
      try {        
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg: 'Coloca tu nuevo password'
        });

        setTokenValido(true);
      } catch (error) {
        // si hay error
        setAlerta({
          msg: 'Error con el enlace',
          error: true
        });
      }
    }
    comprobarToken();

  }, [])

  const { msg } = alerta;


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu password y no pierdas tu acceso a {""}  
          <span className="text-black">tus Pacientes</span> 
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 roudend-xl bg-white">

        { 
          msg && <Alerta 
                    alerta={alerta}
                  />
        }

        { tokenValido && (
          <form>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
              <input 
                type="password"
                placeholder="Tu Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input 
              type="submit"
              value="Restablecer Nuevo Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-4 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
            />
          </form>
        )}  

      </div>
    </>
  )
}

export default NuevoPassword