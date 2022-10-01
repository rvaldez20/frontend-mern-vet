import { Outlet, Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'

const RutaProtegida = () => {

  // extraemos info del user que hizo login del useAuth (Auth Context)
  const { auth, cargando } = useAuth();
  console.log(auth)
  console.log(cargando)

  if(cargando) return 'cargando...'

  return (
    <>
      <h1>Es es una ruta protegida</h1>
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
    </>
  )
}

export default RutaProtegida