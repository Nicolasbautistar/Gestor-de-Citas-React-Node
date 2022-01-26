import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./../odontologos/FormularioCrud.css";
import "./cupoForm.css";

export function CupoForm({
  handleSubmit,
  handleChange,
  validarCupo,
  cupo,
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
              <label>Hora inicio:</label>
              <input
                className="form-control us-cn"
                name="horaInicio"
                id="horaInicio"
                placeholder="Hora Inicio"
                type="time"
                value={cupo.horaInicio}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Hora Fin: </label>
              <input
                className="form-control us-cn"
                name="horaFin"
                id="horaFin"
                placeholder="Hora Fin"
                type="time"
                value={cupo.horaFin}
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
