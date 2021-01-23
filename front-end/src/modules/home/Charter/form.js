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
                totalCupon: 0
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


            API.get(`/ClientCupon/${uuid_cliente}`)
            .then(res => {
              if (res.status === 200) {
                console.log("---")
                //console.log(res.data)
                this.setState({ClientCuponArray: res.data})
                console.log(this.state.ClientCuponArray)
                console.log("---")

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

    

render(){
    const { classes } = this.props;
    const { Receipts, cliente , cliente_uuid} = this.state;
    

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
              <AutoCompleteClient value={cliente} uuid={cliente_uuid} updateClient={this.handleClientChange}/>
            </Grid>

            <Grid item xs={12}>
              
              <FindRelation updateCupon={this.handleRelationChange} uuid={this.state.val_uuid_cliente} total={this.state.totalCupon} />
              {/* <FindRelation updateCupon={this.handleRelationChange}/> */}
            </Grid>

              {/* <TextField
                  label="CUPON-CONTRATO"
                  id="Reservacion"
                  className={clsx(classes.margin, classes.textField)}
                  type="text"
                /> */}
            
            

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

             

              </Grid>

              <Grid item xs={12}>
              <InputLabel id="demo-simple-select-label">Forma pago</InputLabel>
                <Select
                      id="Forma_pago"
                      label="Forma de pago"
                      className={clsx(classes.margin, classes.textField)}
                      // onChange={handleChange}
                    >
                      <MenuItem value={""}>&nbsp;</MenuItem>
                      <MenuItem value={"Efectivo"}>Efectivo</MenuItem>
                      <MenuItem value={"Tarjeta Debito"}>Tarjeta Debito</MenuItem>
                      <MenuItem value={"Transferencia"}>Transferencia</MenuItem>
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