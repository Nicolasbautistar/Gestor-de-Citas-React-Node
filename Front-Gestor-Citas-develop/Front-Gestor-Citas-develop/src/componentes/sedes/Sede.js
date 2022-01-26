import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import odontologoAxios from '../../config/axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';
import { useHistory } from "react-router-dom";

function Sede({sede}) {
    const { push } = useHistory()

    const eliminarSede = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Una sede eliminada no se puede recuperar",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3D82DB',
            cancelButtonColor: '#A01C48',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
              odontologoAxios.delete(`/sedes/${id}`)
                .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Eliminado',
                            res.data.mensaje,
                            'success'
                        )
                    }
                })
            }
        })
    }

    const {_id, nombre, direccion, telefono, horaInicioSede, horaFinSede, estado } = sede;

    return (
        <tr className="sede">
                <td className="nombre">{nombre}</td>
                <td className="direccion">{direccion}</td>
                <td className="telefono">{telefono}</td>
                <td className="horario">{horaInicioSede} AM - {horaFinSede} PM</td>
                <td className="estado">{(estado)?"Activa":"Inactiva"}</td>
                <td>
                    <div>
                        <Button onClick={() => push('/sedes/editar', { sede })} className="btnIcon" id="edit"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                    </div>
                </td>
        </tr>
    )
}
export default Sede;

 // function horarioSede(hora) {
    //     let horas = hora.split(':');
    //     let data = '';  
    //     if(parseInt(horas[0]) < 12) {
    //     return data = `${hora} AM`
    //     }
    //     else{
    //     if(parseInt(horas[0]) == 12) {
    //         return data = `${hora} PM`
    //     } 
    //     if(parseInt(horas[0]) == 0) {
    //         return data = `${horas[0]+12}:${horas[1]} AM`
    //     } 
    //     return data = `${horas[0]-12}:${horas[1]} PM`
    //     }
    // }