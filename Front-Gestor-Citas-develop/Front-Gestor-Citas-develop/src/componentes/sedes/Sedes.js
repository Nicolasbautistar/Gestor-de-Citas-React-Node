import React, { Fragment } from "react";
import Sede from "./Sede";
import NuevaSede from "./NuevaSede";
import { Link } from "react-router-dom";
import { useSedesController } from "./hooksSedes/useSedesController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../layout/Spinner";

function Sedes() {
  const { sedes } = useSedesController();

  if (!sedes.length) return <Spinner />;

  return (
    <Fragment>
      <div className="btnAdd">
        <Link to={"/sedes/nuevo"}>
          <FontAwesomeIcon icon={faPlus} className="add"></FontAwesomeIcon>
          <label className="add">Agregar Sede</label>
        </Link>
      </div>
      <div className="contenedorTable">
        <div className="tableTitle">
          <h2 id="tableTitle">Sedes</h2>
        </div>

        <div className="tableModel">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Horario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sedes.map((sede) => (
                  <Sede key={sede._id} sede={sede} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Sedes;
