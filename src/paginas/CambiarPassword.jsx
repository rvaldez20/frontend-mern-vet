import { useState,  useEffect } from 'react';

import AdminNav from '../components/AdminNav';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';


const CambiarPassword = () => {

  const { guardarPassword } = useAuth();
 
  const [password, setPassword] = useState({
    pwd_actual: '', 
    pwd_nuevo: '',
  })
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log(Object.keys(password))   // retorna array con los key    ['pwd_actual', 'pwd_nuevo']
    // console.log(Object.values(password).some( campo => campo === '')) // retorna array con los values ['actual', 'nuevo']

    // validaciones: 1. verificar que se incluyan los 2 passwords el actual y nuevo
    if(Object.values(password).some( campo => campo === '')) {
      setAlerta({
        msg: 'El password Actual y Password Nuevo son obligatorios', 
        error: true});
      return;
    } 

    // validación 2: 
    if(password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'Nuevo Password debe ser de al menos 6 caracteres', 
        error: true});
      return;
    }

    // gauradmos el nuevo password
    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);    
    
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
                type="password" 
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                name="pwd_actual"
                placeholder="Escribe tu Password actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>


            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
              <input 
                type="password" 
                className="border bg-gray-50 w-full p-2 mt-3 rounded-lg"
                name="pwd_nuevo"
                placeholder="Escribe tu nuevo Password"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
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