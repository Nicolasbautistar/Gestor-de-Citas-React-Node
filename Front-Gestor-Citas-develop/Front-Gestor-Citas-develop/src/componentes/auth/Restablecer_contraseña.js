import React, { useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";

import "./Restablecer_contraseña.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

import odontologoAxios from "../../config/axios";
import Swal from "sweetalert2";

function Restablecer_contraseña(props) {
  const [estadoModal1, cambiarEstadoModal1] = useState(true);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);

  const [texto, setTexto] = useState("");

  const handleInputChange = ({ target }) => {
    setTexto(target.value);
  };

  const restablecer = async (e) => {
    e.preventDefault();
    odontologoAxios
      .post("/api/password-reset", { email: texto })
      .then((res) => {
        console.log(res.data.ok);
        if (!res.data.ok) {
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: res.data.msj,
          });
        } else {
          Swal.fire("Correo enviado", res.data.mensaje, "success");
          cambiarEstadoModal1(false);
          cambiarEstadoModal2(true);
        }
      });
  };

  return (
    <div>
      <div className="containerRestablecer">
        <div className="containerRestablecer2">
          <h2 className="restablecerTitle">Restablecer Contraseña</h2>
          <form className="containerRestablecer3" onSubmit={restablecer}>
            <div className="modalRestablecer">
              <FontAwesomeIcon
                icon={faTooth}
                className="logoRestablecer"
              ></FontAwesomeIcon>
              <Modal
                estado={estadoModal1}
                titulo="Ingresa tu correo electrónico para restablecer tu contraseña"
                mostrarInput={true}
                cambiarValor={handleInputChange}
              >
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
                    value="Aceptar"
                  >
                    Aceptar
                  </BtnRestablecer>
                </BotonesRestablecer>
              </Modal>
              <Modal
                estado={estadoModal2}
                titulo="Enviamos un link a tu correo para restablecer la contraseña"
                mostrarInput={false}
              >
                <BotonesRestablecer1>
                  <BtnRestablecer
                    type="submit"
                    className="BtnRestablecer btn btn-primary"
                  >
                    Reenviar código
                  </BtnRestablecer>
                </BotonesRestablecer1>
              </Modal>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Restablecer_contraseña;

const BotonesRestablecer = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const BtnRestablecer = styled.button`
  margin-top: 3%;
  width: 40%;
`;

const BotonesRestablecer1 = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
