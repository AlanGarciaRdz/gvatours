import React from 'react';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import {getCurrentDate} from '../../../utils/helpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/Icon';

import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Assignment from '@material-ui/icons/Assignment';
import ListItemText from '@material-ui/core/ListItemText';

import AutocompleteHotel from '../../core/AutocompleteHotel';
import AutocompleteAgency from '../../core/AutocompleteAgency';
import AutoCompleteClient from '../../core/AutoCompleteClient';

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


class ContratosForm extends React.Component{


        constructor(props){
            super(props)
            this.state = {
                cupones: [],
                open: true,
                Clientes: [
                    { nombre: 'Agregar Cliente', uuid_cliente: '' },
                    { nombre: 'The Godfather', uuid_cliente: 1972 },
                    { nombre: 'The Godfather: Part II', uuid_cliente: 1974 }],
                Hoteles: [
                    { nombre: 'Agregar Hotel', uuid_hotel: '' }
                ],
                val_uuid_cliente: null,
                val_uuid_hotel: null,
                val_uuid_agencia: null,
                data_clientes: [],
                data_agencias: [],
                data_hoteles: [],
            }
    
            this.getCupons = this.getCupons.bind(this);
            this.getClientes_Agencias_Hoteles = this.getClientes_Agencias_Hoteles.bind(this)
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createCupon = this.createCupon.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
            this.handleHotelChange = this.handleHotelChange.bind(this);
            this.handleAgencyChange = this.handleAgencyChange.bind(this);

            
        
        }

        async filterById(jsonObject, column, id) {
          // return new Promise(function(resolve, reject) {
            jsonObject.filter(function(element){
              // console.log(element[column])
              // console.log("id"+id)
              if (element[column] === id){
                // console.log(element.data.nombre)
                return element.data.nombre
                // resolve(element.data.nombre);
                // return element[column].data.nombre
              }
          // })
          })
        }


        getClientes_Agencias_Hoteles(){
          

          API.get('/clients')
              .then(res => {
                if (res.status === 200) {
                    this.setState({data_clientes: res.data})
                    API.get('/Hotels')
                    .then(res => {
                      if (res.status === 200) {
                          this.setState({data_hoteles: res.data})
                          API.get('/TravelA')
                          .then(res => {
                            if (res.status === 200) {
                                this.setState({data_agencias: res.data})
                                this.getCupons()
                            }
                          })
                      }
                    })
                }
              })
        }

