import { useState,  useEffect } from 'react';

import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';


const CambiarPassword = () => {

  const { auth,actualizarPerfil } = useAuth();
  const [perfil] = useState({})  // se crea state para no modificar el del auth
  const [alerta, setAlerta] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  // seteamos la alerta
  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {' '} 
        <span className="text-indigo-700 font-bold">Password Aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          { 
            msg && <Alerta 
                      alerta={alerta}
                    />
          }    

          <form
            onSubmit={handleSubmit}
          >
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Password Actual</label>
              <input 
                type="text" 
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                name="password"
                placeholder="Escribe tu Password actual"
              />
            </div>


            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
              <input 
                type="text" 
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                name="nuevoPassword"
                placeholder="Escribe tu nuevo Password"
              />
            </div>

            
            <input 
              type="submit" 
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white w-full rounded-lg uppercase mt-5"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default CambiarPassword