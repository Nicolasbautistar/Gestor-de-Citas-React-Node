import React from 'react';
import { useEditarSedeController } from './hooksSedes/useEditarSedeController'
import { SedeForm } from './SedeForm'
import { useLocation } from 'react-router-dom' 

function EditarSede({}){
    const { state }  = useLocation()
    const { editarSede, handleChange, validarSede, sede } = useEditarSedeController(state.sede)
    
    return (
      <div className="">
        <SedeForm
          titulo="Editar sede"
          handleSubmit={editarSede}
          handleChange={handleChange}
          validarSede={validarSede}
          sede={sede}
          buttonText="Editar sede"
        />
      </div>
    )
}

export default EditarSede
