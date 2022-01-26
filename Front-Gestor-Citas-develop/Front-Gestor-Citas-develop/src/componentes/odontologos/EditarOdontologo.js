import React from 'react';
import { useEditarOdontologoController } from './hooks/useEditarOdontologoController'
import { OdontologoForm } from './OdontologoForm'
import { useLocation } from 'react-router-dom' 
function EditarOdontologo({}){
    const { state }  = useLocation()
    const { editarOdontologo, handleChange, validarOdontologo, odontologo } = useEditarOdontologoController(state.odontologo)
    
    return (
      <div>
        
        <OdontologoForm
          titulo="Editar odontologo"
          handleSubmit={editarOdontologo}
          handleChange={handleChange}
          validarOdontologo={validarOdontologo}
          odontologo={odontologo}
          buttonText="Editar"
          mostrarContraseña={false}
        />
      </div>
    )
}

export default EditarOdontologo
