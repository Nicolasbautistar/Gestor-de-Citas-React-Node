import React from 'react';
import { useEditarHorarioController } from './hooksHorarios/useEditarHorarioController'
import { HorarioForm } from './HorarioForm'
import { useLocation } from 'react-router-dom' 

function EditarHorario({}){
    const { state }  = useLocation()
    const { editarHorario, handleChange, validarHorario, horario } = useEditarHorarioController(state.horario)
    
    return (
      <div className="">
        
        <HorarioForm
          titulo="Editar Horario"
          handleSubmit={editarHorario}
          handleChange={handleChange}
          validarHorario={validarHorario}
          horario={horario}
          buttonText="Editar Horario"
        />
      </div>
    )
}

export default EditarHorario
