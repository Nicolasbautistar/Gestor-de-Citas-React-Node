import React, { Fragment } from "react";
import Horario from "./Horario";
import { Link } from "react-router-dom";
import { useHorariosController } from "./hooksHorarios/useHorariosController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../layout/Spinner";

function Horarios() {
  const { horarios } = useHorariosController();
  if (!horarios.length) return <Spinner />;

  return (
    <Fragment>      
      <div className="contenedorTable">
        <div className="tableTitle">
          <h2 id="tableTitle">Horarios</h2>
        </div>

        <div className="tableModel">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Odontologo</th>
                  <th>Cupo</th>                  
                </tr>
              </thead>
              <tbody>
                {horarios.map(( horario ) => (
                  <Horario key={horario._id} horario={horario} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Horarios;
