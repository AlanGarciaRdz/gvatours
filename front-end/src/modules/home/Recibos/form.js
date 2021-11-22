import React from 'react';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import {getCurrentDate} from '../../../utils/helpers';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DatePicker from "react-datepicker";

import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';

import Assignment from '@material-ui/icons/Assignment';
import FindRelation from '../../core/FindRelation';
import AutoCompleteClient from '../../core/AutoCompleteClient'

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
                Receipts: [],
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


                cliente: '',
                uuid_cliente: '',
                ClientCuponArray: [],
                totalCupon: 0,

                fecha_salida: new Date(),
                fecha_salida_interna: new Date(),
            }
    
            this.getReceipts = this.getReceipts.bind(this);
            this.addTableData = this.addTableData.bind(this);
            this.filterById = this.filterById.bind(this)
            

            this.createReceipt = this.createReceipt.bind(this);

            this.handleRelationChange = this.handleRelationChange.bind(this);
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
          this.getReceipts()
            
        }

        handleRelationChange = (uuid_relation) => {
          //console.log("uuid Relation",uuid_relation)
          this.setState(
            {val_uuid_relation: uuid_relation}
            )
          this.setState({totalCupon: 10000})
            
          
        }

        
        handleClientChange = (uuid_cliente) => {
          console.log("uuid Client",uuid_cliente)
          this.setState(
            {val_uuid_cliente: uuid_cliente}
            )

            this.getReceipts(uuid_cliente)


            API.get(`/Receipts/${uuid_cliente}`)
            .then(res => {
              if (res.status === 200) {
                
                //console.log(res.data)
                //this.setState({ClientCuponArray: res.data})
                //console.log(this.state.ClientCuponArray)
                

              }
            })
              
        }

      
   

        createReceipt(){
          var {val_uuid_cliente, val_uuid_relation } = this.state
          
          if(val_uuid_cliente === null){
            console.error("needs client")
          }else {
            var Receiptdata = 
            {
              "data": {
                "uuid_cliente": `${val_uuid_cliente}`,
                "concepto": document.getElementById("Concepto").value,
                "cantidad": document.getElementById("cantidad").value,
                "forma_pago": document.getElementById("Forma_pago").innerHTML,
                "liquidado": false
              },
                "relation": {
                  "uuid": `${val_uuid_relation}`,
                  "type": "cupon"
              }
            }  

            // console.log(Receiptdata)

            API.post(`/Receipts/`, Receiptdata).then(res => {
      
              try{
                
                console.log(res.data)
                //this.onAddAgency(res.data.uuid_travelA, res.data.data.nombre, res.data.contacto)
                  
              }catch(error){
                console.error("400 Receipt")
                return "400 Receipt"
              }
          })

          }
          
          

        }


        getReceipts(client) {
            
            let url;
            if(client){
              url = `/ClientReceipt/${client}`
            }else{
              url = `/Receipts`
            }

            
            API.get(url)
              .then(res => {
                if (res.status === 200) {
                  // console.log(res.data)
                  var  rowsP = []
                  // console.log(this.state.data_clientes)
                  
                  rowsP = 
                    res.data.map(row => ( 
                    this.addTableData(
                      row.uuid_receipt, //UUID receipt
                      row.uuid_receipt.split('-')[2]+'-'+row.uuid_receipt.split('-')[3], //UUID receipt
                      row.data.cantidad, //cantidad
                      row.relation.type,  //cupon - contrato
                      row.relation.uuid ? row.relation.uuid.split('-')[2]+'-'+row.relation.uuid.split('-')[3] : ''   //UUID relacion
                    )
                    ))
                    
        
                    this.setState({Receipts: rowsP});
                    console.log("Receipts")
                    console.log(this.state.Receipts)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, Folio, Cantidad, Tipo, FolioCupon) {
          
          return {UUID, Folio, Cantidad, Tipo, FolioCupon};
        }

        setSalidaDate(evt){
          console.log(`dateee ${evt}`)
          console.log(evt)
          let fecha = evt
          this.setState({
            ...this.state,
            
            fecha_salida: fecha
            
        });
      }

    

render(){
    const { classes } = this.props;
    const { Receipts, cliente , cliente_uuid} = this.state;

    //---
    const { fecha_salida, cliente_nombre, importe_total, concepto, reservacion, forma_pago, lugar, nombre, descripcion_servicio } = this.state;
    

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
            <InputLabel className={classes.datepadding}  id="">FECHA DE SALIDA</InputLabel>
                <DatePicker locale="es" id="fecha_salida" 
                  dateFormat="dd-MMMM-yyyy" 
                  selected={fecha_salida} 
                  datetime={fecha_salida} 
                  onChange={date => this.setSalidaDate(date)} name="fecha_salida" />

            </Grid>

          
            
            <Grid item xs={12}>
              <TextField onChange={this.handleChange}  value={cliente_nombre}  name="cliente_nombre" id="cliente_nombre" label="CLIENTE"   type="text" margin="dense" fullWidth/>    
              <TextField onChange={this.handleChange}  value={importe_total}  name="importe_total" id="importe_total" label="IMPORTE TOTAL"   type="text" margin="dense" fullWidth/>
              
              <InputLabel id="trans_turistico" className={classes.iconButton}>POR CONCEPTO DE:</InputLabel>
                <Select autoFocus labelId="demo-simple-select-helper-label"   name="concepto"
                id="concepto" value={concepto ? concepto : ""} onChange={this.handleChange}  
                label="SENCILLO/ concepto"   fullWidth    >
                  <MenuItem value="DEPOSITO EN GARANTIA">DEPOSITO EN GARANTIA</MenuItem>
                  <MenuItem value="ANTICIPO">ANTICIPO</MenuItem>
                  <MenuItem value="PAGO TOTAL">PAGO TOTAL</MenuItem>                
                </Select>

              <InputLabel id="trans_turistico" className={classes.iconButton}>PARA LA RESERVACIÓN DE:</InputLabel>
                <Select autoFocus labelId="demo-simple-select-helper-label"   name="reservacion"
                id="reservacion" value={reservacion ? reservacion : ""} onChange={this.handleChange}  
                label="SENCILLO/ reservacion"   fullWidth    >
                  <MenuItem value="GRUPOS">GRUPOS</MenuItem>
                  <MenuItem value="RENTA DE AUTOBUS/SPRINTER">RENTA DE AUTOBUS/SPRINTER</MenuItem>
                  <MenuItem value="HOTELES">HOTELES</MenuItem>  
                  <MenuItem value="EXCRUSIONES / CHARTER/ OTROS">EXCRUSIONES / CHARTER/ OTROS</MenuItem>  
                </Select>

                <InputLabel id="trans_turistico" className={classes.iconButton}>FORMA DE PAGO:</InputLabel>
                <Select autoFocus labelId="demo-simple-select-helper-label"   name="forma_pago"
                id="forma_pago" value={forma_pago ? forma_pago : ""} onChange={this.handleChange}  
                label="SENCILLO/ forma_pago"   fullWidth    >
                  <MenuItem value="EFECTIVO">EFECTIVO</MenuItem>
                  <MenuItem value="TARJETA DE CREDITO">TARJETA DE CREDITO</MenuItem>
                  <MenuItem value="CHEQUE">CHEQUE</MenuItem>  
                  <MenuItem value="TRANSFERENCIA ELECTRONICA/ DEPOSITO BANCARIO">TRANSFERENCIA ELECTRONICA/ DEPOSITO BANCARIO</MenuItem>  
                </Select>

                <TextField onChange={this.handleChange}  value={descripcion_servicio}  name="descripcion_servicio" id="descripcion_servicio" label="DESCRIPCION DEL SERVICIO"   type="text" margin="dense" fullWidth/>    

                <TextField onChange={this.handleChange}  value={lugar}  name="lugar" id="lugar" label="LUGAR"   type="text" margin="dense" fullWidth/>    
                <TextField onChange={this.handleChange}  value={nombre}  name="nombre" id="nombre" label="NOMBRE"   type="text" margin="dense" fullWidth/>    
                
            
             
            </Grid>

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

            <TableCell>Folio Recibo</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Folio Cupon/Contrato <br/>Tipo</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {Receipts.map(row => (
            <TableRow key={row.uuid_Receipt}>
              <TableCell component="th" scope="row">
                {row.Folio}
              </TableCell>
             
              <TableCell align="right">{row.Cantidad}</TableCell>
              <TableCell align="right">{row.FolioCupon} <br/>{row.Tipo}    </TableCell>
               {/* PDF */}
               <TableCell align="right">
              <Link href={`/Recibo?id=${row.UUID}`} color="inherit">
                <ListItem button>
                    <Assignment />
                </ListItem>
              </Link>
             </TableCell>
             {/* PDF */}
              
              
              
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