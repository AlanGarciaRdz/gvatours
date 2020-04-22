import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import queryString from 'query-string';

import Cupon from './index'
import './RecibosDialog.css'


import API from "../../../utils/API";



function preventDefault(event) {
   event.preventDefault();
 }
 
 const styles = (theme => ({
   appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
 }));

class CuponDialog extends React.Component{

   constructor(props){
      super(props)
      this.state = {
        open: true,
        cupon: ``,
        cupon_data: null,
        email: "agarcia@prueba.com", name: "alan", receiptId: "receiptId", cantidad:"cantidad", CANTIDAD_EN_LETRA:"CANTIDAD_EN_LETRA", DEPOSITO_EN_GARANTIA:"DEPOSITO_EN_GARANTIA", GRUPOS:"GRUPOS", EFECTIVO:"EFECTIVO", importe_total:"importe_total", PAGOS_REGISTRADOS:"PAGOS_REGISTRADOS", SALDO_PENDIENTE:"SALDO_PENDIENTE", DESCRIPCION_DEL_SERVICO:"DESCRIPCION_DEL_SERVICO"
      }


      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.getCuponData = this.getCuponData.bind(this);
    }


    getCuponData = () =>{
          

      API.get(`/Cupon/${queryString.parse(this.props.location.search).id}`)
          .then(res => {
            if (res.status === 200) {
                this.setState({cupon_data: res.data[0]})
                console.log(this.state.cupon_data)
            }
          })
    }
 


  handleClickOpen = () => {
    this.setState({open: true})
  };

 

  handleClose = () => {
   this.setState({open: false})
   this.props.history.push('./Cupon');
 }



