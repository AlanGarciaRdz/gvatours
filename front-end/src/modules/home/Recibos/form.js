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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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


class ReceiptForm extends React.Component{


        constructor(props){
            super(props)
            this.state = {
                Receiptes: [],
                open: true,
                Clientes: [
                    { nombre: 'Agregar Cliente', uuid_cliente: '' },
                    { nombre: 'The Godfather', uuid_cliente: 1972 },
                    { nombre: 'The Godfather: Part II', uuid_cliente: 1974 }
                ],
                val_uuid_cliente: null,
                val_uuid_relation: null,
                data_clientes: [],
                data_agencias: [],
                data_hoteles: [],
            }
    
            this.getReceipts = this.getReceipts.bind(this);
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createReceipt = this.createReceipt.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
        
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

        componentDidMount(){
            
            
        }

        handleClientChange = (uuid_cliente) => {
          // console.log("uuid Client",uuid_cliente)
          this.setState(
            {val_uuid_cliente: uuid_cliente}
            )
        }

      
   

        createReceipt(){
          var {val_uuid_cliente, val_uuid_relation } = this.state
          
          if(val_uuid_cliente === null || val_uuid_relation === null){
            console.error("needs client and relation")
          }else {
            var Receiptdata = 
            {
              "data": {
                  "uuid_cliente": val_uuid_cliente,
                  "fecha_entrada": 1,
                  "fecha_salida": 1,
                  "Total_Venta": 1,
                  "data": {
                      "correo": "agarcia@test.com",
                      "nombre": "alan",
                      "telefono": "3316954455",
                      "direccion": "dato salida"
                  },
                  "relation": {
                      "data": [
                          {
                              "uuid": "123213123123123131",
                              "relation": "cupon"
                          }
                      ]
                  },
                  "created_at": "2020-03-12T06:00:00.000Z",
                  "updated_at": "2020-03-12T06:00:00.000Z",
                  "status": "1"
              }
            }
              

            // console.log(Receiptdata)

            API.post(`/Receipt/`, Receiptdata).then(res => {
      
              try{
                
                // console.log(res.data)
                //this.onAddAgency(res.data.uuid_travelA, res.data.data.nombre, res.data.contacto)
                  
              }catch(error){
                console.error("400 Receipt")
                return "400 Receipt"
              }
          })

          }
          
          

        }


        getReceipts() {
            
            API.get('/Receipt')
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
                      row.uuid_Receipt,
                      row.uuid_Receipt.split('-')[2]+'-'+row.uuid_Receipt.split('-')[3], //FOLIO
                      row.data.fecha_entrada, //Fecha_entrada
                      row.data_travelA.uuid_agencia, //Name travel Agency
                      // this.filterById(data_hoteles, 'uuid_hotel', row.data.uuid_hotel), //HOTEL
                      row.data.uuid_hotel,
                      row.data.Total_Pagado, // PAGADO
                      row.data.Total_Venta //TOTAL
                    )))
                    //)
        
                    this.setState({Receiptes: rowsP});
                    //console.log("Receiptes")
                    console.log(this.state.Receiptes)
                  
                  
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
    const {Clientes, Hoteles , Receiptes} = this.state;

    return (
        <React.Fragment>

          
          <Grid container spacing={1} >

          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Informacion Recibo
             </Typography>
            </Grid>

            <Grid item xs={2}>
              
            </Grid>
          
            <Grid item xs={4}>
             <TextField
                  required
                  id="fecha_recibo"
                  //label="fecha_recibo"
                  type="date"
                  defaultValue={getCurrentDate()}
                  fullWidth
                  autoComplete="fname"
                  textAlign='center'
              />

            </Grid>

          
            
            <Grid item xs={12}>
              <AutoCompleteClient updateClient={this.handleClientChange}/>
            </Grid>
            

            <Grid item xs={12}>

              <TextField
                  label="Concepto"
                  id="Concepto"
                  className={clsx(classes.margin, classes.textField)}
                  type="text"
              />

              <TextField
                    label="CANTIDAD"
                    id="cantidad"
                    className={clsx(classes.margin, classes.textField)}
                    type="number"
                  />

             
            </Grid>

              <Grid item xs={12}>

              <TextField
                  label="CUPON-CONTRATO"
                  id="Reservacion"
                  className={clsx(classes.margin, classes.textField)}
                  type="text"
                />

              </Grid>

              <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Forma pago</InputLabel>
                <Select
                      id="Forma_pago"
                      label="Forma de pago"
                      className={clsx(classes.margin, classes.textField)}
                      // onChange={handleChange}
                    >
                      <MenuItem value={1}>&nbsp;</MenuItem>
                      <MenuItem value={2}>Efectivo</MenuItem>
                      <MenuItem value={3}>Tarjeta Debito</MenuItem>
                      <MenuItem value={4}>Transferencia</MenuItem>
                    </Select>
              </Grid>

              <Grid item xs={12}></Grid>

            </Grid>

            

          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={this.createReceipt} >
              Crear Recibo
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
          {Receiptes.map(row => (
            <TableRow key={row.UUID}>
              <TableCell component="th" scope="row">
                {row.Folio}
              </TableCell>

              
              {/* PDF */}
              <TableCell align="right">
              <Link href={`/Receipt?id=${row.UUID}`} color="inherit">
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
  

export default withStyles(styles)(ReceiptForm);