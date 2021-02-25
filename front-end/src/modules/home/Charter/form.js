import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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
import moment from 'moment'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import Alert from '@material-ui/lab/Alert';






import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import AutocompleteHotel from '../../core/AutocompleteHotel';
import AutocompleteAgency from '../../core/AutocompleteAgency';
import AutoCompleteClient from '../../core/AutoCompleteClient';
import AutocompleteSelect from '../../core/AutocompleteSelect';

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
                charters: [],
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
                val_uuid_usuario: localStorage.getItem("4055bf1e") + '',
                data_clientes: [],
                data_agencias: [],
                data_hoteles: [],


              UUID: '',
              cliente: '',
              hotel: '',
              hotel_destino: '',
              fecha_salida: new Date(),
              fecha_regreso: '',
              total_venta: '',
              numero_habitaciones: '',
              SGL: '',
              DBL: '',
              CPL: '',
              //redondo: false,
              styleredondo: 'display:block',

              folio_papeleta: localStorage.getItem("63dd46ba") + ' ',

              agencia: '',
              ciudad: '',
              agente: '',
              errorAlert: null,


              observaciones: '',
              confirmadopor: '',
              plancontratado: '',

              adultos: 0,
              sin_cargo: 0,
              con_cargo: 0,


              //Pagination
              datatables: {
                length: 0,
                rowsPerPage: 5,
                page: 0
              }
              
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
            this.EliminarCharter = this.EliminarCharter.bind(this);
            this.handleChangePage = this.handleChangePage.bind(this);
            this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

            this.setStartDate = this.setStartDate.bind(this);

            
        
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
          console.log(value)
          console.log(evt.target.name)
          this.setState({
            ...this.state,
            [evt.target.name]: value
          });
        };

        handleChangeFolio = (evt) => {
          const value = evt.target.value;
          console.log(value)
          this.setState({
            ...this.state,
            [evt.target.name]: value
          },() => {
            this.getCharters()
          });
          
        }

        handleChangeSelect = (evt) => {
          
          // console.log(evt)
          
        }

        handleChangeDate = (evt) => {
          var meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
           "Julio", "Agosto", "Sept", "Oct", "Nov", "Dic" ];
           //2021-02-18
          let fecha = moment(evt.target.value).day();
          fecha += ` - ${meses[moment(evt.target.value).month()]}`;
          fecha += ` - ${moment(evt.target.value).year()}`;
          console.log(fecha)
          
          console.log(evt.target.name)
          this.setState({
            ...this.state,
            [evt.target.name]: fecha
          });
        };

        setStartDate(evt){
          console.log(`dateee ${evt}`)
          let fecha = evt

          this.setState({
            ...this.state,
            fecha_salida: fecha
          });
        }

        setEndDate(evt){
          let fecha = evt

          this.setState({
            ...this.state,
            fecha_regreso: fecha
          });
        }

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
          if(!localStorage.getItem("63dd46ba")){
            window.location.href = '/'
          }
            this.getCharters()
        }

        handleClientChange = (uuid_cliente) => {
          console.log("uuid Client",uuid_cliente)
          
            this.setState({
              val_uuid_cliente: uuid_cliente})
              
        }

        handleChangePage = (event, newPage) => {
          const { datatables } = this.state;
          const newState = { ...datatables };
          newState.page = newPage;
          this.setState({datatables: newState})
        }

        handleChangeRowsPerPage = (event) => {
          const { datatables } = this.state;
          const newState = { ...datatables };
          newState.rowsPerPage =  parseInt(event.target.value, 10)
          newState.page = 0;

          this.setState({datatables: newState})

        }

        handleHotelChange = (uuid_hotel, name_hotel, destino) => {
          console.log(`uuid Hotel ${uuid_hotel} , ${name_hotel} , ${destino}`)
          this.setState({
            val_uuid_hotel: uuid_hotel,
            hotel: name_hotel,
            hotel_destino: destino}
          )
        }

        setHotelValue = (uuid_hotel) => {
          console.log(uuid_hotel)
          
        }

        handleAgencyChange = (uuid_agencia, ciudad, nombre_agencia) => {
           console.log(`uuid Agencia ${uuid_agencia} , ${ciudad} , ${nombre_agencia}` )
          this.setState({
            val_uuid_agencia: uuid_agencia,
            ciudad: ciudad,
            agencia: nombre_agencia }
          )

          console.log(this.state.nombre_agencia)
        }

        updateItem = (item, name) => {
        
         this.setState({name: item})
        console.log(name, item)
        
       }

      
   

        createCharter = async () => {
          var {DB_cliente, cliente, aborda, redondo, incluye, val_uuid_cliente, val_uuid_hotel, val_uuid_agencia, val_uuid_usuario, agencia, hotel } = this.state
          if(val_uuid_cliente === null){ //NEW CHARTER and ADD NEW CLIENT
            
            await API.post(`/clients/`, {
              "data": { "nombre": cliente  }
            }).then(cl => {
              val_uuid_cliente = cl.data.uuid_client
              console.log(`new client ${val_uuid_cliente}`)
            })
          }else{
            if(cliente !== DB_cliente){  //UPDATE CLIENT DATA
              await API.put(`/clients/${val_uuid_cliente}`, {
                "data": { "nombre": cliente  }
              }).then(cl => {
                val_uuid_cliente = cl.data.uuid_client
                console.log(`updated client ${val_uuid_cliente}`)
              })
            }
          }
          
          if(val_uuid_hotel === null || val_uuid_agencia === null){
            console.error("needs client and hotel and agency")
          }else {
            var cupondata = 
            {
                "data": {
                  "folio_papeleta": document.getElementById("folio_papeleta").value,
                  "uuid_cliente": val_uuid_cliente === undefined ? this.state.cliente_uuid : val_uuid_cliente,
                  "uuid_hotel": val_uuid_hotel === undefined ? this.state.hotel_uuid : val_uuid_hotel,
                  "uuid_agencia": val_uuid_agencia === undefined ? this.state.agencia_uuid : val_uuid_agencia,
                  "uuid_usuario": val_uuid_usuario === undefined ? 'default' : val_uuid_usuario,
                  "ciudad": document.getElementById("ciudad").value,
                  "agente": document.getElementById("agente").value,
                  "redondo": redondo ? document.getElementById("redondo").innerHTML : '',
                  "fecha_salida": document.getElementById("fecha_salida").value,
                  "fecha_regreso": document.getElementById("fecha_regreso").value,
                  "aborda": aborda ? document.getElementById("aborda").innerHTML : '',
                  "adultos_juniors": document.getElementById("adultos_juniors").value,
                  "menores_cargo": document.getElementById("menores_cargo").value,
                  "menores_sin_cargo": document.getElementById("menores_sin_cargo").value,
                  
                  "clave": document.getElementById("folio_papeleta").value,
                  "incluye": incluye ? document.getElementById("incluye").innerHTML : '',
                  "OBSERVACIONES": document.getElementById("observaciones").value,
                }
            }

            console.log(cupondata)
           

            if(this.state.UUID === ''){ //IF ITS A NEW CHARTER CUPON
              API.post(`/Charters/`, cupondata).then(res => {
                try{
                window.location.href =  `/Charter?id=${res.data.uuid_charter}`; 
                let row = 
                 this.addTableData(
                  res.data.uuid_charter,
                  res.data.data.folio_papeleta,
                  cliente,
                  cupondata.data.fecha_salida, 
                  agencia, 
                  hotel
                )

                
                let items = this.state.charters
                items.unshift(row)
                
                this.setState({charters: items});
                //addTableData(UUID, FolioPapeleta, NombreCliente, Fecha_Salida, Agencia, Hotel) {

                
                }catch(error){
                  // this.setState({alerta: "REPETIDO"})
                  return "400 Cupon"
                }
              }).catch(error => {
                
                this.setState({errorAlert: error.response.data});
                console.log(error.response.data)
              })

            }else{
              API.put(`/Charters/${this.state.UUID}`, cupondata).then(res => {
                try{
                  window.location.href =  `/Charter?id=${res.data.uuid_charter}`; 
                  // this.limpiarSTATE()
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
          
            
            //API.get('/Charters')
            console.log(this.state.folio_papeleta)
            
            API.get(`/Charters/filter/${ this.state.folio_papeleta }`)
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
                    
                    this.setState({charters: rowsP});
                    const { datatables } = this.state;
                    const newState = { ...datatables };
                    
                    //---
                    // datatables: {
                    //   length: 0,
                    //   rowsPerPage: 0,
                    //   page: 0
                    // }

                    newState.length = res.data.length;
                    

                    this.setState({ datatables: newState });
                    console.log(newState)
                    
              
                    
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, FolioPapeleta, NombreCliente, Fecha_Salida, Agencia, Hotel) {
          
          return {UUID, FolioPapeleta, NombreCliente, Fecha_Salida, Agencia, Hotel };
        }

     
        EliminarCharter(){
          API.delete(`/charters/${this.state.UUID}`)
              .then(res => {
                if (res.status === 200) {
                  // alert("deleted")
                  this.limpiarSTATE()
                }
              })
        }


        seleccionarElemento(row){
          this.setState({errorAlert: null})
          

          API.get(`/charters/${row.UUID}`)
              .then(res => {
                if (res.status === 200) {
                  //EDICION
                  res = res.data[0]
                  console.log(res)
                  this.setState({UUID: row.UUID});
                  this.setState({folio_papeleta: row.FolioPapeleta});
                  
                  this.setState({cliente: res.cliente.nombre});
                  this.setState({DB_cliente: res.cliente.nombre});
                  this.setState({cliente_uuid: res.data.uuid_cliente});
                  this.setState({val_uuid_cliente: res.data.uuid_cliente})
                  
                  this.setState({hotel: res.hotel.nombre});
                  this.setState({hotel_destino: res.hotel.destino});
                  this.setState({hotel_uuid: res.data.uuid_hotel});
                  this.setState({val_uuid_hotel: res.data.uuid_hotel});
                  
                  console.log(res.data.fecha_salida)
                  
                  this.setState({fecha_salida: new Date(res.data.fecha_salida)});
                  this.setState({fecha_regreso: res.data.fecha_regreso !== "" ? new Date(res.data.fecha_regreso) : '' });
                  
                  this.setState({redondo:res.data.redondo})
                  console.log(res.data.redondo)

                  this.setState({aborda: res.data.aborda})
                  

                  this.setState({total_venta: res.data.Total_Venta});

                  this.setState({adultos: res.data.adultos_juniors});
                  this.setState({sin_cargo: res.data.menores_sin_cargo});
                  this.setState({con_cargo: res.data.menores_cargo});

                  this.setState({agencia: res.travelagency.nombre});
                  this.setState({agencia_uuid: res.data.uuid_agencia});
                  this.setState({val_uuid_agencia: res.data.uuid_agencia});
                  this.setState({ciudad: res.travelagency.ciudad});
                  
                  this.setState({agente: res.data.agente ? res.data.agente : ""});
                  
                  

                  this.setState({incluye: res.data.incluye});
                  

                  this.setState({observaciones: res.data.OBSERVACIONES});

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
          this.setState({redondo: ''})
        }

        
        
    

render(){
    const { classes } = this.props;
    const { folio_papeleta ,cliente , cliente_uuid, hotel , hotel_uuid,fecha_regreso ,fecha_salida ,SGL ,DBL ,CPL , 
      redondo, aborda, agencia , ciudad, agente, agencia_uuid,observaciones , charters, adultos, con_cargo, 
      sin_cargo,incluye, startDate, hotel_destino} = this.state;

      const {datatables} = this.state;
    
    
    registerLocale('es', es)
    

    return (
        <React.Fragment>
          
          <Typography variant="h6" gutterBottom>
            CUPON DE CHARTER TURISTICO
          </Typography>

          
          <Grid container spacing={3}>
            <Grid item  sm={9}>
              <TextField  required   id="folio_papeleta"   label="folio_papeleta"
                    type="text"  name="folio_papeleta"   value={folio_papeleta}     onChange={this.handleChangeFolio}
                    fullWidth autoComplete="fname"
              />
            
            {/* <AutoCompleteClient id="clientAuto" value={cliente} uuid={cliente_uuid} edit={true} updateClient={this.handleClientChange}/> */}
            <TextField
                 onChange={this.handleChange}  value={cliente}  name="cliente"
                id="cliente" label="CLIENTE"   type="text" margin="dense" fullWidth
              />
            
            
            <AutocompleteHotel value={hotel? hotel : ""} uuid={hotel_uuid} updateHotel={this.handleHotelChange}/>

            <TextField
                 onChange={this.handleChange}  value={hotel_destino? hotel_destino : ""}  name="hotel_destino"
                id="hotel_destino" label="DESTINO"   type="text" margin="dense" fullWidth
              />
            

            
            <AutocompleteAgency value={agencia}  name="agencia" uuid={agencia_uuid} updateAgencia={this.handleAgencyChange}/>

            <TextField
                 onChange={this.handleChange}  value={ciudad}  name="ciudad"
                id="ciudad" label="CIUDAD"   type="text" margin="dense" fullWidth
              />

              <TextField
                 onChange={this.handleChange}  value={agente}  name="agente"
                id="agente" label="AGENTE"   type="text" margin="dense" fullWidth
              />
   
            
            <InputLabel id="trans_turistico" className={classes.iconButton}>TRANSPORTE TURISTICO:</InputLabel>
            <Select autoFocus labelId="demo-simple-select-helper-label"   name="redondo"
              id="redondo" value={redondo ? redondo : ""} onChange={this.handleChange}  
              label="SENCILLO/ REDONDO"   fullWidth    >
               
              <MenuItem value="TRANSPORTE TURISTICO VIAJE SENCILLO">TRANSPORTE TURISTICO VIAJE SENCILLO</MenuItem>
              <MenuItem value="TRANSPORTE TURISTICO VIAJE REDONDO">TRANSPORTE TURISTICO VIAJE REDONDO</MenuItem>
              <MenuItem value="NO INCLUYE">
                <em>No incluye</em>
              </MenuItem>
            </Select>
            {/* <AutocompleteSelect value={redondo} name="redondo" label="TRANSPORTE TURISTICO" updateItem={this.updateItem} items={["TRANSPORTE TURISTICO VIAJE SENCILLO", "TRANSPORTE TURISTICO VIAJE REDONDO"]} /> */}


            <InputLabel className={classes.datepadding}  id="">FECHA DE SALIDA</InputLabel>
            {/* <TextField  required    id="fecha_salida"  value={fecha_salida}  name="fecha_salida"   type="date"
              
                onChange={this.handleChangeDate}  fullWidth autoComplete="fname"
            /> */}
          {/* https://reactdatepicker.com/#example-custom-date-format */}

          <DatePicker locale="es" id="fecha_salida" 
          // defaultValue={getCurrentDate()} 
          
          dateFormat="dd-MMMM-yyyy" selected={fecha_salida} onChange={date => this.setStartDate(date)} name="fecha_salida" />

         
           
           <div className={this.state.styleredondo}>
            <InputLabel className={classes.datepadding} id="demo-simple-select-label">FECHA DE REGRESO</InputLabel>
              {/* <TextField  required   id="fecha_regreso"   name="fecha_regreso"   type="date"   value={fecha_regreso} 
               disabled={redondo !== "TRANSPORTE TURISTICO VIAJE REDONDO"}   onChange={this.handleChange}   fullWidth   autoComplete="fname" /> */}
               <DatePicker disabled={redondo !== "TRANSPORTE TURISTICO VIAJE REDONDO"}  locale="es" id="fecha_regreso" defaultValue={getCurrentDate()} dateFormat="dd-MMMM-yyyy" selected={fecha_regreso} onChange={date => this.setEndDate(date)} name="fecha_regreso" />
           </div>
          
           
             <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>ABORDA Y HORA</InputLabel>
             
              <Select
              autoFocus  labelId="aborda" id="aborda" name="aborda"
                value={aborda ? aborda : ""}  onChange={this.handleChange}  label="ABORDA Y  HORA" fullWidth
                >
                <MenuItem value="5:30 am Soriana Rio Nilo a un costado de Banamex (Rio Nilo y Patria)">5:30 am Soriana Rio Nilo a un costado de Banamex (Rio Nilo y Patria)</MenuItem>
                <MenuItem value="6:00 am Plaza Forum sobre Blvd Tlaquepaque">6:00 am Plaza Forum sobre Blvd Tlaquepaque</MenuItem>
                <MenuItem value="7:00 am Minerva Frente al Hotel Fiesta Americana Minerva">7:00 am Minerva Frente al Hotel Fiesta Americana Minerva</MenuItem>
                <MenuItem value="7:15 am Central Zapopan en Oxxo y Pollo Pepe">7:15 am Central Zapopan en Oxxo y Pollo Pepe</MenuItem>
              </Select>
          
      <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>No. adultos y juniors</InputLabel>
      <IconButton className={classes.iconButton}  aria-label="menu">
          <RemoveIcon onClick={this.adultos_juniors_minus}/>
        </IconButton>
        <InputBase className={classes.input}  placeholder="No. adultos y juniors" value={adultos}  
          id="adultos_juniors"
        />
        <IconButton type="submit" className={classes.iconButton}   aria-label="search">
          <AddIcon onClick={this.adultos_juniors_plus }/>
        </IconButton>
        
       
        <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>No. Menores con cargo</InputLabel>
        <IconButton className={classes.iconButton}  aria-label="menu">
        <RemoveIcon onClick={this.menores_cargo_minus}/>
        </IconButton>
        <InputBase  className={classes.input} placeholder="No. Menores con cargo" value={con_cargo}
          id="menores_cargo"
          
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <AddIcon onClick={this.menores_cargo_plus}/>
        </IconButton>
        

        <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>No. Menores sin cargo</InputLabel>
        <IconButton className={classes.iconButton} aria-label="menu">
          <RemoveIcon onClick={this.menores_sin_cargo_minus}/>
        </IconButton>
        <InputBase
          className={classes.input}  placeholder="No. Menores sin cargo" value={sin_cargo}
          id="menores_sin_cargo"
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <AddIcon onClick={this.menores_sin_cargo_plus}/>
        </IconButton>
        
   
           <InputLabel id="demo-simple-select-helper-label" className={classes.iconButton}>OBSERVACIONES</InputLabel>
            
              <Select  autoFocus  labelId="incluye"
                id="incluye"  
                // value={incluye} 
                value={incluye ? incluye : " "}
                name="incluye"  onChange={this.handleChange}  label="Incluye"
                fullWidth
              >
                <MenuItem value="INCLUYE DESAYUNO EN RESTAURANT ROSITA EN NVR.">INCLUYE DESAYUNO EN RESTAURANT ROSITA EN NVR.</MenuItem>
                <MenuItem value="INCLUYE DESAYUNO EN COCINA PERA EN GDL">INCLUYE DESAYUNO EN COCINA PERA EN GDL</MenuItem>  
                <MenuItem value="N/A" >N/A</MenuItem>
              </Select>


              <TextField   autoFocus  onChange={this.handleChange}
                margin="dense"   value={observaciones}  name="observaciones"
                id="observaciones" label="INCLUYE"  type="text" fullWidth
              />
    

          </Grid> {/* SPACE  */ }
              
              
             </Grid>

             {this.state.errorAlert &&
              <Alert severity="error">{this.state.errorAlert}</Alert>
             }
            
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={this.createCharter} >
              Guardar o Crear 
            </Button>
            {this.state.UUID &&
            <Button variant="contained" color="red" href="#contained-buttons" onClick={this.EliminarCharter} >
              Eliminiar
            </Button>
            }
          
  


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
          {(datatables.rowsPerPage > 0
            ? charters.slice(datatables.page * datatables.rowsPerPage, datatables.page * datatables.rowsPerPage + datatables.rowsPerPage)
            : charters
          ).map(row => (
            <TableRow key={row.UUID}>
              <TableCell component="th" scope="row">
                {row.FolioPapeleta}
              </TableCell>
              <TableCell>{row.NombreCliente}</TableCell>
              <TableCell>{row.Fecha_Salida}</TableCell>
              <TableCell>{row.Agencia}</TableCell>
              <TableCell>{row.Hotel}</TableCell>
              
              
              <TableCell>
              <Link href={`/Charter?id=${row.UUID}`} color="inherit">
                <ListItem button>
                    <Assignment />
                </ListItem>
              </Link>
             </TableCell>
             
             
              <TableCell>
                <ListItem button onClick={() => this.seleccionarElemento(row)}>
                    <Create />
                </ListItem>
             </TableCell>
              
            </TableRow>
          ))}
          </TableBody>



        <TableFooter>
          <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15 , 25]}
            // component="div"
            // colSpan={3}
            count={datatables.length}  // rows.length
            rowsPerPage={datatables.rowsPerPage} // rowsPerPage
            
            page={datatables.page} // page
            onChangePage={this.handleChangePage} // handleChangePage
            onChangeRowsPerPage={this.handleChangeRowsPerPage} //handleChangeRowsPerPage            
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
        </React.Fragment>
      );
    
}

    }
  

export default withStyles(styles)(CharterFrom);