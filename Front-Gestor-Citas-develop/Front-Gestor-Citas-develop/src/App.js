import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navegacion from './componentes/layout/Navegacion';
import Odontologos from './componentes/odontologos/Odontologos';
import EditarOdontologo from './componentes/odontologos/EditarOdontologo';
import NuevoOdontologo from './componentes/odontologos/NuevoOdontologo';

import Sedes from './componentes/sedes/Sedes';
import EditarSede from './componentes/sedes/EditarSede';
import NuevaSede from './componentes/sedes/NuevaSede';

import Cupos from './componentes/cupos/Cupos';
import EditarCupo from './componentes/cupos/EditarCupo';
import NuevoCupo from './componentes/cupos/NuevoCupo';

import Horarios from './componentes/horario/Horarios';

import Pedidos from './componentes/pedidos/Pedidos';
import NuevoPedido from './componentes/pedidos/NuevoPedido';
import Login from './componentes/auth/Login';
import Restablecer_contraseña from './componentes/auth/Restablecer_contraseña';
import Restablecer_contraseña1 from './componentes/auth/Restablecer_contraseña1';
import Registrarse from './componentes/auth/Registrarse';
import { CRMProvider } from './context/CRMContext';

function App() {
  return (
    <Router>
      <React.Fragment>
        <CRMProvider>
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main>
              <Switch>
                <Route exact path="/" component={Odontologos} />
                <Route exact path="/odontologos/editar" component={EditarOdontologo} />
                <Route exact path="/odontologos/nuevo" component={NuevoOdontologo} />
                <Route exact path="/sedes" component={Sedes} />
                <Route exact path="/sedes/nuevo" component={NuevaSede} />
                <Route exact path="/sedes/editar/" component={EditarSede} />
                <Route exact path="/horario" component={Horarios} />
                <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
                <Route exact path="/restablecer_contraseña" component={Restablecer_contraseña} />
                <Route exact path="/api/password-reset/:id/:token" component={Restablecer_contraseña1} />
                <Route exact path="/registro" component={Registrarse} />
                <Route exact path="/iniciar-sesion" component={Login} />
                <Route exact path="/cupos" component={Cupos} />
                <Route exact path="/cupos/nuevo" component={NuevoCupo} />
                <Route exact path="/cupos/editar/" component={EditarCupo} />
                /restabler-contraseña
              </Switch>
            </main>
          </div>
        </CRMProvider>
      </React.Fragment>
    </Router>
  )
}

export default App;
