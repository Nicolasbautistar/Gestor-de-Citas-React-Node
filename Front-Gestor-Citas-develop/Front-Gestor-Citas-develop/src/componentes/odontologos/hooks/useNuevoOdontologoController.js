import {useContext, useState} from "react";
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2';
import odontologoAxios from '../../../config/axios';
import {CRMContext} from '../../../context/CRMContext';

const initialValue = {
  nombre: '',
  apellidos: '',
  email: '',
  telefono :'',
  documento: '',
  fechaNacimiento: '',
  password: '',
  idEspecializacion: '61d4cd132f50b77c6e95fcd8',
  idSede: '61b680797f20f236afbd5fe9'
}

export function useNuevoOdontologoController() {
  const { push } = useHistory()
  const [auth ] = useContext(CRMContext );
  const[odontologo, guardarOdontologo] = useState(initialValue);

  function handleChange(event) {
    guardarOdontologo({
      ...odontologo,
      [event.target.name] : event.target.value
    })
  }

  function agregarOdontologo(event) {
    event.preventDefault();
    console.log(odontologo)
    odontologoAxios.post('/api/odontologo/create', odontologo, {
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
          guardarOdontologo(initialValue)
          Swal.fire(
            'Se agregó el Odontologo',
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

  return {handleChange, validarOdontologo, agregarOdontologo, odontologo}
}
