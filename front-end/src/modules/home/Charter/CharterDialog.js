import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import queryString from 'query-string';

import Charter from './index'
import './CharterDialog.css'

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import charter from '../../../images/charter'

import CharterPDF from '../../../utils/CharterPDF';
import charterHTML from './pdf_html'


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

class CharterDialog extends React.Component{

   constructor(props){
      super(props)
      this.state = {
        // open: true,
        // cupon: ``,
        // receipt_data: null,
        // email: "agarcia@prueba.com", name: "alan", receiptId: "receiptId", cantidad:"cantidad", CANTIDAD_EN_LETRA:"CANTIDAD_EN_LETRA", DEPOSITO_EN_GARANTIA:"DEPOSITO_EN_GARANTIA", reservacion:"reservacion", forma_pago:"forma_pago", importe_total:"importe_total", PAGOS_REGISTRADOS:"PAGOS_REGISTRADOS", SALDO_PENDIENTE:"SALDO_PENDIENTE", DESCRIPCION_DEL_SERVICO:"DESCRIPCION_DEL_SERVICO"
        open: true,
        receipt: ``,
        receipt_data: null
      }


      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.getReceiptData = this.getReceiptData.bind(this);
    }


    getReceiptData = () =>{
          

      API.get(`/Receipts/${queryString.parse(this.props.location.search).id}`)
          .then(res => {
            if (res.status === 200) {
               
                this.setState({receipt_data: res.data[0]})
                console.log(this.state.receipt_data)

                var data = res.data[0]
                
                

                this.setState({receiptId: data.uuid_receipt.split('-')[2]+'-'+data.uuid_receipt.split('-')[3]})
                this.setState({nombre: data.cliente.nombre})
                this.setState({cantidad: data.data.cantidad})
                this.setState({concepto: "Concepto"})
                
                this.setState({reservacion: "SERVICIO"})
                this.setState({DEPOSITO_EN_GARANTIA: data.data.cantidad})
                this.setState({forma_pago: data.data.forma_pago})
                this.setState({importe_total: ""})
                this.setState({PAGOS_REGISTRADOS: ""})
                this.setState({SALDO_PENDIENTE: ''})
                this.setState({DESCRIPCION_DEL_SERVICO: ''})

                console.log(data)
            }
          })

          
    }
 


  handleClickOpen = () => {
    this.setState({open: true})
  };

 

  handleClose = () => {
   this.setState({open: false})
   this.props.history.push('./Charters');
 }



  componentDidMount(){

  //  this.getReceiptData()

  }

  

  GeneratePDF = () => {
    var {  nombre, receiptId, cantidad, concepto, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, reservacion, forma_pago, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = this.state

    var { hotel, fecha_salida, fecha_regreso, aborda_horario, 
      total_adultos_junior, menores_cargo, menores_sincargo, 
      agencia, ciudad, telefono, clave_reservacion, contacto, 
      observaciones, detalles}  = this.state
    //var { receiptId, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES, NOMBRE_PASAJERO, TOTAL_PAGADO, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE } = this.state
        ///https://artskydj.github.io/jsPDF/docs/jsPDF.html
        const doc = new jsPDF('p', 'pt', 'letter');
        
        CharterPDF.Header(doc, receiptId, cantidad)

        CharterPDF.Detalles(doc, nombre, hotel, fecha_salida, fecha_regreso, aborda_horario, 
          total_adultos_junior, menores_cargo, menores_sincargo, 
          agencia, ciudad, telefono, clave_reservacion, contacto, 
          observaciones, detalles)

        CharterPDF.pieCharter(doc)

        

        // CharterPDF.FormaPago(doc, forma_pago)

        // CharterPDF.PagosRegistrados(doc, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE)

        // CharterPDF.Fecha(doc, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES)
        // CharterPDF.Cliente(doc, NOMBRE_PASAJERO, TOTAL_PAGADO)
        // CharterPDF.Cuadros(doc, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE);

        doc.save(`${receiptId}.pdf`);
    
  }

  CreatePDF = () => {

    this.GeneratePDF()
    //this.DownloadImage()
  }


  DownloadImage = () => {
      
      
    html2canvas(document.querySelector('#recibo_pdf')).then(canvas =>  {
        document.body.appendChild(canvas)
        const divImage = canvas.toDataURL("image/png");
        const pdf = new jsPDF('p', 'pt', 'letter');
        
        // A Letter size page measures 215.9 × 279.4 millimeters or 8.50 × 11.00 inches. In PostScript, its dimensions are 612 × 792 points.

        ///https://stackoverflow.com/questions/56644474/html2canvas-and-react-to-generate-pdf-doesnt-work
        const w = window.innerWidth;
        console.log()
        
        pdf.addImage(divImage, 'PNG', 5 , 5, 300, 250 );

        const imgData = charter;
        pdf.addImage(imgData, 'PNG', 5, 5);

        pdf.save(`Recibo.pdf`);
    })
  }
  
  

  

    render(){
      const { classes } = this.props;
      var {open, receipt} = this.state;

      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

      if(open){

    var {  nombre, receiptId, cantidad, concepto, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, reservacion, forma_pago, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = this.state

    
  
    var receipt = charterHTML;
        return(
          <div> 

           
 
          <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton> 
                <Typography variant="h6" className={classes.title}>
                  Charter
                </Typography>
                <Button autoFocus color="inherit" onClick={this.CreatePDF} >
                  Descargar
                </Button>
              </Toolbar>
            </AppBar>
            
            <div dangerouslySetInnerHTML={{ __html: receipt}} />,
            
          </Dialog>
        </div>
       )
     }else{
       return(
        <div>
          <Charter />
        </div>
       )
       
     }

    }
      

}

export default withStyles(styles)(CharterDialog);
