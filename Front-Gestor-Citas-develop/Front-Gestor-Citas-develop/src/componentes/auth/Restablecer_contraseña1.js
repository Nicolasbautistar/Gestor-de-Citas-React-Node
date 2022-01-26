import React, { useState } from "react";
import styled from "styled-components";

import "./Restablecer_contraseña.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

import odontologoAxios from "../../config/axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

function Restablecer_contraseña1(props) {
  let params = useParams();

  const { id, token } = params;

  const [contraseña, guardarContraseña] = useState({});

  const restablecerContraseña = async (e) => {
    e.preventDefault();

    if (contraseña.password == contraseña.password2) {
      if (contraseña.password.length > 5) {
        let contraseñaFinal = { "password": contraseña.password };
        try {
          odontologoAxios.post(
            `/api/password-reset/${id}/${token}`,
            contraseñaFinal
          );

          Swal.fire(
            "Contraseña Restablecida",
            "Serás redirijido(a) al inicio de sesión.",
            "success"
          );
          props.history.push("/iniciar-sesion");
        } catch (error) {
          Swal.fire({
            type: "Error",
            title: "No se pudo restablecer tu contraseña",
            text: error.response.data.mensaje,
          });
        }
      } else {
        Swal.fire({
          type: "Error",
          title: "No se pudo restablecer tu contraseña",
          text: "La contraseña debe ser minimo de 6 caracteres",
        });
      }
    } else {
      Swal.fire({
        type: "Error",
        title: "No se pudo restablecer tu contraseña",
        text: "Las contraseñas no coinciden ",
      });
    }
  };
  const leerContraseña = (e) => {
    guardarContraseña({
      ...contraseña,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="containerRestablecer">
        <div className="containerRestablecer2">
          <h2 className="restablecerTitle">Restablecer Contraseña</h2>
          <form
            className="containerRestablecer3"
            onSubmit={restablecerContraseña}
          >
            <div className="modalRestablecer">
              <FontAwesomeIcon
                icon={faTooth}
                className="logoRestablecer1"
              ></FontAwesomeIcon>
              <ContenedorRestablecer>
                <ContenedorModal>
                  <div>
                    <TituloModal>Digita tu nueva contraseña</TituloModal>
                    <input
                      type="password"
                      name="password"
                      required
                      className="form-control"
                      placeholder="contraseña"
                      onChange={leerContraseña}
                    />
                  </div>
                  <div>
                    <TituloModal>Digita nuevamente tu contraseña</TituloModal>
                    <input
                      type="password"
                      name="password2"
                      required
                      className="form-control"
                      placeholder="contraseña"
                      onChange={leerContraseña}
                    />
                  </div>
                </ContenedorModal>
                <BotonesRestablecer>
                  <BtnRestablecer
                    className="BtnRestablecer btn btn-primary"
                    
                    onClick={() => props.history.push("/iniciar-sesion")}
                  >
                    Cancelar
                  </BtnRestablecer>
                  <BtnRestablecer
                    type="submit"
                    className="BtnRestablecer btn btn-primary"
                    
                  >
                    Aceptar
                  </BtnRestablecer>
                </BotonesRestablecer>
              </ContenedorRestablecer>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Restablecer_contraseña1;

const ContenedorRestablecer = styled.div`
  display: grid;
  flex-flow: row wrap;
  justify-content: CENTER;
  width: 100%;
  height: 80%;
  grid-template-columns: repeat(2, 1fr);
`;
const ContenedorModal = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 120%;
`;

const BotonesRestablecer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-end;
  width: auto;
  margin-top: 65px;
`;

const BtnRestablecer = styled.button`
  border-radius: 10px !important;
  margin-bottom: 30px;
  border: 0 !important;
  text-align: center !important;
  padding: 10px 40px;
  width: 60%;
`;

const TituloModal = styled.h3`
  margin-bottom: 6px;
  margin-top: 30px;
  text-align: left;
  font-size: 1.3vw;
  color: var(--text);
`;
