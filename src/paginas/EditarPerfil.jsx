import AdminNav from "../components/AdminNav"


const EditarPerfil = () => {
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu {' '} 
        <span className="text-indigo-700 font-bold">Perfíl Aquí</span>
      </p>
    </>
  )
}

export default EditarPerfil