import React, { useState } from "react";
import "./tables.css";
import { useCuposController } from "../../componentes/cupos/hooksCupos/useCuposController";
import odontologoAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import {useHistory} from 'react-router-dom'


function HorarioOdontologo({ odontologo, fecha, idHorario, closeModal }) {
  const { cupos } = useCuposController();
  const [auth] = useContext(CRMContext);
  const { push } = useHistory()
  let listaCupos = [];
  let date;

  function onChange(event) {
    if (!listaCupos.includes(event.target.value)) {
      listaCupos = [...listaCupos, event.target.value];
    } else {
      listaCupos = listaCupos.filter((cupo) => cupo !== event.target.value);
    }
  }
  function onChangeDate(event) {
    date = event.target.value;
    console.log("FECHA", date);
  }
  const guardarHorario = (idOdontologo) => {
    const data = {
      idOdontologo,
      'idCupos': listaCupos.map((cupo) => ({ cupo })),
      'fecha': fecha,
    };
    odontologoAxios.put(`/api/horario/update/${idHorario}`, data, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    .then(res => {
      console.log(res.data.ok)
      if(!res.data.ok) {
        Swal.fire({
          type: 'error',
          title: 'Hubo un error',
          text: res.data.msg
        })
      } else {        
        Swal.fire(
          'Se actualizo el horario',
          res.data.mensaje,
          'success'
        )

      }
      push('/horario');
    }).catch(() => {
    Swal.fire({
      type: 'error',
      title: 'Hubo un error',
      text: 'Intente nuevamente'
    })
  });
  };

  return (
    <div>
      <div className="flexHorarioTitle">
        <p>{`${odontologo.nombre} ${odontologo.apellidos}`}</p>
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="iconoHorario"
        ></FontAwesomeIcon>
      </div>
      <input
        onChange={onChangeDate}
        type="date"
        name="fecha"
        id="fecha"
        value={fecha}
        disabled
        className="form-control us-cn dateHorarioModal"
      ></input>
      <div className="contenedorTableHorario">
        <div className="tableModelHorario">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th className="thHorario" >Activos</th>
                  <th className="thHorario">Hora Inicio</th>
                  <th className="thHorario">Hora Fin</th>
                </tr>
              </thead>
              <tbody>
                {cupos.map((cupo) => (
                  <tr key={cupo._id}>
                    <td className="thHorario">
                      <input
                        onChange={onChange}
                        type="checkbox"
                        value={cupo._id}
                      />
                    </td>
                    <td className="thHorario"> {cupo.horaInicio}  </td>
                    <td className="thHorario"> {cupo.horaFin} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="BotonesHorario">
      
      <button onClick={closeModal} className="BtnHorario btn btn-primary" id="btnrest1">Close</button>
      <button
        onClick={() => guardarHorario(odontologo._id)}
        className="BtnHorario btn btn-primary"
        id="btnrest2"
      >
        Actualizar
      </button>
      </div>
    </div>
  );
}
export default HorarioOdontologo;
