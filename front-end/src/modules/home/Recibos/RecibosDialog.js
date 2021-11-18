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

import Cupon from './index'
import './RecibosDialog.css'

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import Logo from '../../../images/logo'
import ReciboPDF from '../../../utils/ReciboPDF';


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

                
                
                  this.EmbededPDF()
                
                
            }
          })

          
    }
 


  handleClickOpen = () => {
    this.setState({open: true})
  };

 

  handleClose = () => {
   this.setState({open: false})
   this.props.history.push('./Recibos');
 }



  componentDidMount(){

   this.getReceiptData()

  }

  EmbededPDF = () => {
    const doc = new jsPDF('p', 'pt', 'letter');
    var checkBox = new jsPDF.API.AcroFormCheckBox();
    var {
      folio,
      //datos contratante
      cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono,  
      //info
      destino, fecha_salida, hora_salida, hora_presentarse,  encargado, tel_encargado, direccion_salida, entre_calles, 
      colonia_ciudad, punto_referencia, fecha_regreso, hora_regreso, fecha_contrato, itinerario,
      //unidad
      tipo_unidad, capacidad,equipada, autorizador, vendedor,
      //pagos
      importe_total, anticipo, saldo
    } = this.state 
      
    
    ReciboPDF.Header(doc, folio)
    

    //datos contratante
    if(cliente_direccion === undefined) cliente_direccion = ''
    if(cliente_ciudad === undefined) cliente_ciudad = ''
    if(cliente_telefono === undefined) cliente_telefono = ''
    //info
    if(fecha_salida === undefined) fecha_salida = ''
    if(hora_salida === undefined) hora_salida = ''
    
    if(hora_presentarse === undefined) hora_presentarse = ''
    if(encargado === undefined) encargado = ''
    if(tel_encargado === undefined) tel_encargado = ''
    
    if(direccion_salida === undefined) direccion_salida = ''
    

    if(entre_calles === undefined) entre_calles = ''
    if(colonia_ciudad === undefined) colonia_ciudad = ''
    if(punto_referencia === undefined) punto_referencia = ''
    if(fecha_regreso === undefined) fecha_regreso = ''
    if(hora_regreso === undefined) hora_regreso = ''
    if(fecha_contrato === undefined) fecha_contrato = ''
    if(itinerario === undefined) itinerario = ''
    
    //unidad
    if(tipo_unidad === undefined) tipo_unidad = ''
    if(capacidad === undefined) capacidad = ''
    if(equipada === undefined) equipada = ''
    
    //pagos
    if(importe_total === undefined) importe_total = ''
    if(anticipo === undefined) anticipo = ''
    if(saldo === undefined) saldo = ''

    if(autorizador === undefined) autorizador = ''
    if(vendedor === undefined) vendedor = ''
    

    ReciboPDF.Detalles(doc, cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono
                        ,destino, fecha_salida, hora_salida, hora_presentarse,  encargado, tel_encargado, direccion_salida, entre_calles, colonia_ciudad
                        ,punto_referencia, fecha_regreso, hora_regreso,fecha_contrato, itinerario, tipo_unidad, capacidad,equipada,checkBox, vendedor,
                        importe_total, anticipo, saldo)

                        
    
      
      
      let data = doc.output('datauristring');
      // // doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
       doc.output('datauristring');        //returns the data uri string
      // // doc.output('datauri');              //opens the data uri in current window
      // // doc.output('dataurlnewwindow');     //opens the data uri in new window

      let iframe = `<iframe type="application/pdf" src="${data}#toolbar=0&navpanes=0" width="100%" height="1100px" frameborder="0"></iframe>`;

      this.setState({
        embed: iframe
      });

      // doc.save(`${folio}.pdf`);
    }

  

  GeneratePDF = () => {
    var {  nombre, receiptId, cantidad, concepto, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, reservacion, forma_pago, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO } = this.state
    //var { receiptId, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES, NOMBRE_PASAJERO, TOTAL_PAGADO, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE } = this.state
        ///https://artskydj.github.io/jsPDF/docs/jsPDF.html
        const doc = new jsPDF('p', 'pt', 'letter');
        
        ReciboPDF.Header(doc, receiptId, cantidad)

        ReciboPDF.Detalles(doc, nombre, cantidad, concepto, reservacion)

        

        // ReciboPDF.PagosRegistrados(doc, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE)

        // ReciboPDF.Fecha(doc, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES)
        // ReciboPDF.Cliente(doc, NOMBRE_PASAJERO, TOTAL_PAGADO)
        // ReciboPDF.Cuadros(doc, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE);

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

        const imgData = Logo;
        pdf.addImage(imgData, 'PNG', 5, 5);

        pdf.save(`Recibo.pdf`);
    })
  }
  
  

  

    render(){
      const { classes } = this.props;
      var {open, receipt, embed} = this.state;

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
                  Recibo
                </Typography>
                <Button autoFocus color="inherit" onClick={this.CreatePDF} >
                  Descargar
                </Button>
              </Toolbar>
            </AppBar>
            
            
              <div className="previewHTML" dangerouslySetInnerHTML={{ __html: this.state.embed}}/>
                        
            
            
          </Dialog>
        </div>
       )
     }else{
       return(
        <div>
          {/* <Contrato /> */}
        </div>
       )
       
     }

    }
      

}

export default withStyles(styles)(CuponDialog);
