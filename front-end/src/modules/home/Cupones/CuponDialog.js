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
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Logo from '../../../images/logo'
import './CuponDialog.css'


import CuponPDF from '../../../utils/CuponPDF';



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
        cupon_data: null
      }


      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.getCuponData = this.getCuponData.bind(this);
    }


    getCuponData = () =>{
          
      if(queryString.parse(this.props.location.search).id !== undefined){
        API.get(`/Cupon/${queryString.parse(this.props.location.search).id}`)
          .then(res => {
            if (res.status === 200) {
                this.setState({cupon_data: res.data[0]})
                console.log(this.state.cupon_data)
                var data = res.data[0]
                this.setState({receiptId: data ? data.uuid_cupon.split('-')[2]+'-'+data.uuid_cupon.split('-')[3]: ''})
                this.setState({DESTINO: data.hotel.destino})
                this.setState({HOTEL: data.hotel.nombre})
                this.setState({DIRECCION_HOTEL: data.hotel.direccion})
                this.setState({TELEFONO_HOTEL: data.hotel.telefono})
                this.setState({FECHA_ENTRADA: data.data.fecha_entrada})
                this.setState({FECHA_SALIDA: data.data.fecha_salida})
                this.setState({TOTAL_NOCHES: ''})
                this.setState({NOMBRE_PASAJERO: data.cliente.nombre})
                //this.setState({TOTAL_PAGADO: data.data.Total_Pagado})
                this.setState({TOTAL_PAGADO: data.data.Total_Venta})
                this.setState({NUM_HABITACIONES: data.data_rooms.numero_habitaciones})
                this.setState({NOMBRE_AGENCIA: data.travelagency.nombre})
                 this.setState({NUM_SGL: data.data_rooms.adultos.SGL})
                this.setState({NUM_DBL: data.data_rooms.adultos.DBL})
                this.setState({NUM_TPL: data.data_rooms.adultos.TPL ? data.data_rooms.adultos.TPL : ''})
                 this.setState({NUM_CPL: data.data_rooms.adultos.DBL})
                 this.setState({CIUDAD_AGENCIA: data.travelagency.ciudad})
                this.setState({MEN_CC: data.data_rooms.menores.CC})
                this.setState({MEN_SC: data.data_rooms.menores.SC})
                 this.setState({MEN_JR: data.data_rooms.menores.JR})
                this.setState({TELEFONO_AGENCIA: data.travelagency.telefono })
                this.setState({PLAN_CONTRATADO: data.data_travelA.plancontratado ? data.data_travelA.plancontratado : ''})
                this.setState({CONTACTO_AGENCIA: data.travelagency.contacto})
                 this.setState({CONFIRMADO_POR: data.data_travelA.confirmadopor ? data.data_travelA.confirmadopor : ''})
                this.setState({OBSERVACIONES: data.data_travelA.observaciones})
                this.setState({CLAVE: data.uuid_cupon.split('-')[2]+'-'+data.uuid_cupon.split('-')[3]})
            }
          })
      }else{
        //TODO
        this.handleClose()
      }
      
    }

    getImageFromUrl = function(url, callback) {
      var img = new Image();
      img.onError = function() {
          console.log('Cannot load image: "'+url+'"');
      };
      img.onload = function() {
         
          callback(img);
      };
      console.log(url)
      img.src = url;
   }

  

    DownloadImage = () => {
      
      
      html2canvas(document.querySelector('#cupon_pdf')).then(canvas =>  {
          document.body.appendChild(canvas)
          const divImage = canvas.toDataURL("image/png");
          const pdf = new jsPDF('p', 'pt', 'letter');
          
          // A Letter size page measures 215.9 × 279.4 millimeters or 8.50 × 11.00 inches. In PostScript, its dimensions are 612 × 792 points.

          ///https://stackoverflow.com/questions/56644474/html2canvas-and-react-to-generate-pdf-doesnt-work
          const w = window.innerWidth;
          console.log()
          
          pdf.addImage(divImage, 'PNG', 5 , 5, 580, 450 );

          const imgData = Logo;
          pdf.addImage(imgData, 'PNG', 5, 5);

          pdf.save(`${document.getElementById("receiptId").innerHTML.replace('№ ', '')}.pdf`);
      })
    }

    GeneratePDF = () => {
      var { receiptId, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES, NOMBRE_PASAJERO, TOTAL_PAGADO, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE } = this.state
          ///https://artskydj.github.io/jsPDF/docs/jsPDF.html
          const doc = new jsPDF('p', 'pt', 'letter');
          
          CuponPDF.Header(doc, receiptId)

          CuponPDF.Destino(doc, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL)
          
          CuponPDF.Fecha(doc, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES)
          
        
          CuponPDF.Cliente(doc, NOMBRE_PASAJERO, TOTAL_PAGADO)

          CuponPDF.Cuadros(doc, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE);

          doc.save(`${receiptId}.pdf`);
      
    }

    CreatePDF = () => {
      
        this.GeneratePDF()
        //this.DownloadImage()
      
      
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
  }

  
  

  

    render(){
      const { classes } = this.props;
      var {open, cupon, email} = this.state;

      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

      if(open){

        //var { email, name, receiptId, cantidad, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, GRUPOS, EFECTIVO, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = {email: "agarcia@prueba.com", name: "name", receiptId: "receiptId", cantidad:"cantidad", CANTIDAD_EN_LETRA:"CANTIDAD_EN_LETRA", DEPOSITO_EN_GARANTIA:"DEPOSITO_EN_GARANTIA", GRUPOS:"GRUPOS", EFECTIVO:"EFECTIVO", importe_total:"importe_total", PAGOS_REGISTRADOS:"PAGOS_REGISTRADOS", SALDO_PENDIENTE:"SALDO_PENDIENTE", DESCRIPCION_DEL_SERVICO:"DESCRIPCION_DEL_SERVICO"}
    var { receiptId, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES, NOMBRE_PASAJERO, TOTAL_PAGADO, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE } = this.state

    var cupon = `
        <table class="header">
        <tbody>
        <tr>
        <td><img  src="https://transportamex-production-bucket-1ll3nrbfgiob8.s3.amazonaws.com/2016/08/GVA-Tours1.jpg"
          style="display: block;
          margin-left: auto;
          margin-right: auto;
          width: 50%; width:100%; max-width:200px;">
          <p style="text-align: center;">CUPON DE SERVICIOS</p>
        </td>
        <td style="text-align: center;"></td>
        <td style="text-align: center;"><a href="http://www.gvatours.com/" target="_blank">www.gvatours.com</a> <br/><a href="mailto:info@gvatours.com">info@gvatours.com</a></td>
        <td style="text-align: center;">
              <a href="https://goo.gl/maps/KgRQhTxJQoMNe8nv9" target="_blank">Av Fidel Velázquez Sánchez 643 <br/>
                  Santa Elena Alcalde <br/> 
                  44230 Guadalajara, Jal. 
              </a>
              <br/> 33 3631 3036 con 10 Lineas
              <br/><a href="https://api.whatsapp.com/send?phone=+5213338086093" target="_blank">Whatsaap: 333-808-6093</a>
              </td>
        
        <td>
          <div class="div_folio">
                <table class="folio">
                      <tbody>
                      <tr>
                          <th>Folio</th>
                      </tr>
                      <tr>
                          <td id="receiptId">&#8470; ${receiptId}</td>
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
                    <td id="etiqueta">DESTINO:</td>
                    <td>${DESTINO} </td>
                </tr>
                <tr>
                <td id="etiqueta">HOTEL:</td>
                <td>${HOTEL}</td>
                </tr>
                

                <tr>
                    <td id="etiqueta">DIRECCION:</td>
                    <td>${DIRECCION_HOTEL} </td>
                </tr>

                <tr>
                    <td id="etiqueta" style="border-bottom: none;">TELEFONO:</td>
                    <td style="border-bottom: none;">${TELEFONO_HOTEL} </td>
                </tr>


                <!-- style="border-bottom: none;" -->
                </tbody>
                </table>
    </div>

    <p class="titulo">&nbsp;</p>

    <div class="datos_contratante_div">
          <table class="tabla_encabezado_color">
                <tbody>
                <tr class="encabezado">
                    <td style="border-bottom: none;">FECHA ENTRADA</td>
                    <td style="border-bottom: none;">FECHA SALIDA</td>
                    <td style="border-bottom: none;">TOTAL NOCHES PAGADAS</td>
                </tr>
                <tr style="border-bottom: none;">
                    <td style="border-bottom: none;">${FECHA_ENTRADA}</td>
                    <td style="border-bottom: none;">${FECHA_SALIDA}</td>
                    <td style="border-bottom: none;">${TOTAL_NOCHES}</td>
                </tr>
                
                </tbody>
              </table>
        </div>

    <p class="titulo">&nbsp;</p>
    <div class="datos_contratante_div">
        <table class="tabla_encabezado_color">
              <tbody>
              <tr class="encabezado">
                <td style="border-bottom: none;">NOMBRE DEL PASAJERO</td>
                <td style="border-bottom: none;">TOTAL PAGADO</td>
              </tr>
              <tr style="border-bottom: none;">
                <td style="border-bottom: none;">${NOMBRE_PASAJERO}</td>
                <td style="border-bottom: none;">${TOTAL_PAGADO}</td>
              </tr>
              
              </tbody>
          </table>
    </div>


    <p class="titulo">&nbsp;</p>
    <div class="cupon_relacion_datos">

        <table id="table_cupon_relacion_datos">
              <tr>
                    <th width="50%">RELACION DE HABITACIONES</th>
                    <th width="50%">DATOS DE LA AGENCIA</th>
              </tr>
              <tr class="titulos_cupon">
                    <td>No. DE HABITACIONES RESERVADAS:</td>
                    <td>NOMBRE DE LA AGENCIA:</td>
              </tr>
              <tr>
                    <td>${NUM_HABITACIONES}</td>
                    <td>${NOMBRE_AGENCIA}:</td>
              </tr>
              <tr class="titulos_cupon">
                    <td>DESGLOCE OCUPACION:</td>
                    <td>CIUDAD:</td>
              </tr>
              <tr>
                    <td>SGL: ${NUM_SGL} DBL: ${NUM_DBL} TPL: ${NUM_TPL} CPL: ${NUM_CPL} </td>
                    <td>${CIUDAD_AGENCIA}</td>
              </tr>
              <tr class="titulos_cupon">
                    <td>MENORES:</td>
                    <td>TELEFONO</td>
              </tr>
              <tr>
                    <td>C/C: ${MEN_CC} S/C ${MEN_SC} JR ${MEN_JR} </td>
                    <td>${TELEFONO_AGENCIA}</td>
              </tr>

              <tr class="titulos_cupon">
                    <td>PLAN CONTRADO</td>
                    <td>CONTACTO</td>
              </tr>

              <tr>
                    <td>${PLAN_CONTRATADO}</td>
                    <td>${CONTACTO_AGENCIA}</td>
              </tr>

              <tr class="titulos_cupon">
                    <td>CONFIRMADO POR</td>
                    <td>OBSERVACIONES</td>
              </tr>

              <tr>
                    <td>${CONFIRMADO_POR}</td>
                    <td>${OBSERVACIONES}</td>
              </tr>
              <tr class="titulos_cupon">
                    <td>CLAVE</td>
                    <td></td>
              </tr>
              <tr>
                    <td>${CLAVE}</td>
                    <td></td>
              </tr>

              
        </table>

    </div>

    <p class="titulo">&nbsp;</p>
    <div class="datos_viaje">

          <table class="firmas">
                <tbody>
                
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
                <Button autoFocus color="inherit" onClick={this.CreatePDF}>
                  Descargar
                </Button>
              </Toolbar>
            </AppBar>
            
            <div id="cupon_pdf" dangerouslySetInnerHTML={{ __html: cupon}} />,
            
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
