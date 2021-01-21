import React from 'react';
import { Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import LayoutRoute from './modules/core/SiteLayout';

import Signin from './modules/login/signin';
import Signup from './modules/login/signup';
import Home from './modules/home/Dashboard';

import Cupones from './modules/home/Cupones';
import Cupon from './modules/home/Cupones/CuponDialog';

import Contratos from './modules/home/Contratos';
import Contrato from './modules/home/Contratos/ContratoTransporte';

import Recibos from './modules/home/Recibos';
import Recibo from './modules/home/Recibos/RecibosDialog';


//Admnistracion
import Usuarios   from './modules/admin/Usuarios';
import Clientes   from './modules/admin/Clientes';
import  Agencias  from './modules/admin/Agencias';
import  Hoteles  from './modules/admin/Hoteles';




import NotFound from './modules/components/NotFoundPage';

const browserHistory = createBrowserHistory();

export const Routes = () => (
    <Router basename={ `/` } history={ browserHistory }>
        <Switch>
            {/* HOME */ }
            <LayoutRoute exact path={ `/` } component={ Signin } />
            <LayoutRoute exact path={ `/Login` } component={ Signin } />
            <LayoutRoute exact path={ `/Registro` } component={ Signup } />
            <LayoutRoute exact path={ `/Home` } component={ Home } />

            <LayoutRoute exact path={ `/Cupones` } component={ Cupones } />
            <LayoutRoute exact path={ `/Cupon` } component={ Cupon } />

            <LayoutRoute exact path={ `/Contratos` } component={ Contratos } />
            <LayoutRoute exact path={ `/Contrato` } component={ Contrato } />
            


            <LayoutRoute exact path={ `/Recibos` } component={ Recibos } />
            <LayoutRoute exact path={ `/Recibo`} component={ Recibo } />

            <LayoutRoute exact path={ `/Usuarios` } component={ Usuarios } />
            <LayoutRoute exact path={ `/Clientes` } component={ Clientes } />
            <LayoutRoute exact path={ `/Agencias` } component={ Agencias } />
            <LayoutRoute exact path={ `/Hoteles` } component={ Hoteles } />


            
            
            
            {/* NOT FOUND */ }
            <LayoutRoute exact path="*" component={ NotFound } />
        </Switch>
    </Router>
);
