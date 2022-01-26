import {useContext, useState} from "react";
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import odontologoAxios from '../../../config/axios';
import {CRMContext} from '../../../context/CRMContext';


export function useEditarCupoController(currentCupo) {
  const { push } = useHistory()
  const [auth ] = useContext(CRMContext);
  const[cupo, guardarCupo] = useState({
    ...currentCupo,
  });

  function handleChange(event) {
    guardarCupo({
      ...cupo,
      [event.target.name] : event.target.value
    })
  }

  function editarCupo(event) {
    event.preventDefault();
    odontologoAxios.put(`/api/cupo/update/${currentCupo._id}`, cupo, {
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
            'Se editó el cupo',
            res.data.mensaje,
            'success'
          )

        }
        push('/cupos');
      }).catch(() => {
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Intente nuevamente'
      })
    })
  }

  function validarCupo() {
    const {horaInicio, horaFin} = cupo;
    return !horaInicio.length || !horaFin.length ;
  }

  if(!auth.auth && (localStorage.getItem('token') === auth.token ) ) {
    push('/iniciar-sesion');
  }

  return {handleChange, validarCupo, editarCupo, cupo}
}
