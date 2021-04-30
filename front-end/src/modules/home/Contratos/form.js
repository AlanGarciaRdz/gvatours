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
                folio_contrato: "",
                cliente: "",
                
                Contratos: [],
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
    
            /* new*/

            this.handleChangeName = this.handleChangeName.bind(this);
            /* end */
            this.getContratos = this.getContratos.bind(this);
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createContrato = this.createContrato.bind(this);

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


        

        componentDidMount(){ 
            
            this.getContratos();
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

        handleChangeName = (evt) => {
          this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
          },() => {
            this.getContratos()
          });
          
        }

   

        createContrato(){
          var {val_uuid_cliente, val_uuid_hotel, val_uuid_agencia } = this.state
          // console.log(val_uuid_cliente, val_uuid_hotel, val_uuid_agencia)

          if(val_uuid_cliente === null || val_uuid_hotel === null || val_uuid_agencia === null){
            console.error("needs client and hotel and agency")
          }else {
            var contratodata =
            {
              "data": {
                "uuid_cliente": "66729699-c796-4cdb-879b-86cc0ad4b61b",
                "uuid_hotel": "",
                "destino": "Puerto Vallarta",
                "fecha_salida": "23-04-2020",
                "hora_salida": "20:50",
                "hora_presentarse": "20:45",
                "direccion_salida": "avenida siempre viva 1390",
                "entre_calles": "circunvalacion y calle de los fresnos",
                "colonia_ciudad": "Fresno, Guadalajara",
                "punto_referencia": "7eleven",
                "movimientos": true,
                "itinerario": "Salida 20:50 de avenida siempre viva 1390 con destino a Puerto Vallarta con Movimientos",
                "fecha_regreso": "28-04-2020",
                "hora_regreso": "23:00",
                "importe_total": "$15,000",
                "anticipo": "$1,000",
                "saldo": "$14,000",
                "uuid_receipts": []
              },
              "data_vehicle": {
                "tipo_unidad": "Sprinter",
                "capacidad": "20",
                "Equipada": ["AIRE ACONDICIONADO","STEREO", "TV/DVD", "SEGURO VIAJERO"]
              }
              
            }

            // console.log(contratodata)

            API.post(`/TransportC/`, contratodata).then(res => {
      
              try{
                
                // console.log(res.data)
                //this.onAddAgency(res.data.uuid_travelA, res.data.data.nombre, res.data.contacto)
                  
              }catch(error){
                console.error("400 Contrato")
                return "400 Contrato"
              }
          })

          }
          
          

        }


        getContratos() {
            
          const url = this.state.folio_contrato == '' ? '/TransportC' : `/TransportC/filter/${ this.state.folio_contrato }`
           debugger;
           API.get('/TransportC')
              .then(res => {
                if (res.status === 200) {
                  
                  var  rowsP = []

                  res.data.map(row => {
                    console.log(row)
                  })
                  

                  //TODO
                      rowsP = 
                        res.data.map(row => (                          
                          this.addTableData(
                            row.uuid_contract, //UUID
                            row.uuid_contract.split('-')[2]+'-'+row.uuid_contract.split('-')[3], //FOLIO
                            row.data.uuid_cliente, //Cliente
                            row.data.uuid_agencia,
                            row.data.destino,
                            row.data.anticipo,
                            row.data.importe_total,
                            row.status
                          )
                        ))
            
                        this.setState({Contratos: rowsP});
                    
                    //console.log(this.state.Contratos)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }

        addTableData(UUID, Folio, uuid_cliente, uuid_agencia, destino, anticipo, importe_total, status) {
          return {UUID, Folio, uuid_cliente, uuid_agencia, destino, anticipo, importe_total, status};
        }

    

render(){
    const { classes } = this.props;
    const {Clientes, Hoteles , Contratos} = this.state;

    const { folio_contrato, cliente, hotel, hotel_uuid } = this.state;

    return (
        <React.Fragment>

          <Typography variant="h6" gutterBottom>
            CONTRATO TURISMO
          </Typography>

          

          <Grid container spacing={3}>
            <Grid item  sm={9}>
              <TextField  required   id="folio_contrato"   label="folio_contrato"
                    type="text"  name="folio_contrato"   value={folio_contrato}     onChange={this.handleChangeName}
                    fullWidth autoComplete="fname"
              />

              <TextField
                 onChange={this.handleChange}  value={cliente}  name="cliente"
                id="cliente" label="CLIENTE"   type="text" margin="dense" fullWidth
              />

              <AutocompleteHotel value={hotel? hotel : ""} uuid={hotel_uuid} updateHotel={this.handleHotelChange}/>

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
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={this.createContrato} >
              Crear Contrato
            </Button>
          </Grid>
  
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Contrato</TableCell>
                  <TableCell align="right">PDF</TableCell>
                  <TableCell align="right">cliente</TableCell>
                  <TableCell align="right">Agencia</TableCell>
                  <TableCell align="right">Destino</TableCell>
                  <TableCell align="right">anticipo</TableCell>
                  <TableCell align="right">Importe Total</TableCell>
                  <TableCell align="right">Estatus</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Contratos.map(row => (
                  <TableRow key={row.UUID}>
                    <TableCell component="th" scope="row">
                      {row.Folio}
                    </TableCell>

                    
                    {/* PDF */}
                    <TableCell align="right">
                    <Link href={`/Contrato?id=${row.UUID}`} color="inherit">
                      <ListItem button>
                          <Assignment />
                      </ListItem>
                    </Link>
                  </TableCell>
                  {/* PDF */}
                    <TableCell align="right">{row.uuid_cliente}</TableCell>
                    <TableCell align="right">{row.uuid_agencia}</TableCell>
                    <TableCell align="right">{row.destino}</TableCell>
                    <TableCell align="right">{row.anticipo}</TableCell>
                    <TableCell align="right">{row.importe_total}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    
                    
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