import React from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem';
import Create from '@material-ui/icons/Create';

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
                hoteles: [],
                open: true,
                nombreHotel: '',
                direccion: '',
                telefono: '',
                correo_hotel: '',
                destino: '',
                UUID:''
            }

            this.gethotels = this.gethotels.bind(this);
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
            
            this.gethotels();
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

        handleAgencyChange = (uuid_hotel) => {
          // console.log("uuid hotel",uuid_hotel)
          this.setState({
            val_uuid_hotel: uuid_hotel}
          )
        }

        seleccionarElemento(row){

          this.setState({UUID: row.UUID})
          this.setState({nombreHotel: row.nombre})
          this.setState({direccion: row.direccion})
          this.setState({telefono: row.telefono})
          this.setState({correo_hotel: row.correo})
          this.setState({destino: row.contacto})
        }

        limpiarSTATE(){
          this.setState({UUID: ''})
          this.setState({nombreHotel: ''})
          this.setState({direccion: ''})
          this.setState({telefono: ''})
          this.setState({correo_hotel: ''})
          this.setState({destino: ''})
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
                "nombre": document.getElementById("nombreHotel").value,
                "direccion": document.getElementById("direccion").value,
                "telefono": document.getElementById("telefono").value,
                "correo": document.getElementById("correo_hotel").value,
                "destino": document.getElementById("destino").value,
              }
            }

            if(this.state.UUID === ''){
                API.post(`/hotels/`, data).then(res => {
        
                  try{
                    this.gethotels()
                  }catch(error){
                    console.error("400 NO SE PUDO CREAR hotel")
                    return "400 NO SE PUDO CREAR hotel"
                  }
              })
            }else{
                API.put(`/hotels/${this.state.UUID}`, data).then(res => {
                  try{
                      this.gethotels()
                      this.limpiarSTATE()
                  }catch(error){
                    console.error("400 NO SE PUDO EDITAR hotel")
                    return "400 NO SE PUDO EDITAR hotel"
                  }
              })
            }

            if(status === 3){
              API.delete(`/hotels/${this.state.UUID}`, data).then(res => {
                try{
                    this.gethotels()
                    this.limpiarSTATE()
                }catch(error){
                  console.error("400 NO SE PUDO borrar hotel")
                  return "400 NO SE PUDO borrar hotel"
                }
            })
            }
        }


        gethotels() {
          
            API.get('/hotels')
              .then(res => {
                if (res.status === 200) {
                  // console.log(res.data)
                  //Folio, Fecha_Entrada, hotel, Hotel, Pagado, Total_Venta
                  var  rowsP = []
                  // console.log(this.state.data_clientes)
                  console.log(res.data)
                  rowsP = //Promise.all(
                    res.data.map(row => ( 
                    this.addTableData(
                      row.uuid_hotel,
                      row.uuid_hotel.split('-')[2]+'-'+row.uuid_hotel.split('-')[3], //ID
                      row.data.nombre, 
                      row.data.direccion, 
                      row.data.telefono,
                      row.data.correo, 
                      row.data.destino
                    )))

                    this.setState({hoteles: rowsP});
                    console.log(this.state.hoteles)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, HUUID, nombre, direccion, telefono, correo_hotel, destino) {
          return {UUID, HUUID, nombre, direccion, telefono, correo_hotel, destino };
        }

    

render(){
    const { classes } = this.props;
    const {hoteles} = this.state;

    return (
        <React.Fragment>
  

            <Grid item xs={12}>
              <TextField
                  autoFocus
                  margin="dense"
                  id="nombreHotel"
                  label="Nombre del HOTEL"
                  type="text"
                  name="nombreHotel"
                  value={this.state.nombreHotel}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="direccion"
                  label="Direccion"
                  name="direccion"
                  value={this.state.direccion}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                />


                <TextField
                  autoFocus
                  margin="dense"
                  id="telefono"
                  label="Telefono"
                  name="telefono"
                  value={this.state.telefono}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="correo_hotel"
                  label="Correo electronico"
                  name="correo_hotel"
                  value={this.state.correo_hotel}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                  required
                />

              <TextField
                  autoFocus
                  margin="dense"
                  id="destino"
                  label="Destino Turistico"
                  name="destino"
                  value={this.state.destino}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                  required
                />



            </Grid>


          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => this.crear_editar_borrar_elemento(1)} >
              Crear/Editar hotel
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
            <TableCell align="right">direccion</TableCell>
            <TableCell align="right">telefono</TableCell>
            <TableCell align="right">correo_hotel</TableCell>
            <TableCell align="right">destino</TableCell>
            <TableCell align="right">Accion</TableCell>
          </TableRow>

          
        </TableHead>
        <TableBody>
        
          {hoteles.map(row => (
            <TableRow key={row.UUID}>
              <TableCell component="th" scope="row">
                {row.HUUID}
              </TableCell>
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.direccion}</TableCell>
              <TableCell align="right">{row.telefono}</TableCell>
              <TableCell align="right">{row.correo_hotel}</TableCell>
              <TableCell align="right">{row.destino}</TableCell>
              {/* Edit */}
              <TableCell align="right">
                <ListItem button onClick={() => this.seleccionarElemento(row)}>
                    <Create />
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