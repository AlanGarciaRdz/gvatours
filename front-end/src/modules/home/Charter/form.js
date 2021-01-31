import React from 'react';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import {getCurrentDate} from '../../../utils/helpers';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Assignment from '@material-ui/icons/Assignment';
import Create from '@material-ui/icons/Create';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

// https://material-ui.com/components/text-fields/
// search google maps

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
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    datepadding: {
      padding: 10,
    },
    redondo: {
      display: 'none'
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));


class CharterFrom extends React.Component{


        constructor(props){
            super(props)
            this.state = {
                cupones: [],
                open: true,
                Clientes: [
                    { nombre: 'Agregar Cliente', uuid_cliente: '' }
                ],
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
              folio_papeleta: '',
              cliente: '',
              hotel: '',
              fecha_salida: '',
              fecha_regreso: '',
              total_venta: '',
              numero_habitaciones: '',
              SGL: '',
              DBL: '',
              CPL: '',
              redondo: false,
              styleredondo: 'display:block',

              SC: '',
              CC: '',
              JR: '',

              agencia: '',
              ciudad: '',

              observaciones: '',
              confirmadopor: '',
              plancontratado: '',

              adultos: 0,
              sin_cargo: 0,
              con_cargo: 0
            }
    
            this.getCharters = this.getCharters.bind(this);
            
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createCharter = this.createCharter.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
            this.handleHotelChange = this.handleHotelChange.bind(this);
            this.handleAgencyChange = this.handleAgencyChange.bind(this);
            this.seleccionarElemento = this.seleccionarElemento.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
            this.adultos_juniors_minus = this.adultos_juniors_minus.bind(this)
            this.adultos_juniors_plus = this.adultos_juniors_plus.bind(this)
            this.menores_cargo_minus  = this.menores_cargo_minus.bind(this)
            this.menores_cargo_plus = this.menores_cargo_plus.bind(this)
            this.menores_sin_cargo_minus = this.menores_sin_cargo_minus.bind(this)
            this.menores_sin_cargo_plus = this.menores_sin_cargo_plus.bind(this)

            
        
        }

        adultos_juniors_plus() {
          this.setState({ adultos: this.state.adultos + 1 })
        }

        adultos_juniors_minus() {
          if(this.state.adultos > 0){
            this.setState({ adultos: this.state.adultos - 1 })
          }
          
        }

        menores_cargo_minus(){
          if(this.state.con_cargo > 0){
            this.setState({ con_cargo: this.state.con_cargo - 1 })
          }
        }
        menores_cargo_plus(){
          this.setState({ con_cargo: this.state.con_cargo + 1 })
        }

        menores_sin_cargo_minus(){
          if(this.state.sin_cargo > 0){
            this.setState({ sin_cargo: this.state.sin_cargo - 1 })
          }
        }
        menores_sin_cargo_plus(){
          this.setState({ sin_cargo: this.state.sin_cargo + 1 })
        }

        

        handleChange = (evt) => {
          const value = evt.target.value;
          this.setState({
            ...this.state,
            [evt.target.name]: value
          });
        };

        handleChangeCheckbox = (evt) => {
          console.log(evt.target.name)
          const value = evt.target.checked;
          let newstatus = value ? 'display:block' : 'display:none';
          this.setState({
            ...this.state,
            [evt.target.name]: value,
            styleredondo: newstatus
          });
          console.log(newstatus)
          // let newstatus = value ? 'display:block' : 'display:none';
          // console.log(value)
          // this.setState({
          //   ...this.state,
          //   styleredondo: newstatus
          // });
        }

        async filterById(jsonObject, column, id) {
            jsonObject.filter(function(element){
              if (element[column] === id){
                return element.data.nombre
              }
          })
        }

