import {useContext, useState} from "react";
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import odontologoAxios from '../../../config/axios';
import {CRMContext} from '../../../context/CRMContext';


export function useEditarHorarioController(currentHorarios) {
  const { push } = useHistory()
  const [auth ] = useContext(CRMContext);
  const[horario, guardarHorario] = useState({
    ...currentHorario,
  });

  function handleChange(event) {
    guardarHorario({
      ...horario,
      [event.target.name] : event.target.value
    })
  }

  function editarHorario(event) {
    event.preventDefault();
    odontologoAxios.put(`/api/horario/update/${currentHorario._id}`, cupo, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then(res => {
        if(!res.data.ok) {
          Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: res.data.msg
          })
        } else {
          Swal.fire(
            'Se editó el Horario',
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
    })
  }

  function validarHorario() {
    const {fecha, idCupos, idOdontologo} = horario;
    return !fecha.length || !idCupos.length || !idOdontologo.length;
  }

  if(!auth.auth && (localStorage.getItem('token') === auth.token ) ) {
    push('/iniciar-sesion');
  }

  return {handleChange, validarHorario, editarHorario, horario}
}
