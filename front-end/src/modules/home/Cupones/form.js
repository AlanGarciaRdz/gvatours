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
import Create from '@material-ui/icons/Create';
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


class CuponForm extends React.Component{


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


              UUID: '',
              folio_cupon: '',
              cliente: '',
              hotel: '',
              fecha_entrada: '',
              fecha_salida: '',
              total_venta: '',
              numero_habitaciones: '',
              SGL: '',
              DBL: '',
              CPL: '',

              SC: '',
              CC: '',
              JR: '',

              agencia: '',

              observaciones: '',
              confirmadopor: '',
              plancontratado: '',
            }
    
            this.getCupons = this.getCupons.bind(this);
            this.getClientes_Agencias_Hoteles = this.getClientes_Agencias_Hoteles.bind(this)
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createCupon = this.createCupon.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
            this.handleHotelChange = this.handleHotelChange.bind(this);
            this.handleAgencyChange = this.handleAgencyChange.bind(this);
            this.seleccionarElemento = this.seleccionarElemento.bind(this);
            this.handleChange = this.handleChange.bind(this);

            
        
        }

        handleChange = (evt) => {
          const value = evt.target.value;
          this.setState({
            ...this.state,
            [evt.target.name]: value
          });
        };

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
            
            //this.getClientes_Agencias_Hoteles();
            this.getCupons()
            
        }

        handleClientChange = (uuid_cliente) => {
          console.log("uuid Client",uuid_cliente)
          
            this.setState({
              val_uuid_cliente: uuid_cliente})
              
        }

        handleHotelChange = (uuid_hotel) => {
          // console.log("uuid Hotel",uuid_hotel)
          this.setState({
            val_uuid_hotel: uuid_hotel}
          )
        }

        setHotelValue = (uuid_hotel) => {
          console.log(uuid_hotel)
          
        }

        handleAgencyChange = (uuid_agencia) => {
          // console.log("uuid Agencia",uuid_agencia)
          this.setState({
            val_uuid_agencia: uuid_agencia}
          )
        }

   

        createCupon(){
          var {val_uuid_cliente, val_uuid_hotel, val_uuid_agencia } = this.state
          
          console.log(val_uuid_cliente)
          if(val_uuid_cliente === null || val_uuid_hotel === null || val_uuid_agencia === null){
            console.error("needs client and hotel and agency")
          }else {
            var cupondata = 
            {
              "data": {
                "folio": document.getElementById("folio_cupon").value,
                "uuid_hotel": val_uuid_hotel === undefined ? this.state.hotel_uuid : val_uuid_hotel,
                "uuid_cliente": val_uuid_cliente === undefined ? this.state.cliente_uuid : val_uuid_cliente,
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
                "uuid_agencia": val_uuid_agencia === undefined ? this.state.agencia_uuid : val_uuid_agencia,
                "observaciones": document.getElementById("observaciones").value,
                "confirmadopor": document.getElementById("Confirmadopor").value,
                "plancontratado": document.getElementById("Plancontratado").value,
              }
            }

            // console.log(cupondata)

            if(this.state.UUID === ''){
              console.log("cupon")
              API.post(`/Cupon/`, cupondata).then(res => {
                try{
                 console.log(res.data)
                 window.location.href =  `/Cupon?id=${res.data.uuid_cupon}`; 
                  //UUID, Folio, FolioGVA, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta
                  this.addTableData(res.data.uuid_cupon, 
                                    res.data.uuid_cupon.split('-')[2]+'-'+res.data.uuid_cupon.split('-')[3],
                                    res.data.data.folio,
                                    res.data.data.fecha_entrada,
                                    res.data.data.fecha_entrada, //Agencia
                                    res.data.data.fecha_entrada, //Hotel
                                    "0",
                                    res.data.data.Total_Venta
                                    )
                    
                }catch(error){
                  console.error(error)
                  return "400 Cupon"
                }
              })

            }else{
              console.log(cupondata)
              API.put(`/Cupon/${this.state.UUID}`, cupondata).then(res => {
                try{
                  console.log(res.data)
                    //this.limpiarSTATE()
                }catch(error){
                  console.log(error)
                  console.error("400 NO SE PUDO EDITAR cupon")
                  return "400 NO SE PUDO EDITAR cupon"
                }
              })
            }

            

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
                      row.data.folio,
                      row.data.fecha_entrada, //Fecha_entrada
                      row.travelagency.nombre,//row.data_travelA.uuid_agencia, //Name travel Agency
                      row.hotel.nombre,//row.data.uuid_hotel,
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
        addTableData(UUID, Folio, FolioGVA, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta) {
          // console.log(Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta)
          // Hotel = await this.filterById(data_hoteles, 'uuid_hotel', Hotel)
          // console.log(Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta)
          return {UUID, Folio, FolioGVA, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta };
        }

     


        seleccionarElemento(row){
          

          API.get(`/Cupon/${row.UUID}`)
              .then(res => {
                if (res.status === 200) {
                  
                  res = res.data[0]
                  console.log(row)
                  this.setState({UUID: row.UUID});
                  this.setState({folio_cupon: res.FolioGVA});
                  
                  this.setState({cliente: res.cliente.nombre});
                  this.setState({cliente_uuid: res.data.uuid_cliente});
                  
                  this.setState({hotel: res.hotel.nombre});
                  this.setState({hotel_uuid: res.data.uuid_hotel});

                  
                  this.setState({fecha_entrada: res.data.fecha_entrada});
                  this.setState({fecha_salida: res.data.fecha_salida});
                  this.setState({total_venta: res.data.Total_Venta});
                  this.setState({numero_habitaciones: res.data_rooms.numero_habitaciones});
                  this.setState({SGL: res.data_rooms.adultos.SGL});
                  this.setState({DBL: res.data_rooms.adultos.DBL});
                  this.setState({CPL: res.data_rooms.adultos.CPL});

                  this.setState({SC: res.data_rooms.menores.SC});
                  this.setState({CC: res.data_rooms.menores.CC});
                  this.setState({JR: res.data_rooms.menores.JR});

                  this.setState({agencia: res.travelagency.nombre});
                  this.setState({agencia_uuid: res.data_travelA.uuid_agencia});

                  this.setState({observaciones: res.data_travelA.observaciones});
                  this.setState({confirmadopor: res.data_travelA.confirmadopor});
                  this.setState({plancontratado: res.data_travelA.plancontratado});

                }

              })

        }


        

        limpiarSTATE(){
          this.setState({UUID: ''})
          this.setState({nombre: ''})
          this.setState({telefono: ''})
          this.setState({correo: ''})
          this.setState({ciudad: ''})
          this.setState({direccion: ''})
        }
    

render(){
    const { classes } = this.props;
    const { folio_cupon ,cliente , cliente_uuid, hotel , hotel_uuid,fecha_entrada ,fecha_salida ,total_venta ,numero_habitaciones ,SGL ,DBL ,CPL , SC ,CC ,JR , agencia , agencia_uuid,observaciones ,confirmadopor ,plancontratado , cupones} = this.state;

    return (
        <React.Fragment>

          <Typography variant="h6" gutterBottom>
            Informacion General
          </Typography>

          <Grid container spacing={5}>

            <Grid item xs={12} sm={6}>
              <TextField
                    required
                    id="folio_cupon"
                    label="folio_cupon"
                    type="text"
                    name="folio_cupon"
                    value={folio_cupon}
                    onChange={this.handleChange}
                    //defaultValue={getCurrentDate()}
                    fullWidth
                    autoComplete="fname"
                />
            </Grid>
          </Grid>

          

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <AutoCompleteClient id="clientAuto" value={cliente} uuid={cliente_uuid} edit={true} updateClient={this.handleClientChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AutocompleteHotel value={hotel} uuid={hotel_uuid} updateHotel={this.handleHotelChange}/>
            </Grid> 
            
            <Grid item xs={12} sm={6}>
            <TextField
                required
                id="fecha_entrada"
                value={fecha_entrada}
                name="fecha_entrada"
                type="date"
                onChange={this.handleChange}
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
                    type="date"
                    value={fecha_salida}
                    onChange={this.handleChange}
                    //defaultValue={getCurrentDate()}
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
                onChange={this.handleChange}
                value={total_venta}
                name="total_venta"
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
                onChange={this.handleChange}
                value={numero_habitaciones}
                name="numero_habitaciones"
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
                  value={SGL}
                  name="SGL"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">SGL</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="dbl-habitaciones"
                  value={DBL}
                  name="DBL"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">DBL</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="cpl-habitaciones"
                  value={CPL}
                  name="CPL"
                  onChange={this.handleChange}
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
                  value={SC}
                  name="SC"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">SC</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="cl-habitaciones"
                  value={CC}
                  name="CC"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">CL</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="jr-habitaciones"
                  value={JR}
                  name="JR"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">JR</InputAdornment>,
                  }}
                  type="number"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <AutocompleteAgency value={agencia} 
                name="agencia}"
                uuid={agencia_uuid} updateAgencia={this.handleAgencyChange}/>
                <TextField
                autoFocus
                onChange={this.handleChange}
                margin="dense"
                value={observaciones}
                name="observaciones"
                id="observaciones"
                label="Observaciones"
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                onChange={this.handleChange}
                margin="dense"
                value={confirmadopor}
                name="confirmadopor"
                id="Confirmadopor"
                label="Confirmado por"
                type="text"
                fullWidth
              />
                <TextField
                value={plancontratado}
                name="plancontratado"
                autoFocus
                onChange={this.handleChange}
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
              Crear/Edit Cupon
            </Button>
          </Grid>
  


          <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>FolioSistema</TableCell>
            <TableCell>Folio GVA</TableCell>
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
              <TableCell component="th" scope="row">
                {row.FolioGVA}
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