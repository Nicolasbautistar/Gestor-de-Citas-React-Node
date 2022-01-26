import React from 'react';
import { useNuevaSedeController } from './hooksSedes/useNuevaSedeController'
import { SedeForm } from './SedeForm'

function NuevaSede(){
  const { agregarSede, handleChange, validarSede, sede } = useNuevaSedeController()

  return (
    <div >
      <SedeForm
        titulo="Nueva Sede"
        handleSubmit={agregarSede}
        handleChange={handleChange}
        validarSede={validarSede}
        sede={sede}
        buttonText="Agregar sede"
      />
    </div>
  )
}

export default NuevaSede
