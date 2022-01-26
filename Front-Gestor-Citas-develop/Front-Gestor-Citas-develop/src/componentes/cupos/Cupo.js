import React from 'react';
import {useContext} from "react";

import Swal from 'sweetalert2';
import odontologoAxios from '../../config/axios';
import {CRMContext} from '../../context/CRMContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';
import { useHistory } from "react-router-dom";

function Cupo({cupo}) {
    const { push } = useHistory()
    const [auth ] = useContext(CRMContext);
    
    const eliminarCupo = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un cupo eliminado no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3D82DB',
            cancelButtonColor: '#A01C48',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
              // eliminar en la rest api
              //console.log("TOKEN_", auth.token)
              odontologoAxios.delete(`/api/cupo/delete/${cupo._id}`, {
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
                    'Se Elimino correctamente',
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
        })
    }         

    const {_id, horaInicio, horaFin } = cupo;

    return (
        <tr className="cupo">
                <td className="horaInicio">{horaInicio}</td>
                <td className="horaFIn">{horaFin}</td>                
                <td>
                    <div>
                        <Button onClick={eliminarCupo} className="btnIcon" id="delete"><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></Button>
                        <Button onClick={() => push('/cupos/editar', { cupo })} className="btnIcon" id="edit"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                    </div>
                </td>
        </tr>
    )
}
export default Cupo;