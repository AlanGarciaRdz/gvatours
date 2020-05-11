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

import Contrato from './index'
import './ContratoTransporte.css'


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

class ContratoTransporte extends React.Component{

   constructor(props){
      super(props)
      this.state = {
        open: true,
        cupon: ``,
        cupon_data: null
      }


      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.getContratoData = this.getContratoData.bind(this);
    }


    getContratoData = () =>{
          
      if(queryString.parse(this.props.location.search).id !== undefined){
        API.get(`/TransportC/${queryString.parse(this.props.location.search).id}`)
          .then(res => {
            if (res.status === 200) {
                this.setState({cupon_data: res.data[0]})
                console.log(this.state.cupon_data)
                var data = res.data[0]
                // this.setState({receiptId: data ? data.uuid_cupon.split('-')[2]+'-'+data.uuid_cupon.split('-')[3]: ''})
                // this.setState({DESTINO: data.hotel.destino})
                // this.setState({HOTEL: data.hotel.nombre})
                // this.setState({DIRECCION_HOTEL: data.hotel.direccion})
                // this.setState({TELEFONO_HOTEL: data.hotel.telefono})
                // this.setState({FECHA_ENTRADA: data.data.fecha_entrada})
                // this.setState({FECHA_SALIDA: data.data.fecha_salida})
                // this.setState({TOTAL_NOCHES: ''})
                // this.setState({NOMBRE_PASAJERO: data.cliente.nombre})
                // this.setState({TOTAL_PAGADO: data.data.Total_Pagado})
                // this.setState({NUM_HABITACIONES: data.data_rooms.numero_habitaciones})
                // this.setState({NOMBRE_AGENCIA: data.travelagency.nombre})
                //  this.setState({NUM_SGL: data.data_rooms.adultos.SGL})
                // this.setState({NUM_DBL: data.data_rooms.adultos.DBL})
                // this.setState({NUM_TPL: data.data_rooms.adultos.TPL ? data.data_rooms.adultos.TPL : ''})
                //  this.setState({NUM_CPL: data.data_rooms.adultos.DBL})
                //  this.setState({CIUDAD_AGENCIA: data.travelagency.ciudad})
                // this.setState({MEN_CC: data.data_rooms.menores.CC})
                // this.setState({MEN_SC: data.data_rooms.menores.SC})
                //  this.setState({MEN_JR: data.data_rooms.menores.JR})
                // this.setState({TELEFONO_AGENCIA: data.travelagency.telefono })
                // this.setState({PLAN_CONTRATADO: data.data_travelA.plancontratado ? data.data_travelA.plancontratado : ''})
                // this.setState({CONTACTO_AGENCIA: data.travelagency.contacto})
                //  this.setState({CONFIRMADO_POR: data.data_travelA.confirmadopor ? data.data_travelA.confirmadopor : ''})
                // this.setState({OBSERVACIONES: data.data_travelA.observaciones})
                // this.setState({CLAVE: data.uuid_cupon.split('-')[2]+'-'+data.uuid_cupon.split('-')[3]})
            }
          })
      }else{
        //TODO
        this.handleClose()
      }
      
    }
 

  handleClickOpen = () => {
    this.setState({open: true})
  };

 

  handleClose = () => {
   this.setState({open: false})
   this.props.history.push('./Contrato');
 }



  componentDidMount(){
   this.getContratoData()
  }

  
  

  