  componentDidMount(){

   this.getCuponData()

   
   
    //var { email, name, receiptId, cantidad, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, GRUPOS, EFECTIVO, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = {email: "agarcia@prueba.com", name: "name", receiptId: "receiptId", cantidad:"cantidad", CANTIDAD_EN_LETRA:"CANTIDAD_EN_LETRA", DEPOSITO_EN_GARANTIA:"DEPOSITO_EN_GARANTIA", GRUPOS:"GRUPOS", EFECTIVO:"EFECTIVO", importe_total:"importe_total", PAGOS_REGISTRADOS:"PAGOS_REGISTRADOS", SALDO_PENDIENTE:"SALDO_PENDIENTE", DESCRIPCION_DEL_SERVICO:"DESCRIPCION_DEL_SERVICO"}
    var { email, name, receiptId, cantidad, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, GRUPOS, EFECTIVO, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = this.state

            var cupon = `
                <table class="header">
                   <tbody>
                   <tr>
                   <td><img  src="https://transportamex-production-bucket-1ll3nrbfgiob8.s3.amazonaws.com/2016/08/GVA-Tours1.jpg"
                      style="display: block;
                      margin-left: auto;
                      margin-right: auto;
                      width: 50%; width:100%; max-width:200px;"></td>
                      <td style="text-align: center;">RECIBO DE DINERO</td>
                   <td>
                      <div class="div_folio">
                            <table class="folio">
                                  <tbody>
                                  <tr>
                                  <td>Folio</td>
                                  </tr>
                                  <tr>
                                  <td>&#8470; ${receiptId}</td>
                                  </tr>
    
                                  <tr>
                                        <td>BUENO POR</td>
                                        </tr>
                                        <tr>
                                        <td>$ ${cantidad}</td>
                                        </tr>
                                  </tbody>
                               </table>
    
                              
                      </div>
                   </td>
                   </tr>
                   </tbody>
                   </table>
             
                   <p class="titulo">&nbsp;</p> 
                   
                <div class="datos_contratante_div">
                      <table class="datos_del_contratante">
                            <tbody>
                            <tr>
                            <td id="etiqueta">RECIBIMOS DE:</td>
                            <td>${name}</td>
                            </tr>
                            <tr>
                            <td id="etiqueta">LA CANTIDAD DE:</td>
                            <td>${CANTIDAD_EN_LETRA} </td>
                            </tr>
    
                            <tr>
                               <td id="etiqueta">POR CONCEPTO DE:</td>
                               <td>EJEMPLO: ${DEPOSITO_EN_GARANTIA} </td>
                            </tr>
    
                            <tr>
                               <td id="etiqueta" style="border-bottom: none;">PARA LA RESERVACION DE:</td>
                               <td style="border-bottom: none;">EJEMPLO: ${GRUPOS} </td>
                            </tr>
    
    
                            <!-- style="border-bottom: none;" -->
                            </tbody>
                            </table>
                </div>
    
                <p class="titulo">&nbsp;</p>
                <div class="datos_contratante_div">
                      <table class="datos_del_contratante">
                            <tbody>
                            <tr style="border-bottom: none;">
                            <td style="border-bottom: none;">FORMA DE PAGO:</td>
                            <td style="border-bottom: none;">EJEMPLO: ${EFECTIVO}</td>
                            </tr>
                            
                            </tbody>
                            </table>
                </div>
    
    
                <p class="titulo">&nbsp;</p>
                <div class="datos_viaje_pagos">
                      
                   <table class="pagos">
                      <tbody>
                    <!-- <td colspan="2" style="text-align: center; padding-top: 10px;"><p class="titulo">PAGOS</p></td> -->
                      <tr>
                      <td id="etiqueta_general">IMPORTE TOTAL:</td>
                      <td id="etiqueta_general">${importe_total}</td>
                      </tr>
                      <tr>
                      <td id="etiqueta_general">PAGOS REGISTRADOS:</td>
                      <td id="etiqueta_general">${PAGOS_REGISTRADOS}</td>
                      </tr>
                      <tr id="sin_borde_inferior">
                      <td id="etiqueta_general">SALDO PENDIENTE:</td>
                      <td id="etiqueta_general">${SALDO_PENDIENTE}</td>
                      </tr>
                      </tbody>
                   </table>
    
                </div>
               
               <p class="titulo">&nbsp;</p>
                <div class="datos_viaje">
    
                      <table class="firmas">
                            <tbody>
                            <td colspan="2" style="text-align: center; padding-top: 10px;"><p class="titulo">DESCRIPCION DEL SERVICIO:</p></td>
                            
                            <tr><td></td></tr>
                            
                            <tr><td colspan="2" id="etiqueta_general">${DESCRIPCION_DEL_SERVICO}</td></tr>
                            <!-- <tr><td colspan="2" id="etiqueta_general">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</td></tr> -->
                            <tr><td></td></tr>
                            <tr><td></td></tr>
                            <tr><td></td></tr>
                            <tr><td></td></tr>
                            <tr>
                               <td>
                                  <p id="etiqueta_general_firma" class="firma"> LUGAR Y FECHA</p>
                               </td>
                               <td>
                                     <p id="etiqueta_general_firma" class="firma"> RECIBIÓ NOMBRE Y FIRMA  </p>
                               </td>
                            </tr>
                            
                            </tbody>
                            </tr>
                        </table>
                </div>
        `;

        this.setState({cupon})
  }

  
  

  

    render(){
      const { classes } = this.props;
      var {open, cupon, email} = this.state;

      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

      if(open){
        return(
          <div> 

           
 
          <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton> 
                <Typography variant="h6" className={classes.title}>
                  Cupon
                </Typography>
                <Button autoFocus color="inherit" >
                  Descargar
                </Button>
              </Toolbar>
            </AppBar>
            
            <div dangerouslySetInnerHTML={{ __html: cupon}} />,
            
          </Dialog>
        </div>
       )
     }else{
       return(
        <div>
          <Cupon />
        </div>
       )
       
     }

    }
      

}

export default withStyles(styles)(CuponDialog);
