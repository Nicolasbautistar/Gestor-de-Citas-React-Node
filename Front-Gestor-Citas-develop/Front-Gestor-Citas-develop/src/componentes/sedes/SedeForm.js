import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import "./SedeForm.css";
import { Link } from "react-router-dom";

export function SedeForm ({
  handleSubmit,
  handleChange,
  validarSede,
  sede,
  buttonText,
  titulo,
}) {
  console.log(sede);
  return (
    <form className="containerFormularioSede" onSubmit={handleSubmit}>
      <div>
        <h4>{titulo}</h4>
        <div className="grillaSede">
          <div>
            <label>Nombre:</label>
            <input
              className="form-control us-cn"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              type="text"
              value={sede.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Dirección: </label>
            <input
              className="form-control us-cn"
              name="direccion"
              id="direccion"
              placeholder="Dirección"
              type="text"
              value={sede.direccion}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Teléfono: </label>
            <input
              className="form-control us-cn"
              name="telefono"
              id="telefono"
              placeholder="Teléfono"
              type="number"
              value={sede.telefono}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label> Estado: </label>
            <select
              className="form-control us-cn selectRegistro"
              id="estado"
              name="estado"
              placeholder="Estado"
              type="select"
              value={sede.estado}
              onChange={handleChange}
              defaultValue={sede.estado}
            >
              <option selected>Elige...</option>
              <option value={true}>Activa </option>
              <option value={false}>Inactiva </option>
            </select>
          </div>
          
          <div>
            <label>Hora inicio:</label>
            <input
              className="form-control us-cn"
              name="horaInicioSede"
              id="horaInicio"
              placeholder="Hora Inicio"
              type="time"
              value={sede.horaInicioSede}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Hora Fin: </label>
            <input
              className="form-control us-cn"
              name="horaFinSede"
              id="horaFin"
              placeholder="Hora Fin"
              type="time"
              value={sede.horaFinSede}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <div className="botoneraSede">
        <div className="botonesSede">
          <FontAwesomeIcon
            icon={faTooth}
            className="logo"
          ></FontAwesomeIcon>
          <Link to={"/sedes"}>
          <input
            type="button"
            value="Cancelar"
            className="btn_registroSede btn btn-primary"
          />
          </Link>
          <input
            type="submit"
            className="btn_registroSede btn btn-primary btn2registroSede"
            value={buttonText} 
          ></input>
        </div>
      </div>
    </form>
  );
}