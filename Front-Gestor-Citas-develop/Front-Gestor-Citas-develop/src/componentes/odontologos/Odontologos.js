import React, { Fragment, useContext } from "react";
import Odontologo from "./Odontologo";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useOdontologosController } from "./hooks/UseOdontologosController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../layout/Spinner";
import { CRMContext } from '../../context/CRMContext';

function Odontologos() {
  const { odontologos } = useOdontologosController();
  const { push } = useHistory();
  const [auth, guardarAuth] = useContext(CRMContext);
  if(!auth.auth) {push('/iniciar-sesion');}
  
  if (!odontologos.length) return <Spinner />;

  return (
    <Fragment>
      <div className="btnAdd">
        <Link to={"/odontologos/nuevo"}>
          <FontAwesomeIcon icon={faPlus} className="add"></FontAwesomeIcon>
          <label className="add">Odontologo</label>
        </Link>
      </div>
      <div className="contenedorTable">
        <div className="tableTitle">
          <h2 id="tableTitle">Odontólogos</h2>
        </div>

        <div className="tableModel">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Telefono</th>
                  <th>Documento</th>
                  <th>Horario</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {odontologos.map((odontologo) => (
                  <Odontologo key={odontologo._id} odontologo={odontologo} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Odontologos;
