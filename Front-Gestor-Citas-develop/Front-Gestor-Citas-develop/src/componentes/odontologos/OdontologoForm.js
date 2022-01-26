import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import "./FormularioCrud.css";
import { Link } from "react-router-dom";

import { useSedesController } from "../sedes/hooksSedes/useSedesController";


export function OdontologoForm({
  handleSubmit,
  handleChange,
  mostrarContraseña,
  odontologo,
  buttonText,
  titulo,
}) {
  const { sedes } = useSedesController();
  return (
    <form className="containerFormulario" onSubmit={handleSubmit}>
      <div>
        <h4>{titulo}</h4>
        <div className="grillaRegistro">
          <div>
            <label for="nombre">Nombre:</label>
            <input
              className="form-control us-cn"
              name="nombre"
              id="nombre"
              placeholder="Nombres"
              type="text"
              value={odontologo.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Apellidos: </label>
            <input
              className="form-control us-cn"
              name="apellidos"
              id="apellidos"
              placeholder="Apellidos"
              type="text"
              value={odontologo.apellidos}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label for="telefono">Teléfono: </label>
            <input
              className="form-control us-cn"
              name="telefono"
              id="telefono"
              placeholder="Teléfono"
              type="number"
              value={odontologo.telefono}
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
              value={odontologo.estado}
              onChange={handleChange}
              defaultValue={odontologo.estado}
            >
              <option selected>Elige...</option>
              <option value={true}>Activo </option>
              <option value={false}>Inactivo </option>
            </select>
          </div>
          <div>
            <label for="documento">Número de identificación: </label>
            <input
              className="form-control us-cn"
              name="documento"
              id="documento"
              placeholder="Número Documento"
              type="number"
              value={odontologo.documento}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label for="fechaNacimiento">Fecha de nacimiento: </label>
            <input
              className="form-control us-cn"
              name="fechaNacimiento"
              id="fechaNacimiento"
              placeholder="Fecha de nacimiento"
              type="date"
              value={odontologo.fechaNacimiento}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div>
            <label for="email">E-mail: </label>
            <input
              className="form-control us-cn"
              name="email"
              id="email"
              placeholder="Email"
              type="email"
              value={odontologo.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label for="idEspecializacion">Especialización: </label>
            
            <select                  
              className="form-control us-cn selectRegistro"
              id="idEspecializacion"
              name="idEspecializacion"
            >
            <option selected>Elige...</option>
            <option value={odontologo.idEspecializacion}>Odontología</option>
          </select>
            
          </div>
          <div>
            <label for="idSede">Sede: </label>
            <select
              className="form-control us-cn selectRegistro"
              id="idSede"
              name="idSede"
            >
              <option selected>Elige...</option>
               {sedes.map((sede) => (
                  <option value={sede._id}>{sede.nombre}</option>
                ))}
          </select>              
          </div>
          
          {mostrarContraseña && (
          <div>
            
            <label for="contraseña">Contraseña: </label>
            <input
              className="form-control us-cn"
              name="password"
              id="password"
              placeholder="Contraseña"
              type="password"
              value={odontologo.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>)}
        </div>
      </div>
      <div className="botoneraRegistro">
        <FontAwesomeIcon
          icon={faTooth}
          className="logoRegistro"
        ></FontAwesomeIcon>
        <div className="botonesRegistro">
          <Link to={"/"}>
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
  );
}
///
///<form onSubmit={handleSubmit}>
///<legend>Datos basicos</legend>
///
///<div className="input-group">
///  <label>Nombres:</label>
///  <input value={odontologo.nombre} type="text" placeholder="Nombres" name="nombre" onChange={handleChange} />
///</div>
///{/*<select>
///  {sedes.map(sede => <option value={sede.id}>{sede.nombre}</option>)}
///</select>*/}
///<div className="input-group">
///  <label>Apellidos:</label>
///  <input value={odontologo.apellidos} type="text" placeholder="Apellidos" name="apellidos" onChange={handleChange} />
///</div>
///<div className="input-group">
///  <label>Teléfono:</label>
///  <input value={odontologo.telefono} type="text" placeholder="Teléfono" name="telefono" onChange={handleChange} />
///</div>
///<div className="input-group">
///  <label>Número Documento:</label>
///  <input value={odontologo.documento} type="text" placeholder="Documento" name="documento" onChange={handleChange} />
///</div>
///<div className="input-group">
///  <label>Fecha de nacimiento:</label>
///  <input value={odontologo.fechaNacimiento} type="date" placeholder="Fecha de nacimiento" name="fechaNacimiento" onChange={handleChange} />
///</div>
///<div className="input-group">
///  <label>Email:</label>
///  <input value={odontologo.email} type="email" placeholder="Email" name="email" onChange={handleChange} />
///</div>
///<div className="input-group">
///  <label>Contraseña:</label>
///  <input value={odontologo.password} type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
///</div>
///<div className="input-group">
///  <label>Especialización:</label>
///  <input value={odontologo.idEspecializacion} type="text" placeholder="id especialización" name="idEspecializacion" />
///</div>
///<div className="input-group">
///  <label>Sede:</label>
///  <input value={odontologo.idSede} type="text" placeholder="id sede" name="idSede" />
///</div>
///<div className="enviar">
///  <button className="btn btn-azul" disabled={validarOdontologo}>{buttonText}</button>
///</div>
///</form>
///
///