        componentDidMount(){
            
            this.getCharters()
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

        handleAgencyChange = (uuid_agencia, ciudad) => {
           console.log(`uuid Agencia ${uuid_agencia} , ${ciudad}` )
          this.setState({
            val_uuid_agencia: uuid_agencia,
            ciudad: ciudad }
          )
        }

   

        createCharter(){
          var {val_uuid_cliente, val_uuid_hotel, val_uuid_agencia } = this.state
          
          console.log(val_uuid_cliente)
          if(val_uuid_cliente === null || val_uuid_hotel === null || val_uuid_agencia === null){
            console.error("needs client and hotel and agency")
          }else {
            var cupondata = 
            {
                "data": {
                  "uuid_cliente": val_uuid_cliente === undefined ? this.state.cliente_uuid : val_uuid_cliente,
                      "uuid_hotel": val_uuid_hotel === undefined ? this.state.hotel_uuid : val_uuid_hotel,
                      "uuid_agencia": val_uuid_agencia === undefined ? this.state.agencia_uuid : val_uuid_agencia,
                      "folio_papeleta": document.getElementById("folio_papeleta").value,
                  "fecha_salida": document.getElementById("fecha_salida").value,
                  "fecha_regreso": document.getElementById("fecha_regreso").value,
                      "aborda": document.getElementById("aborda").value,
                      "adultos_junios": document.getElementById("sgl-habitaciones").value,
                      "menores_cargo": document.getElementById("dbl-habitaciones").value,
                      "menosres_sincargo": document.getElementById("cpl-habitaciones").value,
                      "ciudad": document.getElementById("ciudad").value,
                      "clave": document.getElementById("clave").value,
                      "OBSERVACIONES": document.getElementById("observaciones").value,
                }
            }

            // console.log(cupondata)

            if(this.state.UUID === ''){
              console.log("cupon")
              API.post(`/Charters/`, cupondata).then(res => {
                try{
                 console.log(res.data)
                 window.location.href =  `/Charter?id=${res.data.uuid_charter}`; 
                  //UUID, Folio, FolioPapeleta, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta
                  // this.addTableData(res.data.uuid_charter, 
                  //                   res.data.uuid_charter.split('-')[2]+'-'+res.data.uuid_charter.split('-')[3],
                  //                   res.data.data.folio,
                  //                   res.data.data.fecha_entrada,
                  //                   res.data.data.fecha_entrada, //Agencia
                  //                   res.data.data.fecha_entrada, //Hotel
                  //                   "0",
                  //                   res.data.data.Total_Venta
                  //                   )
                    
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


        getCharters() {
          console.log("fdas")
            
            API.get('/Charters')
              .then(res => {
                if (res.status === 200) {
                  var  rowsP = []
                  console.log(res.data)
                  rowsP = 
                    res.data.map(row => ( 
                    this.addTableData(
                      row.uuid_charter,
                      row.data.folio_papeleta,
                      row.cliente.nombre,
                      row.data.fecha_salida, 
                      row.travelagency.nombre, 
                      row.hotel.nombre
                    )))
                    
                    this.setState({cupones: rowsP});
                    //console.log("cupones")
                    console.log(this.state.cupones)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, FolioPapeleta, NombreCliente, Fecha_Salida, Agencia, Hotel) {
          
          return {UUID, FolioPapeleta, NombreCliente, Fecha_Salida, Agencia, Hotel };
        }

     


        seleccionarElemento(row){
          

          API.get(`/Cupon/${row.UUID}`)
              .then(res => {
                if (res.status === 200) {
                  
                  res = res.data[0]
                  console.log(row)
                  this.setState({UUID: row.UUID});
                  this.setState({folio_papeleta: res.FolioPapeleta});
                  
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
    const { folio_papeleta ,cliente , cliente_uuid, hotel , hotel_uuid,fecha_regreso ,fecha_salida ,SGL ,DBL ,CPL , redondo, aborda, agencia , ciudad, clave, agencia_uuid,observaciones , cupones, adultos, con_cargo, sin_cargo} = this.state;

    return (
        <React.Fragment>

          <Typography variant="h6" gutterBottom>
            CUPON DE CHARTER TURISTICO
          </Typography>

          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                    required
                    id="folio_papeleta"
                    label="folio_papeleta"
                    type="text"
                    name="folio_papeleta"
                    value={folio_papeleta}
                    onChange={this.handleChange}
                    //defaultValue={getCurrentDate()}
                    fullWidth
                    autoComplete="fname"
                />
            </Grid>

          

          
            <Grid item xs={12} sm={6}>
                <AutoCompleteClient id="clientAuto" value={cliente} uuid={cliente_uuid} edit={true} updateClient={this.handleClientChange}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <AutocompleteHotel value={hotel} uuid={hotel_uuid} updateHotel={this.handleHotelChange}/>
            </Grid> 

            <Grid item xs={12} sm={6}>
            <AutocompleteAgency value={agencia}  name="agencia" uuid={agencia_uuid} updateAgencia={this.handleAgencyChange}/>
              </Grid>
            
            <Grid item xs={12} sm={6}>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={redondo}
                    onChange={this.handleChangeCheckbox}
                    name="redondo"
                    color="primary"
                  />
                }
                label="Redondo"
             />


            <InputLabel className={classes.datepadding}  id="aborda">FECHA DE SALIDA</InputLabel>
            <TextField
                required
                id="fecha_salida"
                value={fecha_salida}
                name="fecha_salida"
                type="date"
                
                onChange={this.handleChange}
                defaultValue={getCurrentDate()}
                fullWidth
                autoComplete="fname"
            />
           
           <div className={this.state.styleredondo}>
            <InputLabel className={classes.datepadding} id="demo-simple-select-label">FECHA DE REGRESO</InputLabel>
              <TextField
                      required
                      
                      id="fecha_regreso"
                      name="fecha_regreso"
                      type="date"
                      value={fecha_regreso}
                      disabled={!redondo}
                      onChange={this.handleChange}
                      //defaultValue={getCurrentDate()}
                      fullWidth
                      autoComplete="fname"
                />

           </div>
          
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
               
                autoFocus
                onChange={this.handleChange}
                margin="dense"
                value={ciudad}
                name="ciudad"
                id="ciudad"
                label="CIUDAD"
                type="text"
                fullWidth
              />

            
            {/* <TextField
                autoFocus
                onChange={this.handleChange}
                margin="dense"
                value={aborda}
                name="aborda"
                id="aborda"
                label="ABORDA Y  HORA"
                type="text"
                fullWidth
              /> */}
             <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>ABORDA Y HORA</InputLabel>
             
              <Select
              autoFocus
                labelId="demo-simple-select-helper-label"
                id="aborda"
                value={aborda}
                onChange={this.handleChange}
                label="ABORDA Y  HORA"
                fullWidth
                >
                <MenuItem value={10}>5:30 am Soriana Rio Nilo a un costado de Banamex (Rio Nilo y Patria)</MenuItem>
                <MenuItem value={20}>6:00 am Plaza Forum sobre Blvd Tlaquepaque</MenuItem>
                <MenuItem value={30}>7:00 am Minerva Frente al Hotel Fiesta Americana Minerva</MenuItem>
                <MenuItem value={30}>7:15 am Central Zapopan en Oxxo y Pollo Pepe</MenuItem>
                
              </Select>

            </Grid>

            

    {/* <Paper component="form" className={classes.root}> */}
    <Grid item xs={13} sm={4}>
      <IconButton className={classes.iconButton}  aria-label="menu">
          <RemoveIcon onClick={this.adultos_juniors_minus}/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="No. adultos y juniors"
          value={adultos}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" className={classes.iconButton}   aria-label="search">
          <AddIcon onClick={this.adultos_juniors_plus }/>
        </IconButton>
        
        </Grid>
        <Grid item xs={13} sm={4}>
        <IconButton className={classes.iconButton}  aria-label="menu">
        <RemoveIcon onClick={this.menores_cargo_minus}/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="No. Menores con cargo"
          value={con_cargo}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <AddIcon onClick={this.menores_cargo_plus}/>
        </IconButton>
        </Grid>
        <Grid item xs={13} sm={4}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <RemoveIcon onClick={this.menores_sin_cargo_minus}/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="No. Menores sin cargo"
          value={sin_cargo}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <AddIcon onClick={this.menores_sin_cargo_plus}/>
        </IconButton>
        </Grid>
   
    {/* </Paper> */}

            <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>INCLUYE</InputLabel>
             
              <Select
              autoFocus
                labelId="demo-simple-select-helper-label"
                id="aborda"
                value={aborda}
                onChange={this.handleChange}
                label="ABORDA Y  HORA"
                fullWidth
                >
                <MenuItem value={10}>INCLUYE DESAYUNO EN RESTAURANT ROSITA EN NVR.</MenuItem>
                <MenuItem value={20}>INCLUYE DESAYUNO EN COCINA PERA EN GDL</MenuItem>
                
              </Select>


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
    

       
              
              
            
              
{/* 
            
            <Grid item xs={12}>
              <TextField
                  // label="Numero de habitaciones"
                  id="sgl-habitaciones"
                  value={SGL}
                  name="No. ADULTOS Y JUNIORS"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">No. ADULTOS Y JUNIORS</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="dbl-habitaciones"
                  value={DBL}
                  name="No. MENORES CON CARGO"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">No. MENORES CON CARGO</InputAdornment>,
                  }}
                  type="number"
                />

                <TextField
                  // label="Numero de habitaciones"
                  id="cpl-habitaciones"
                  value={CPL}
                  name="No. MENORES SIN CARGO"
                  onChange={this.handleChange}
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">No. MENORES SIN CARGO</InputAdornment>,
                  }}
                  type="number"
                />
            </Grid> */}

            

            <Grid item xs={12} sm={6}>
                

            

               {/* <TextField
                autoFocus
                onChange={this.handleChange}
                margin="dense"
                value={clave}
                name="clave"
                id="clave"
                label="clave"
                type="text"
                fullWidth
              /> */}
              
        



            </Grid>

          </Grid>

          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={this.createCharter} >
              Crear/Edit Cupon
            </Button>
          </Grid>
  


          <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Folio Papeleta</TableCell>
            <TableCell>Datos Cliente</TableCell>
            <TableCell>Fecha Salida</TableCell>
            <TableCell>Agencia</TableCell>
            <TableCell>Hotel</TableCell>
            <TableCell>PDF</TableCell>
            <TableCell>Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cupones.map(row => (
            <TableRow key={row.UUID}>
              <TableCell component="th" scope="row">
                {row.FolioPapeleta}
              </TableCell>
              <TableCell>{row.NombreCliente}</TableCell>
              <TableCell>{row.Fecha_Salida}</TableCell>
              <TableCell>{row.Agencia}</TableCell>
              <TableCell>{row.Hotel}</TableCell>
              
              {/* PDF */}
              <TableCell>
              <Link href={`/Charter?id=${row.UUID}`} color="inherit">
                <ListItem button>
                    <Assignment />
                </ListItem>
              </Link>
             </TableCell>
             {/* PDF */}
              {/* Edit */}
              <TableCell>
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
  

export default withStyles(styles)(CharterFrom);