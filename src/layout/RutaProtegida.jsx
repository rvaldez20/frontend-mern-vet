import { Outlet } from "react-router-dom"

const RutaProtegida = () => {
  return (
    <>
      <h1>Es es una ruta protegida</h1>
      <Outlet />
    </>
  )
}

export default RutaProtegida