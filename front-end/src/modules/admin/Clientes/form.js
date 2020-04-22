import React from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem';
import Assignment from '@material-ui/icons/Assignment';

import API from "../../../utils/API";

import { TableContainer, Table,TableHead,TableRow,TableCell,TableBody, Paper  } 
from '@material-ui/core';



const styles = (theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


class CuponForm extends React.Component{


        constructor(props){
            super(props)
            this.state = {
                clientes: [],
                open: true,
                nombre: '', 
                telefono: '', 
                correo: '',
                ciudad: '', 
                direccion: '',
                UUID:''
            }

            this.getClients = this.getClients.bind(this);
            this.addTableData = this.addTableData.bind(this);
            
            this.crear_editar_borrar_elemento = this.crear_editar_borrar_elemento.bind(this);
            this.limpiarSTATE = this.limpiarSTATE.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
            this.handleHotelChange = this.handleHotelChange.bind(this);
            this.handleAgencyChange = this.handleAgencyChange.bind(this);

            this.seleccionarElemento = this.seleccionarElemento.bind(this);   
            this.handleChange = this.handleChange.bind(this);         
        
        }

      
        componentDidMount(){
            
            this.getClients();
        }

        handleClientChange = (uuid_cliente) => {
          // console.log("uuid Client",uuid_cliente)
          this.setState({
            val_uuid_cliente: uuid_cliente})
        }

        handleHotelChange = (uuid_hotel) => {
          // console.log("uuid Hotel",uuid_hotel)
          this.setState({
            val_uuid_hotel: uuid_hotel}
          )
        }

        handleAgencyChange = (uuid_cliente) => {
          // console.log("uuid cliente",uuid_cliente)
          this.setState({
            val_uuid_cliente: uuid_cliente}
          )
        }

        seleccionarElemento(row){
          
          this.setState({UUID: row.UUID})
          this.setState({nombre: row.nombre})
          this.setState({telefono: row.telefono})
          this.setState({correo: row.correo})
          this.setState({ciudad: row.ciudad})
          this.setState({direccion: row.direccion})
        }

        limpiarSTATE(){
          this.setState({UUID: ''})
          this.setState({nombre: ''})
          this.setState({telefono: ''})
          this.setState({correo: ''})
          this.setState({ciudad: ''})
          this.setState({direccion: ''})
        }

        handleChange = (evt) => {
          const value = evt.target.value;
          this.setState({
            ...this.state,
            [evt.target.name]: value
          });
        };
   

        crear_editar_borrar_elemento(status){ 

          
            var data = 
            {
              "data": {
                "nombre": document.getElementById("nombre").value,
                "telefono": document.getElementById("telefono").value,
                "correo": document.getElementById("correo").value,
                "ciudad": document.getElementById("ciudad").value,
                "direccion": document.getElementById("direccion").value,
              }
            }

            if(this.state.UUID === ''){
                API.post(`/Clients/`, data).then(res => {
        
                  try{
                    this.getClients()
                  }catch(error){
                    console.error("400 NO SE PUDO CREAR cliente")
                    return "400 NO SE PUDO CREAR cliente"
                  }
              })
            }else{
                API.put(`/Clients/${this.state.UUID}`, data).then(res => {
                  try{
                      this.getClients()
                      this.limpiarSTATE()
                  }catch(error){
                    console.error("400 NO SE PUDO EDITAR cliente")
                    return "400 NO SE PUDO EDITAR cliente"
                  }
              })
            }

            if(status === 3){
              API.delete(`/Clients/${this.state.UUID}`, data).then(res => {
                try{
                    this.getClients()
                    this.limpiarSTATE()
                }catch(error){
                  console.error("400 NO SE PUDO borrar cliente")
                  return "400 NO SE PUDO borrar cliente"
                }
            })
            }
        }


        getClients() {
          
            API.get('/Clients')
              .then(res => {
                if (res.status === 200) {
                  // console.log(res.data)
                  //Folio, Fecha_Entrada, cliente, Hotel, Pagado, Total_Venta
                  var  rowsP = []
                  // console.log(this.state.data_clientes)
                  console.log(res.data)
                  rowsP = //Promise.all(
                    res.data.map(row => ( 
                    this.addTableData(
                      row.uuid_client,
                      row.uuid_client.split('-')[2]+'-'+row.uuid_client.split('-')[3], //ID
                      row.data.nombre, 
                      row.data.telefono, 
                      row.data.correo,
                      row.data.ciudad, 
                      row.data.direccion
                    )))
                    this.setState({clientes: rowsP});
                    console.log(this.state.clientes)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, HUUID, nombre, telefono, correo, ciudad, direccion) {
          return {UUID, HUUID, nombre, telefono, correo, ciudad, direccion };
        }

    

render(){
    const { classes } = this.props;
    const {clientes} = this.state;

    return (
        <React.Fragment>
  

            <Grid item xs={12}>
            
          
              <TextField
                  autoFocus
                  margin="dense"
                  id="nombre"
                  label="Nombre del cliente"
                  type="text"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                
          
                <TextField
                  autoFocus
                  margin="dense"
                  id="telefono"
                  label="Telefono del Cliente"
                  type="text"
                  name="telefono"
                  value={this.state.telefono}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                
          
                  <TextField
                  autoFocus
                  margin="dense"
                  id="correo"
                  label="Correo electronico"
                  name="correo"
                  value={this.state.correo}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                  required
                />



                <TextField
                  autoFocus
                  margin="dense"
                  id="ciudad"
                  label="Ciudad"
                  name="ciudad"
                  value={this.state.ciudad}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                />


                  <TextField
                  autoFocus
                  margin="dense"
                  id="direccion"
                  label="direccion"
                  name="direccion"
                  value={this.state.direccion}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                />



            </Grid>


          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => this.crear_editar_borrar_elemento(1)} >
              Crear/Editar cliente
            </Button>
            <Button variant="contained" color="error" href="#contained-buttons" onClick={() => this.crear_editar_borrar_elemento(3)} >
              Eliminar
            </Button>
          </Grid>
  
          <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Contacto</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Ciudad</TableCell>
            <TableCell align="right">Telefono</TableCell>
            <TableCell align="right">Accion</TableCell>
          </TableRow>

          
        </TableHead>
        <TableBody>
          {clientes.map(row => (
            <TableRow key={row.UUID}>
              <TableCell component="th" scope="row">
                {row.HUUID}
              </TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.contacto}</TableCell>
              <TableCell align="right">{row.correo}</TableCell>
              <TableCell align="right">{row.ciudad}</TableCell>
              <TableCell align="right">{row.telefono}</TableCell>
              {/* Edit */}
              <TableCell align="right">
                <ListItem button onClick={() => this.seleccionarElemento(row)}>
                    <Assignment />
                </ListItem>
             </TableCell>
             {/* Edit */}            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
      );
    
}

    }
  

export default withStyles(styles)(CuponForm);