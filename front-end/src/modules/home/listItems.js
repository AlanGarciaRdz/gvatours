import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Assignment from '@material-ui/icons/Assignment';
import Description from '@material-ui/icons/Description';
import MonetizationOn from '@material-ui/icons/MonetizationOn';


import Link from '@material-ui/core/Link';

import People from '@material-ui/icons/People';
import Face from '@material-ui/icons/Face';
import Explore from '@material-ui/icons/Explore';
import Hotel from '@material-ui/icons/Hotel';






export const mainListItems = (
  <div>
      <Link href="/home"  color="inherit">
        <ListItem button>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
        </ListItem>
    </Link>

    <Link href="/Cupones" color="inherit">
    <ListItem button>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Cupones" />
    </ListItem>
  </Link>
    
  <Link href="/Contratos"  color="inherit">
        <ListItem button>
        <ListItemIcon>
            <Description />
        </ListItemIcon>
        <ListItemText primary="Contratos Transporte" />
        </ListItem>
    </Link>

    <Link href="/Recibos"  color="inherit">
        <ListItem button>
        <ListItemIcon>
            <MonetizationOn />
        </ListItemIcon>
        <ListItemText primary="Recibos" />
        </ListItem>
    </Link>
    
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Administracion</ListSubheader>

    <Link href="/Usuarios"  color="inherit">
      <ListItem button>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
    </Link>

    <Link href="/Clientes"  color="inherit">
      <ListItem button>
        <ListItemIcon>
          <Face />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
    </Link>

    <Link href="/Agencias"  color="inherit">
      <ListItem button>
        <ListItemIcon>
          <Explore />
        </ListItemIcon>
        <ListItemText primary="Agencias" />
      </ListItem>
    </Link>
    
    <Link href="/Hoteles"  color="inherit">
    <ListItem button>
      <ListItemIcon>
        <Hotel />
      </ListItemIcon>
      <ListItemText primary="Hoteles" />
    </ListItem>

    </Link>
    
  </div>
);