import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import "./Registrarse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";
import odontologoAxios from "../../config/axios";

function Registrarse(props) {

  const { push } = useHistory()
  const [credenciales, guardarCredenciales] = useState({});

  function registrarse (e) {
    e.preventDefault();

      odontologoAxios.post(
        "/api/auth/create",
        credenciales
      ).then(res => {
        if(!res.data.ok) {
          Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: res.data.msg
          })
        } else {
          Swal.fire(
            'Registro correcto',
            res.data.mensaje,
            'success'
          );
          push("/iniciar-sesion");

        }
        push('/registro');
      }).catch(() => {
      Swal.fire({
        type: 'error',
        title: 'Hubo un error inesperado',
        text: 'Intente nuevamente'
      })
    })
  }

  const leerDatos = (e) => {
    guardarCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="containerRegistro">
      <form className="containerRegistro2" onSubmit={registrarse}>
        <div>
          <h4>Registrarse</h4>
          <div className="grillaRegistro">
            <div>
              <label>Nombres: </label>
              <input
                type="text"
                name="nombre"
                required
                onChange={leerDatos}
                className="form-control us-cn"
              />
            </div>

            <div>
              <label>Apellidos: </label>
              <input
                type="text"
                name="apellidos"
                required
                onChange={leerDatos}
                className="form-control us-cn"
              />
            </div>

            <div>
              <label>E-mail: </label>
              <input
                type="email"
                name="email"
                required
                onChange={leerDatos}
                className="form-control us-cn"
                autoComplete="off"
              />
            </div>

            <div>
              <label>Teléfono: </label>
              <input
                type="number"
                name="telefono"
                required
                onChange={leerDatos}
                className="form-control us-cn"
                autoComplete="off"
              />
            </div>

            <div>
              <label>Tipo de identificación: </label>
              {/* <input
                type="dropdown"
                
                required
                
                className="form-control us-cn"
                autocomplete="off"
              /> */}
              <select id="inputState" className="form-control us-cn selectRegistro" name="tipoDocumento" required onChange={leerDatos} >
                <option selected>Elige...</option>
                <option>Cédula de ciudadania</option>
                <option>Cédula de extranjería</option>
                <option>Pasaporte</option>
              </select>
            </div>

            <div>
              <label>Número de identificación: </label>
              <input
                type="text"
                name="documento"
                required
                onChange={leerDatos}
                className="form-control us-cn"
                autoComplete="off"
              />
            </div>

            <div>
              <label>Fecha de nacimiento: </label>
              <input
                type="date"
                name="fechaNacimiento"
                required
                onChange={leerDatos}
                className="form-control us-cn"
                autoComplete="off"
              />
            </div>


            <div>
              <label>Contraseña: </label>
              <input
                type="password"
                name="contraseña"
                required
                
                className="form-control us-cn"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label>Repite la contraseña: </label>
              <input
                type="password"
                name="password"
                required
                onChange={leerDatos}
                className="form-control us-cn"
                autoComplete="nope"
              />
            </div>
          </div>
        </div>
        <div className="botoneraRegistro">
          <FontAwesomeIcon
            icon={faTooth}
            className="logoRegistro"
          ></FontAwesomeIcon>
          <div className="botonesRegistro">
            <div className="tratamientodedatos">
              <input type="checkbox" className=" " required></input>
              <label>
                Acepto el tratamiento de datos por parte de la entidad para que
                maneje mi información.
              </label>
            </div>
            <input
              type="submit"
              className="btn_registro btn btn-primary"
              value="Continuar"
            ></input>
            <input
              type="button"
              className="btn_registro btn btn-primary btn2registro"
              onClick={() => props.history.push("/iniciar-sesion")}
              value="Iniciar sesión"
            ></input>
          </div>
        </div>
      </form>
    </div>
  );
}
export default withRouter(Registrarse);
