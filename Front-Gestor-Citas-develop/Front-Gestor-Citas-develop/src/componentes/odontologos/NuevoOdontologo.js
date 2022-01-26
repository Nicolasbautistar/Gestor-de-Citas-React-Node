import React from "react";
import { useNuevoOdontologoController } from "./hooks/useNuevoOdontologoController";
import { OdontologoForm } from "./OdontologoForm";

function NuevoOdontologo() {
  const { agregarOdontologo, handleChange, validarOdontologo, odontologo } =
    useNuevoOdontologoController();

  return (
    <div>
      <OdontologoForm
        titulo="Nuevo odontologo"
        handleSubmit={agregarOdontologo}
        handleChange={handleChange}
        validarOdontologo={validarOdontologo}
        odontologo={odontologo}
        buttonText="Agregar"
        mostrarContraseña={true}
      />
    </div>
  );
}

export default NuevoOdontologo;
