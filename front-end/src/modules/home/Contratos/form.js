import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import Link from '@material-ui/core/Link';
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
                            "alan",//row.uuid_contract.split('-')[2]+'-'+row.uuid_contract.split('-')[3], //FOLIO
                            row.data.cliente_nombre, //Cliente
                            row.data_vehicle.tipo_unidad,
                            row.data.destino,
                            row.data.fecha_salida,
                            row.data.anticipo,
                            row.data.importe_total,
                            row.status
                          )
                        ))
                      console.log(rowsP)
                        this.setState({Contratos: rowsP});
                    
                    //console.log(this.state.Contratos)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }

        addTableData(UUID, Folio, cliente_nombre, tipo_unidad, destino, fecha_salida, anticipo, importe_total, status) {
          return {UUID, Folio, cliente_nombre, tipo_unidad, destino, fecha_salida, anticipo, importe_total, status};
        }

    

render(){
    const { classes } = this.props;
    const {Clientes, Hoteles , Contratos} = this.state;

    const { folio_contrato, cliente, hotel, hotel_uuid } = this.state;

    const { fecha_salida, fecha_contrato, fecha_regreso } = this.state

    return (
        <React.Fragment>

          <Grid container spacing={2}>
            <Grid item  sm={9}>
              <TextField  required   id="folio_contrato"   label="folio_contrato"
                    type="text"  name="folio_contrato"   value={folio_contrato}     onChange={this.handleChangeName}
                    fullWidth autoComplete="fname"/>

              <Typography variant="h7" gutterBottom> DATOS DEL CONTRATANTE </Typography>
              <InputLabel className={classes.datepadding}  id="">FECHA DE CONTRATO</InputLabel>
                <DatePicker locale="es" id="fecha_contrato" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_contrato} 
                  datetime={fecha_contrato} 
                  onChange={date => this.setStartDate(date)} name="fecha_contrato" />

                <TextField onChange={this.handleChange}  value={cliente}  name="cliente_nombre" id="cliente_nombre" label="CLIENTE"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="cliente_direccion" id="cliente_direccion" label="DIRECCION"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="cliente_ciudad" id="cliente_ciudad" label="CIUDAD"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="cliente_telefono" id="cliente_telefono" label="TELEFONO"   type="text" margin="dense" fullWidth/>
                
              <Typography variant="h7" gutterBottom> DATOS DE SALIDA Y REGRESO DEL VIAJE </Typography>
                <TextField onChange={this.handleChange}  value={cliente}  name="destino" id="destino" label="DESTINO"   type="text" margin="dense" fullWidth/>
                <InputLabel className={classes.datepadding}  id="">FECHA DE SALIDA</InputLabel>
                <DatePicker locale="es" id="fecha_salida" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_salida} 
                  datetime={fecha_salida} 
                  onChange={date => this.setStartDate(date)} name="fecha_salida" />

                
                <TextField onChange={this.handleChange}  value={cliente}  name="hora_salida" id="hora_salida" label="HORA_SALIDA"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="hora_presentarse" id="hora_presentarse" label="HORA_PRESENTARSE"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="encargado" id="encargado" label="ENCARGADO"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="direccion_salida" id="direccion_salida" label="DIRECCION_SALIDA"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="entre_calles" id="entre_calles" label="ENTRE_CALLES"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="colonia_ciudad" id="colonia_ciudad" label="CIUDAD"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="punto_referencia" id="punto_referencia" label="PUNTO_REFERENCIA"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="itinerario" id="itinerario" label="ITINERARIO"   type="text" margin="dense" fullWidth/>
                
                <InputLabel className={classes.datepadding}  id="">FECHA DE REGRESO</InputLabel>
                <DatePicker locale="es" id="fecha_regreso" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_regreso} 
                  datetime={fecha_regreso} 
                  onChange={date => this.setStartDate(date)} name="fecha_regreso" />

                <TextField onChange={this.handleChange}  value={cliente}  name="hora_regreso" id="hora_regreso" label="HORA REGRESO"   type="text" margin="dense" fullWidth/>

              <Typography variant="h7" gutterBottom> CARACTERISTICAS DE LA UNIDAD CONTRATADA </Typography>
                <TextField onChange={this.handleChange}  value={cliente}  name="data_vehicle_tipo_unidad" id="data_vehicle_tipo_unidad" label="TIPO UNIDAD"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="data_vehicle_capacidad" id="data_vehicle_capacidad" label="CAPACIDAD"   type="text" margin="dense" fullWidth/>
                
                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="aire_acondicionado" id="aire_acondicionado" label="AIRE ACONDICIONADO" />

                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="sanitario" id="sanitario" label="SANITARIO" />

                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="tv/dvd" id="tv/dvd" label="TV/DVD" />

                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="microfono" id="microfono" label="MICROFONO" />

                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="stereo" id="stereo" label="STEREO" />

                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="otros_1" id="otros_1" label="OTROS"  />

                <FormControlLabel control={
                  <Switch checked={true} color="primary" label="Primary" />
                } name="otros_2" id="otros_2" label="OTROS"  />

            </Grid>

            <Grid item  sm={9}>
              <Typography variant="h7" gutterBottom > PAGOS </Typography>              
                <TextField onChange={this.handleChange}  value={cliente}  name="importe_total" id="importe_total" label="IMPORTE TOTAL"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="anticipo" id="anticipo" label="ANTICIPO"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente}  name="saldo" id="saldo" label="SALDO"   type="text" margin="dense" fullWidth/>
            </Grid>
            
          </Grid>

          
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={this.createContrato} >
              Guardar o Crear 
            </Button>
          
  
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Contrato</TableCell>
                  <TableCell align="right">PDF</TableCell>
                  <TableCell align="right">cliente</TableCell>
                  <TableCell align="right">Unidad</TableCell>
                  <TableCell align="right">Destino</TableCell>
                  <TableCell align="right">Fecha_salida</TableCell>
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
                    <TableCell align="right">{row.cliente_nombre}</TableCell>
                    <TableCell align="right">{row.tipo_unidad}</TableCell>
                    <TableCell align="right">{row.destino}</TableCell>
                    <TableCell align="right">{row.fecha_salida}</TableCell>
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