    render(){
      
      const { classes } = this.props;
      var {open, contrato, email} = this.state;

      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

      if(open){
        

        // var { email, name, receiptId, cantidad, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, GRUPOS, EFECTIVO, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = {email: "agarcia@prueba.com", name: "name", receiptId: "receiptId", cantidad:"cantidad", CANTIDAD_EN_LETRA:"CANTIDAD_EN_LETRA", DEPOSITO_EN_GARANTIA:"DEPOSITO_EN_GARANTIA", GRUPOS:"GRUPOS", EFECTIVO:"EFECTIVO", importe_total:"importe_total", PAGOS_REGISTRADOS:"PAGOS_REGISTRADOS", SALDO_PENDIENTE:"SALDO_PENDIENTE", DESCRIPCION_DEL_SERVICO:"DESCRIPCION_DEL_SERVICO"}

        var { uuid_contract, fecha_contrato,
          cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono, 
          destino, fecha_salida, hora_salida, hora_presentarse, encargado, direccion_salida, entre_calles, colonia_ciudad, punto_referencia, itinerario, fecha_regreso, hora_regreso, movimientos,
          data_vehicle_tipo_unidad, data_vehicle_capacidad,  data_vehicle_Equipada, 
          importe_total, anticipo, saldo} = this.state


    var contrato = `
    <table class="header">
    <tbody>
    <tr>
    <td><img  src="https://transportamex-production-bucket-1ll3nrbfgiob8.s3.amazonaws.com/2016/08/GVA-Tours1.jpg"
       style="display: block;
       margin-left: auto;
       margin-right: auto;
       width: 50%; width:100%; max-width:200px;"></td>
       <td style="text-align: center;">Contrato de Prestacion de Servicios "Transporte"</td>
    <td>
       <div class="div_folio">
             <table class="folio">
                   <tbody>
                   <tr>
                   <td>Folio</td>
                   </tr>
                   <tr>
                   <td>&#8470; ${uuid_contract}</td>
                   </tr>
                   </tbody>
                </table>
       </div>
       

    </td>
    </tr>
    </tbody>
    </table>

 <p class="titulo">DATOS DEL CONTRATANTE</p>
 <div class="datos_contratante_div">
       <table class="datos_del_contratante">
             <tbody>
             <tr>
             <td id="etiqueta">NOMBRE</td>
             <td>${cliente_nombre}</td>
             </tr>
             <tr>
             <td id="etiqueta">DIRECCIÓN</td>
             <td>${cliente_direccion} </td>
             </tr>
             <tr>
             <td id="etiqueta">CIUDAD</td>
             <td>${cliente_ciudad}</td>
             </tr>
             <tr id="sin_borde_inferior">
             <td id="etiqueta">TELEFONO</td>
             <td id="sin_borde_inferior">${cliente_telefono}</td>
             </tr>
             </tbody>
             </table>
 </div>



 <p class="titulo">DATOS DE SALIDA Y REGRESO DEL VIAJE</p>
 <div class="datos_viaje">
       <table class="datos_salida">
             <tbody>
             <tr>
             <td id="etiqueta_general">DESTINO</td>
             <td>${destino}</td>
             <td id="etiqueta_general">FECHA DE SALIDA</td>
             <td>${fecha_salida}</td>
             </tr>
             <tr>
             <td id="etiqueta_general">HORA DE SALIDA</td>
             <td>${hora_salida}</td>
             <td id="etiqueta_general">PRESENTARSE</td>
             <td>${hora_presentarse}</td>
             </tr>
             <tr>
             <td colspan="2" id="etiqueta_general">ENCARGADO DE LA UNIDAD</td>
             <td>${encargado}</td>
             </tr>
             <tr>
             <td colspan="2" id="etiqueta_general">DIRECCION DE SALIDA</td>
             <td>${direccion_salida}</td>
             </tr>
             <tr>
             <td colspan="2" id="etiqueta_general">ENTRE LAS CALLES</td>
             <td>${entre_calles}</td>
             </tr>
             <tr>
             <td colspan="2" id="etiqueta_general">COLONIA Y CIUDAD</td>
             <td>${colonia_ciudad}</td>
             </tr>
             <tr>
             <td colspan="2" id="etiqueta_general">PUNTO DE REFERENCIA</td>
              <td>${punto_referencia}</td>
             </tr>
             
             <tr>
             <td colspan="2" id="etiqueta_general">ITINEARIO</td>
              <td>${itinerario}</td>
             </tr>

             <tr>
             <td colspan="2" id="etiqueta_general">IMPORTANTE: TRASLADO O PASEO EXTRA NO ESPECIFICADOK TIENE COSTO EXTRA Y TENDRA QUE SER LIQUIDADO AL MOMENTO DE REALIZARLO DIRECRO CON EL OPERADOR</td></tr>
             <tr id="sin_borde_inferior">
             <td id="etiqueta_general">FECHA DE REGRESO</td>
             <td>${fecha_regreso}</td>
             <td id="etiqueta_general">HORA DE REGRESO</td>
             <td>${hora_regreso}</td>
             </tr>
             </tbody>
             </table>

 </div>

 <p class="titulo">CARACTERISTICAS DE LA UNIDAD CONTRATADA</p>
 <div class="datos_viaje">
    <table class="unidad_contratada">
       <tbody>
       <tr>
          <td id="etiqueta_general">TIPO DE UNIDAD:</td>
          <td>${data_vehicle_tipo_unidad}</td>
          <td id="etiqueta_general">CAPACIDAD:</td>
          <td>${data_vehicle_capacidad}</td>
          <td id="etiqueta_general">FECHA DE CONTRATO:</td><td>${fecha_contrato} </td>
       </tr>
       <tr>
       <td colspan="3" id="etiqueta_general">UNIDAD EQUIPADA CON:</td>
       <tr>
          <td id="etiqueta_general">AIRE ACONDICIONADO</td>
          <td id="etiqueta_general">STEREO</td>
          <td id="etiqueta_general">SANITARIO</td>
       </tr>
       <tr>
          <td id="etiqueta_general">TV/DVD</td>
          <td id="etiqueta_general">MICROFONO GUIA</td>
          <td id="etiqueta_general">OTROS:   </td>
       </tr>
       <tr id="sin_borde_inferior">
       <!-- <td>cell1_3</td><td>cell2_3</td><td>cell3_3</td></tr> -->
       
       </tbody>
       </tr>
       </table>

 </div>

 <p class="titulo">PAGOS</p>
 <div class="datos_viaje">
       
    <table class="pagos">
       <tbody>
       <tr>
       <td id="etiqueta_general">IMPORTE TOTAL:</td>
       <td id="etiqueta_general">${importe_total}</td>
       </tr>
       <tr>
       <td id="etiqueta_general">ANTICIPO:</td>
       <td id="etiqueta_general">${anticipo}</td>
       </tr>
       <tr id="sin_borde_inferior">
       <td id="etiqueta_general">SALDO:</td>
       <td id="etiqueta_general">${saldo}</td>
       </tr>
       </tbody>
    </table>

 </div>

 
 <div class="datos_viaje">

       <table class="firmas">
             <tbody>
             <tr>
             <td colspan="2"><p id="etiqueta_general">Derivado del Servicio de Transporte Terrestre que solicité a la empresa GVA Tours S.A. de C.V. y una vez que he leido el tota lde las condicioanes que se adjuntan al presente contrato, estoy de acuerdo con el total de su contenido.</p></td></tr>
             <tr><td></td></tr>
             <tr><td></td></tr>
             <tr><td></td></tr>
             <tr><td></td></tr>
             <tr>
                <td>
                   <p id="etiqueta_general_firma" class="firma"> NOMBRE Y FIRMA DE ACEPTACION DEL CIENTE</p>
                </td>
                <td>
                      <p id="etiqueta_general_firma" class="firma"> NOMBRE Y FIRMA DEL PRESTADOR DE SERVICIOS   </p>
                </td>
             </tr>
             <tr>
             <td>&nbsp;</td><td><p id="etiqueta_general"> TELEFONO DE EMERGENCIA:   </p></td></tr>
             </tbody>
             </tr>
             </table>
 </div>

 <p id="nota_importante" >NOTA IMPORTANTE: A la firma del contrato debera cubrirse el 30% del importe total, y el saldo una semana antes de la realizacion del viaje. </p>
  

<div class="div_clausulas">
    <table class="clausulas" >
          <tbody>
          <tr>
          <td colspan="2" style="text-align: center; padding-top: 10px;"><p class="titulo">CLAUSULAS</p></td>
          </tr>
          <tr >
          <td>
             <p id="clausula_text">1. Los pasajeros se comprometen a respetar los horarios e itinerarios estipulados tanto de salidas como de Ilegadas, de no ser asi se le cobrarå al contratante el tiempo excedente proporcionalmente a 10 estipulado en este contrato, por 10 que en caso de ampliar la ruta, el horario o cualquier modificaciön al kilometraje acordado, en el presente contrato, serå cubierto con una cantidad adicional fijada por la empresa transportista en la ciudad donde se celebrö el contrato. </p>

             <p id="clausula_text">2. Cuando el contratante cancela este contrato tendrå derecho al importe total del mismo, siempre y cuando 10 haga con un minimo de 15 dias antes de la fecha y horario establecido de salida. Si el aviso de cancelaciön se realiza entre 14 a 10 dias la sanciön serå del 30%, si es de 9 a 5 dias la sanciön serå del 50% y de 4 dias a la fecha y hora de salida serå del 100%. Esto mismo aplica para la cancelaciön de los servicios adicionales contratados. El aviso de cancelaciön deberå darse por escrito y con acuse de recibido. </p>
             
             <p id="clausula_text">3.Si el contratante interrumpiera su viaje en un lugar u horariO intermedio de 10 acordado en el presente contrato por causas no imputables a GVA Tours S.A. de el cliente NO tendrå derecho al reembolso. </p>
             
             <p id="clausula_text">4. El nümero de pasajeros en ningün caso deberå exceder la capacidad autorizada del vehiculo que se contrate, de 10 contrario GVATours S.A.de C.V. solo estarå obligado a aceptar y realizar el viaje con la capacidad de personas previamente establecida en el contrato. Si aün asi el contratante continuara exigiendo el servicio y a voluntad de GVA Tours S.A. de C.V. se realizara el mismo.El contratante de harå responsable de todas y cada una de las sanciones que la Secretaria de Comunicacio- nes y Transportes o cualesquiera Otra autoridad aplique al respecto, sin responsabilidad para GVA Tours S.A. de C.V. 5. En el caso en que la unidad contratada no se presente en el lugar y fecha establecidos, la empresa GVA Tours SA. de C.V., queda obligada a devolver el importe cobrado; el contratante no podrå exigir una mayor cantidad a la expresada en el presente contrato.</p>
             
             </td>
          <td>
             <p id="clausula_text">5. En el caso en que la unidad contratada no se presente en el lugar y fecha establecidos, la empresa GVA Tours S.A. de C.V., queda obligada a devolver el importe cobrado; el contratante no podrå exigir una mayor cantidad a la expresada en el presente contrato.</p>

             <p id="clausula_text">6. GVA Tours SA de C.V. no se hace responsable de dahos o perjuicios que se provoquen al contratante por retrasos en Ilegada o salida de cualquiera de los puntos senalados en el contrato debido a las fallas mecånicas, condiciones desfavo- rabies del tiempo, impedimento de pasos, revisiones oficiales y otras causas de fuerza mayor. </p>

             <p id="clausula_text">7. Se prohibe al contratante conjuntamente con los pasajeros ingerir bebidas alcohölicas y/o drogas durante el trayecto del viaje. La empresa se reserva el derecho de trasportaciön de esta (s) persona (s). </p>

             <p id="clausula_text">8. Los dahos ocasionados al autobüs por negligencia o culpa directa del contratante o pasajeros, serån cobrados en su totalidad al contratante. </p>

             <p id="clausula_text">9. GVA Tours S.A. de C.V. no se hace responsable por objetos olvidados en el autobüs por alguno de los pasajeros. </p>

             <p id="clausula_text">10. Los autobuses no pueden entrar en caminos estrechos o d terraceria que pongan en peligro la unidad. Cualquier daho perjuicio por insistencia del cliente sera cobrada en su totalidad. </p>

             <p id="clausula_text">11. Por disposiciones de la Secretaria de Hacienda y Créd Püblico, las empresas de autotransporte estarån sujetas régimen simplificado segün el articulo 67 de titulo IIA de Ia del impuesto sobre la renta. La empresa transportadora reflejarå el IVA en su facturaciön, de acuerdo al articulo 15 impuesto del valor agregado. </p>

             <p id="clausula_text">12. En caso de requerirse alguna modificaciön en el itinerario horario autorizo a para que realice los tråmites necesarios que procedan originad por dichas modificaciones Ia contrato. </p>

             <p id="clausula_text">13. GVA Tours S.A. de C.V. se obliga en caso de descompostura reemplazar la unidad con caracteristicas semejantes a contratada, en un plazo de tiempo igual al tiempo de recorrido del punto de descompostura a Ia base de la empresa en ciudad de Guadalajara.</p>


          </td>
          </tr>
          <tr>
          <td colspan="3"><a href="www.gvatours.com">www.gvatours.com</a></td>
          </tr>
          <tr>
             <td colspan="3"><a href="mailto:info@gvatours.com">info@gvatours.com</a></td>
          </tr>
          </tbody>
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
                  Contrato
                </Typography>
                <Button autoFocus color="inherit" >
                  Descargar
                </Button>
              </Toolbar>
            </AppBar>
            
            <div dangerouslySetInnerHTML={{ __html: contrato}} />,
            
          </Dialog>
        </div>
       )
     }else{
       return(
        <div>
          <Contrato />
        </div>
       )
       
     }

    }
      

}

export default withStyles(styles)(ContratoTransporte);
