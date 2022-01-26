import React, {useContext} from 'react';

import { CRMContext } from '../../context/CRMContext';
import {withRouter} from 'react-router-dom';

const Header = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);

   

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>Dashboard admin</h1>


                    
                    
                
                </div>
                
            </div>
        </header>
    )

}

export default withRouter(Header);