        componentDidMount(){
            
            this.getClientes_Agencias_Hoteles();
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

        handleAgencyChange = (uuid_agencia) => {
          // console.log("uuid Agencia",uuid_agencia)
          this.setState({
            val_uuid_agencia: uuid_agencia}
          )
        }

   

        createCupon(){
          var {val_uuid_cliente, val_uuid_hotel, val_uuid_agencia } = this.state
          // console.log(val_uuid_cliente, val_uuid_hotel, val_uuid_agencia)

          if(val_uuid_cliente === null || val_uuid_hotel === null || val_uuid_agencia === null){
            console.error("needs client and hotel and agency")
          }else {
            var cupondata = 
            {
              "data": {
                "uuid_hotel": val_uuid_hotel,
                "uuid_cliente": val_uuid_cliente,
                "fecha_entrada": document.getElementById("fecha_entrada").value,
                "fecha_salida": document.getElementById("fecha_salida").value,
                "Total_Venta": document.getElementById("total_venta").value
              },
              "data_rooms": {
                "numero_habitaciones": document.getElementById("numero-habitaciones").value,
                "adultos": {
                  "SGL": document.getElementById("sgl-habitaciones").value,
                  "DBL": document.getElementById("dbl-habitaciones").value,
                  "CPL": document.getElementById("cpl-habitaciones").value
                  },
                "menores": {
                  "SC": document.getElementById("sc-habitaciones").value,
                  "CC": document.getElementById("cl-habitaciones").value,
                  "JR": document.getElementById("jr-habitaciones").value
                  }
              },
              "data_travelA": {
                "uuid_agencia": val_uuid_agencia,
                "observaciones": document.getElementById("observaciones").value,
                "confirmadopor": document.getElementById("Confirmadopor").value,
                "plancontratado": document.getElementById("Plancontratado").value,
              }
            }

            // console.log(cupondata)

            API.post(`/Cupon/`, cupondata).then(res => {
      
              try{
                
                // console.log(res.data)
                //this.onAddAgency(res.data.uuid_travelA, res.data.data.nombre, res.data.contacto)
                  
              }catch(error){
                console.error("400 Cupon")
                return "400 Cupon"
              }
          })

          }
          
          

        }


        getCupons() {
            
            API.get('/Cupon')
              .then(res => {
                if (res.status === 200) {
                  // console.log(res.data)
                  //Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta
                  var  rowsP = []
                  // console.log(this.state.data_clientes)
                  console.log(res.data)
                  rowsP = //Promise.all(
                    res.data.map(row => ( 
                    this.addTableData(
                      row.uuid_cupon,
                      row.uuid_cupon.split('-')[2]+'-'+row.uuid_cupon.split('-')[3], //FOLIO
                      row.data.fecha_entrada, //Fecha_entrada
                      row.data_travelA.uuid_agencia, //Name travel Agency
                      // this.filterById(data_hoteles, 'uuid_hotel', row.data.uuid_hotel), //HOTEL
                      row.data.uuid_hotel,
                      row.data.Total_Pagado, // PAGADO
                      row.data.Total_Venta //TOTAL
                    )))
                    //)
        
                    this.setState({cupones: rowsP});
                    //console.log("cupones")
                    console.log(this.state.cupones)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta) {
          // console.log(Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta)
          // Hotel = await this.filterById(data_hoteles, 'uuid_hotel', Hotel)
          // console.log(Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta)
          return {UUID, Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta };
        }

    

render(){
    const { classes } = this.props;
    const {Clientes, Hoteles , cupones} = this.state;

    return (
        <React.Fragment>

          <Typography variant="h6" gutterBottom>
            Informacion General
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <AutoCompleteClient updateClient={this.handleClientChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AutocompleteHotel updateHotel={this.handleHotelChange}/>
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="fecha_entrada"
                label="fecha_entrada"
                type="date"
                defaultValue={getCurrentDate()}
                fullWidth
                autoComplete="fname"
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="fecha_salida"
                    name="fecha_salida"
                    label="Fecha Salida"
                    type="date"
                    defaultValue={getCurrentDate()}
                    fullWidth
                    autoComplete="fname"
                />
            </Grid>

            <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                TOTAL VENTA
            </Typography>
            <TextField
                label="TOTAL VENTA"
                id="total_venta"
                className={clsx(classes.margin, classes.textField)}
                type="number"
              />
            </Grid>

            
            <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                Habitaciones
            </Typography>
            <TextField
                label="Numero de habitaciones"
                id="numero-habitaciones"
                className={clsx(classes.margin, classes.textField)}
                // InputProps={{
                //   startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
                // }}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7" gutterBottom>
                  Ocupacion
              </Typography>
              <TextField
                  // label="Numero de habitaciones"
                  id="sgl-habitaciones"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">SGL</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="dbl-habitaciones"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">DBL</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="cpl-habitaciones"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">CPL</InputAdornment>,
                  }}
                  type="number"
                />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h7" gutterBottom>
                  Menores
              </Typography>
              <TextField
                  // label="Numero de habitaciones"
                  id="sc-habitaciones"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">SC</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="cl-habitaciones"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">CL</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="jr-habitaciones"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">JR</InputAdornment>,
                  }}
                  type="number"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <AutocompleteAgency updateAgencia={this.handleAgencyChange}/>
                <TextField
                autoFocus
                margin="dense"
                id="observaciones"
                label="Observaciones"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="Confirmadopor"
                label="Confirmado por"
                type="text"
                fullWidth
              />
                <TextField
                autoFocus
                margin="dense"
                id="Plancontratado"
                label="Plan Contratado"
                type="text"
                fullWidth
              />



            </Grid>

          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={this.createCupon} >
              Crear Cupon
            </Button>
          </Grid>
  


          <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Folio</TableCell>
            <TableCell align="right">PDF</TableCell>
            <TableCell align="right">Fecha_Entrada</TableCell>
            <TableCell align="right">Agencia</TableCell>
            <TableCell align="right">Hotel</TableCell>
            <TableCell align="right">Total_Venta</TableCell>
            <TableCell align="right">Pagado</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cupones.map(row => (
            <TableRow key={row.UUID}>
              <TableCell component="th" scope="row">
                {row.Folio}
              </TableCell>

              
              {/* PDF */}
              <TableCell align="right">
              <Link href={`/Cupon?id=${row.UUID}`} color="inherit">
                <ListItem button>
                    <Assignment />
                </ListItem>
              </Link>
             </TableCell>
             {/* PDF */}
              <TableCell align="right">{row.Fecha_Entrada}</TableCell>
              <TableCell align="right">{row.Agencia}</TableCell>
              <TableCell align="right">{row.Hotel}</TableCell>
              <TableCell align="right">{row.Total_Venta}</TableCell>
              <TableCell align="right">{row.Pagado}</TableCell>
              
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
      );
    
}

    }
  

export default withStyles(styles)(ContratosForm);