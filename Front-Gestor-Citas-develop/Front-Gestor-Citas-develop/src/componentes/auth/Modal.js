import React from "react";
import styled from "styled-components";



const Modal = ({
  children,
  estado,
  titulo,
  mostrarInput,
  cambiarValor
}) => {
  return (
    <>
      {estado && (
       
          <ModalRestablecer>
            <TituloModal>
                {titulo}
            </TituloModal>
            <InputModal>
              {mostrarInput && (
                <input
                  type="email"
                  name="email"
                  required                 
                  className="form-control"
                  placeholder="name@example.com"
                  onChange={cambiarValor}/>  
              )}
            </InputModal>
           {/*  <ReenviarCorreo>
              {mostrarEnlace && (
                <BtnRestablecer
                type="submit"
                className="btn btn-primary"
                id="btnrest2"
              >
                Reenviar correo
              </BtnRestablecer>
              )}
            </ReenviarCorreo> */}
            {children}
          </ModalRestablecer>

        
      )}
    </>
  );
};

export default Modal;

const ModalRestablecer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
`;

const TituloModal = styled.h3`
  margin-bottom: 30px;
  margin-top: 30px;
  text-align: left;
  font-size: 1.7vw;
`;
const InputModal = styled.div`
  margin-bottom: 1px;
`;

const ReenviarCorreo = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  text-align: center;  
  justify-items: center;
  align-items: center;
  width: 100%;
  `;
const BtnRestablecer = styled.button`
  margin-top: 3%;
  width: 40%;
`;
