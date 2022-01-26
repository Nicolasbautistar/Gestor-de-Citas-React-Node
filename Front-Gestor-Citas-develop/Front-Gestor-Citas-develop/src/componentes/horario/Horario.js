import React, {useState}from 'react';
import {useContext} from "react";

import Swal from 'sweetalert2';
import odontologoAxios from '../../config/axios';
import {CRMContext} from '../../context/CRMContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';
import { useHistory } from "react-router-dom";
import Cupos from '../cupos/Cupos';
import HorarioOdontologo from './horariosOdontolo';
import Modal from 'react-modal';

function Horario({horario}) {
    const { push } = useHistory()
    const [auth ] = useContext(CRMContext);
    const [showHorario, setShowHorario] = useState(false)

    function openModal() {
      setShowHorario(true);
    }
    
    function closeModal() {
      setShowHorario(false);
    }
    const eliminarHorario = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un horario eliminado no se puede recuperar",
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
              odontologoAxios.delete(`/api/horario/delete/${horario._id}`, {
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
                push('/horario');
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

    const {_id, fecha, idCupos, idOdontologo} = horario;

    return (
        <tr className="horariotable">
                <td className="Fecha">{fecha}</td>
                <td className="Odontologo">{idOdontologo.nombre} {idOdontologo.apellidos}</td> 
                {console.log("idcupos",idCupos)}      
                <td className="CupoAuto">{idCupos.map((cupo) => {
                  return (
                    <div  key={cupo._id}>
                    {cupo.cupo.horaInicio} - {cupo.cupo.horaFin}
                    </div>
                  )
                })}</td>
                <td>
                    <div>
                        <Button onClick={eliminarHorario} className="btnIcon" id="delete"><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></Button>
                        <Button onClick={openModal} className="btnIcon" className="btnIcon" id="edit"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></Button>
                    </div>
                </td>
                <Modal
                    isOpen={showHorario}
                    onRequestClose={closeModal}
                    style={{
                      content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                      },
                    }}
                  >
                  <HorarioOdontologo
                    odontologo={idOdontologo}
                    fecha={fecha}
                    idHorario={horario._id}
                    closeModal={closeModal}
                  />

          
                </Modal>
        </tr>
    )
}
export default Horario;