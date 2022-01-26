import React from 'react';
import { useNuevoCupoController } from './hooksCupos/useNuevoCupoController'
import { CupoForm } from './HorarioForm'

function NuevoCupo(){
  const { agregarCupo, handleChange, validarCupo, cupo } = useNuevoCupoController()

  return (
    <div >
      <CupoForm
        titulo="Nuevo Cupo"
        handleSubmit={agregarCupo}
        handleChange={handleChange}
        validarSede={validarCupo}
        cupo={cupo}
        buttonText="Agregar cupo"
      />
    </div>
  )
}

export default NuevoCupo
