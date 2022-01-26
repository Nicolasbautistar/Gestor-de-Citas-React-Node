import React from 'react';
import { useEditarCupoController } from './hooksCupos/useEditarCupoController'
import { CupoForm } from './CupoForm'
import { useLocation } from 'react-router-dom' 

function EditarCupo({}){
    const { state }  = useLocation()
    const { editarCupo, handleChange, validarCupo, cupo } = useEditarCupoController(state.cupo)
    
    return (
      <div className="">
        
        <CupoForm
          titulo="Editar Cupo"
          handleSubmit={editarCupo}
          handleChange={handleChange}
          validarSede={validarCupo}
          cupo={cupo}
          buttonText="Editar cupo"
        />
      </div>
    )
}

export default EditarCupo
