import React, { Fragment } from "react";
import Cupo from "./Cupo";
import NuevoCupo from "./NuevoCupo";
import { Link } from "react-router-dom";
import { useCuposController } from "./hooksCupos/useCuposController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../layout/Spinner";

function Cupos() {
  const { cupos } = useCuposController();

  if (!cupos.length) return <Spinner />;

  return (
    <Fragment>
      <div className="btnAdd">
        <Link to={"/cupos/nuevo"}>
          <FontAwesomeIcon icon={faPlus} className="add"></FontAwesomeIcon>
          <label className="add">Agregar Cupo</label>
        </Link>
      </div>
      <div className="contenedorTable">
        <div className="tableTitle">
          <h2 id="tableTitle">Cupos</h2>
        </div>

        <div className="tableModel">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>                  
                </tr>
              </thead>
              <tbody>
                {cupos.map((cupo) => (
                  <Cupo key={cupo._id} cupo={cupo} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Cupos;
