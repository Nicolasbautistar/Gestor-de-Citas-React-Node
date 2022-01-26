import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';
import {withRouter} from 'react-router-dom';
import './navegacion.css';

const Navegacion = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);
    if(!auth.auth) return null;

    const cerrarSesion = () => {

        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        props.history.push('/iniciar-sesion');
    }

    return ( 
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/sedes"} className="sedes">Sedes</Link>
                <Link to={"/"} className="odontologos">Odontologos</Link>
                <Link to={"/horario"} className="horario">Horario</Link>
                <Link to={"/cupos"} className="cupos">Cupos</Link>
                
                { auth.auth ? (
                        <button 
                            type="button"
                            className="btn btn-rojo boton-salir"
                            onClick={cerrarSesion}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            
                        </button>
                    ) : null }
            </nav>
        </aside>

     );
}
 
export default withRouter(Navegacion);