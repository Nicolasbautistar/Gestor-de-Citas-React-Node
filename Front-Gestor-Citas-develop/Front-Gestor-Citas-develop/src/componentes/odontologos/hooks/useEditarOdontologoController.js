import {useContext, useState} from "react";
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';
import odontologoAxios from '../../../config/axios';
import {CRMContext} from '../../../context/CRMContext';


export function useEditarOdontologoController(currentOdontologo) {
  const { push } = useHistory()
  const [auth ] = useContext(CRMContext);
  const[odontologo, guardarOdontologo] = useState({
    ...currentOdontologo,
    idEspecializacion: currentOdontologo.idEspecializacion._id,
    idSede: currentOdontologo.idSede._id,
  });

  function handleChange(event) {
    guardarOdontologo({
      ...odontologo,
      [event.target.name] : event.target.value
    })
  }

  function editarOdontologo(event) {
    event.preventDefault();
    odontologoAxios.put(`/api/odontologo/update/${currentOdontologo._id}`, odontologo, {
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
            'Se editó el Odontologo',
            res.data.mensaje,
            'success'
          )

        }
        push('/');
      }).catch(() => {
      Swal.fire({
        type: 'error',
        title: 'Hubo un error',
        text: 'Intente nuevamente'
      })
    })
  }

  function validarOdontologo() {
    const {nombre, apellido, email, empresa, telefono} = odontologo;
    return !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
  }

  if(!auth.auth && (localStorage.getItem('token') === auth.token ) ) {
    push('/iniciar-sesion');
  }

  return {handleChange, validarOdontologo, editarOdontologo, odontologo}
}
