import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./../odontologos/FormularioCrud.css";
import "./HorarioForm.css";

export function HorarioForm({
  handleSubmit,
  handleChange,
  validarHorario,
  horario,
  buttonText,
  titulo
}) {
  return (
    <div>
      <form className="containerFormulario" onSubmit={handleSubmit}>
        <div>
          <h4>{titulo}</h4>
          <div className="GrillahorasCupos">
            <div>
              <label>Fecha:</label>
              <input
                className="form-control us-cn"
                name="horaInicio"
                id="horaInicio"
                placeholder="Hora Inicio"
                type="time"
                value={horario.fecha}
                onChange={handleChange}
                required
              />
            </div>
            
          </div>
        </div>
        <div className="botoneraCupo">
          <FontAwesomeIcon
            icon={faTooth}
            className="logoRegistro"
          ></FontAwesomeIcon>
          <div className="botonesCupo">
            <Link to={"/cupos"}>
              <input
                type="button"
                value="Cancelar"
                className="btn_registro btn btn-primary"
              />
            </Link>

            <input
              type="submit"
              className="btn_registro btn btn-primary btn2registro"
              value={buttonText}
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
