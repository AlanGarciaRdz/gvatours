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
                aire_acondicionado: true,
                sanitario: false, 
                tv_dvd: true,
                microfono: false,
                stereo: true,
                seguro_de_viajero: true,
                otros_2: false
            }
    
            /* new*/

            this.handleChange = this.handleChange.bind(this);
            /* end */
            this.getContratos = this.getContratos.bind(this);
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createContrato = this.createContrato.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
            this.handleHotelChange = this.handleHotelChange.bind(this);
            this.handleAgencyChange = this.handleAgencyChange.bind(this);
            this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
              
            this.setContratoDate = this.setContratoDate.bind(this);
            this.setSalidaDate = this.setSalidaDate.bind(this);
            this.setRegresoDate = this.setRegresoDate.bind(this);



            
        
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

        handleChange = (evt) => {
          this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
          },() => {
            this.getContratos()
          });
          
        }

        handleChangeSwitch = (evt) => {
          console.log(evt.target.checked)
          this.setState({
            ...this.state,
            [evt.target.name]: evt.target.checked
          },() => {
            //this.getContratos()
          });
          
        }

   

        createContrato(){
          //var {val_uuid_cliente, val_uuid_hotel, val_uuid_agencia } = this.state
          const { folio_contrato, cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono, 
            destino, hora_salida, hora_presentarse, encargado, direccion_salida, entre_calles, colonia_ciudad, punto_referencia, 
            itinerario, hora_regreso, data_vehicle_tipo_unidad, data_vehicle_capacidad, importe_total, anticipo, saldo,
            fecha_contrato, fecha_regreso, fecha_salida } = this.state;

          const { aire_acondicionado, sanitario, tv_dvd, microfono, stereo, seguro_de_viajero, otros_2 } = this.state
          // console.log(val_uuid_cliente, val_uuid_hotel, val_uuid_agencia)
          
          if(cliente_nombre === undefined || destino === undefined || data_vehicle_tipo_unidad === undefined){
            console.error("Falta Cliente - Destino - Unidad")
          }else {
            
            let equipo = []
            if(aire_acondicionado) equipo.push('AIRE ACONDICIONADO')
            if(stereo)  equipo.push('STEREO')
            if(tv_dvd)  equipo.push('TV/DVD')
            if(sanitario) equipo.push('SANITARIO')
            if(microfono) equipo.push('MICROFONO')
            if(seguro_de_viajero) equipo.push('SEGURO DE PASAJERO')

            let contratodata = 
            [
              {
                  "data": {
                    "fecha_contrato": fecha_contrato,
                    "folio": folio_contrato,
                    "cliente_nombre": cliente_nombre,
                    "cliente_direccion": cliente_direccion,
                    "cliente_ciudad": cliente_ciudad,
                    "cliente_telefono": cliente_telefono,
                    "encargado": encargado,
                    "colonia_ciudad": colonia_ciudad,//"Fresno, Guadalajara",
                    "punto_referencia": punto_referencia,

                    "direccion_salida": direccion_salida,
                    "entre_calles": entre_calles,

                    
                    //----
                      "destino": destino,
                      "fecha_salida": fecha_salida,
                      "hora_presentarse": hora_presentarse,
                      "hora_salida": hora_salida,
                      "itinerario": itinerario,
                      
                      "hora_regreso": hora_regreso,
                      "fecha_regreso": fecha_regreso,

                      "importe_total": importe_total,
                      "anticipo": anticipo,
                      "saldo": saldo,
                  },
                  "data_vehicle": {
                      "Equipada": equipo,
                      "capacidad": data_vehicle_capacidad,
                      "tipo_unidad": data_vehicle_tipo_unidad
                  }
              }
          ]
          
             console.log(contratodata)

            API.post(`/TransportC`, contratodata).then(res => {
              console.log("res")
              let resp = res.data
              try{
                // console.log(res.data)
                //this.onAddAgency(res.data.uuid_travelA, res.data.data.nombre, res.data.contacto)
                window.location.href =  `/Contrato?id=${resp.uuid_contract}`; 

                this.addTableData(
                  resp.data.uuid_contract, //UUID
                  resp.data.folio,//row.uuid_contract.split('-')[2]+'-'+row.uuid_contract.split('-')[3], //FOLIO
                  resp.data.cliente_nombre, //Cliente
                  resp.data_vehicle.tipo_unidad,
                  resp.data.destino,
                  resp.data.fecha_salida,
                  resp.data.anticipo,
                  resp.data.importe_total,
                  resp.status
                )

              }catch(error){
                console.log(error)
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
                            row.data.folio,//row.uuid_contract.split('-')[2]+'-'+row.uuid_contract.split('-')[3], //FOLIO
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

        setContratoDate(evt){
          console.log(`dateee ${evt}`)
          let fecha = evt
          this.setState({
            ...this.state,
            fecha_contrato: fecha
            
          }); 
        }

        setSalidaDate(evt){
          console.log(`dateee ${evt}`)
          let fecha = evt
          this.setState({
            ...this.state,
            
            fecha_salida: fecha
            
        });
      }

        setRegresoDate(evt){
          console.log(`dateee ${evt}`)
          let fecha = evt
          this.setState({
            ...this.state,
            fecha_regreso: fecha
        });
      }

render(){
    const { classes } = this.props;
    const {Clientes, Hoteles , Contratos} = this.state;


    
    const { folio_contrato, cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono, destino, hora_salida, hora_presentarse, encargado, direccion_salida, entre_calles, colonia_ciudad, punto_referencia, itinerario, hora_regreso, data_vehicle_tipo_unidad, data_vehicle_capacidad, importe_total, anticipo, saldo } = this.state;

    const { fecha_salida, fecha_contrato, fecha_regreso } = this.state

    const { aire_acondicionado, sanitario, tv_dvd, microfono, stereo, seguro_de_viajero, otros_2 } = this.state

    return (
        <React.Fragment>

          <Grid container spacing={2}>
            <Grid item  sm={9}>
              <TextField  required   id="folio_contrato"   label="folio_contrato"
                    type="text"  name="folio_contrato"   value={folio_contrato}     onChange={this.handleChange}
                    fullWidth autoComplete="fname"/>

              <Typography variant="h7" gutterBottom> DATOS DEL CONTRATANTE </Typography>
              <InputLabel className={classes.datepadding}  id="">FECHA DE CONTRATO</InputLabel>
                <DatePicker locale="es" id="fecha_contrato" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_contrato} 
                  datetime={fecha_contrato} 
                  onChange={date => this.setContratoDate(date)} name="fecha_contrato" />


                <TextField onChange={this.handleChange}  value={cliente_nombre}  name="cliente_nombre" id="cliente_nombre" label="CLIENTE"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente_direccion}  name="cliente_direccion" id="cliente_direccion" label="DIRECCION"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente_ciudad}  name="cliente_ciudad" id="cliente_ciudad" label="CIUDAD"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={cliente_telefono}  name="cliente_telefono" id="cliente_telefono" label="TELEFONO"   type="text" margin="dense" fullWidth/>
                
              <Typography variant="h7" gutterBottom> DATOS DE SALIDA Y REGRESO DEL VIAJE </Typography>
                <TextField onChange={this.handleChange}  value={destino}  name="destino" id="destino" label="DESTINO"   type="text" margin="dense" fullWidth/>
                <InputLabel className={classes.datepadding}  id="">FECHA DE SALIDA</InputLabel>
                <DatePicker locale="es" id="fecha_salida" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_salida} 
                  datetime={fecha_salida} 
                  onChange={date => this.setSalidaDate(date)} name="fecha_salida" />

                
                <TextField onChange={this.handleChange}  value={hora_salida}  name="hora_salida" id="hora_salida" label="HORA_SALIDA"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={hora_presentarse}  name="hora_presentarse" id="hora_presentarse" label="HORA_PRESENTARSE"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={encargado}  name="encargado" id="encargado" label="ENCARGADO"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={direccion_salida}  name="direccion_salida" id="direccion_salida" label="DIRECCION_SALIDA"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={entre_calles}  name="entre_calles" id="entre_calles" label="ENTRE_CALLES"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={colonia_ciudad}  name="colonia_ciudad" id="colonia_ciudad" label="CIUDAD"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={punto_referencia}  name="punto_referencia" id="punto_referencia" label="PUNTO_REFERENCIA"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={itinerario}  name="itinerario" id="itinerario" label="ITINERARIO"   type="text" margin="dense" fullWidth/>
                
                <InputLabel className={classes.datepadding}  id="">FECHA DE REGRESO</InputLabel>
                <DatePicker locale="es" id="fecha_regreso" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_regreso} 
                  datetime={fecha_regreso} 
                  onChange={date => this.setRegresoDate(date)} name="fecha_regreso" />

                <TextField onChange={this.handleChange}  value={hora_regreso}  name="hora_regreso" id="hora_regreso" label="HORA REGRESO"   type="text" margin="dense" fullWidth/>

              <Typography variant="h7" gutterBottom> CARACTERISTICAS DE LA UNIDAD CONTRATADA </Typography>
                <TextField onChange={this.handleChange}  value={data_vehicle_tipo_unidad}  name="data_vehicle_tipo_unidad" id="data_vehicle_tipo_unidad" label="TIPO UNIDAD"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={data_vehicle_capacidad}  name="data_vehicle_capacidad" id="data_vehicle_capacidad" label="CAPACIDAD"   type="text" margin="dense" fullWidth/>
                
                <FormControlLabel control={
                  <Switch checked={aire_acondicionado} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="aire_acondicionado" id="aire_acondicionado" label="AIRE ACONDICIONADO" />
                <br/>

                <FormControlLabel control={
                  <Switch checked={sanitario} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="sanitario" id="sanitario" label="SANITARIO" />
                <br/>

                <FormControlLabel control={
                  <Switch checked={tv_dvd} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="tv_dvd" id="tv/dvd" label="TV/DVD" />
                <br/>

                <FormControlLabel control={
                  <Switch checked={microfono} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="microfono" id="microfono" label="MICROFONO" />
                <br/>

                <FormControlLabel control={
                  <Switch checked={stereo} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="stereo" id="stereo" label="STEREO" />
                <br/>

                <FormControlLabel control={
                  <Switch checked={seguro_de_viajero} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="seguro_de_pasajeros" id="seguro de pasajeros" label="SEGURO DE PASAJEROS"  />
                <br/>

                <FormControlLabel control={
                  <Switch checked={otros_2} onChange={this.handleChangeSwitch} color="primary" label="Primary" />
                } name="otros_2" id="otros_2" label="OTROS"  />
                <br/>

            </Grid>

            <Grid item  sm={9}>
              <Typography variant="h7" gutterBottom > PAGOS </Typography>              
                <TextField onChange={this.handleChange}  value={importe_total}  name="importe_total" id="importe_total" label="IMPORTE TOTAL"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={anticipo}  name="anticipo" id="anticipo" label="ANTICIPO"   type="text" margin="dense" fullWidth/>
                <TextField onChange={this.handleChange}  value={saldo}  name="saldo" id="saldo" label="SALDO"   type="text" margin="dense" fullWidth/>
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
                  {/* <TableCell align="right">Estatus</TableCell> */}
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
                    {/* <TableCell align="right">{row.status}</TableCell> */}
                    
                    
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