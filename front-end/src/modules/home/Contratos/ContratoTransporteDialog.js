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

import Contrato from './index'
import './ContratoTransporte.css'

import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import charter from '../../../images/charter'


//import PreviewHTML from './charter_html'
import {isMobileDevice} from '../../../utils/helpers';



import API from "../../../utils/API";
import ContratoPDF from '../../../utils/ContratoPDF';


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

class ContratoTransporteDialog extends React.Component{

   constructor(props){
      super(props)
      this.state = {
        open: true,
        receipt: ``,
        charter_data: null,
        embed: ''
      }


      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.getDataContrato = this.getDataContrato.bind(this);
      this.EmbededPDF = this.EmbededPDF.bind(this);
    }


    getDataContrato = () =>{


      API.get(`/TransportC/${queryString.parse(this.props.location.search).id}`)
          .then(res => {
            if (res.status === 200) {

              this.setState({contrato: res.data[0]})
              var contrato = res.data[0]
              console.log(contrato)
              
              
              this.setState({folio: contrato.data.folio ? '' : '' })
              this.setState({cliente_nombre: contrato.data.cliente_nombre})
              this.setState({cliente_direccion: contrato.data.cliente_direccion})
              this.setState({cliente_ciudad: contrato.data.cliente_ciudad})
              this.setState({cliente_telefono: contrato.data.cliente_telefono})

              this.setState({destino: contrato.data.destino})
              this.setState({fecha_salida: contrato.data.fecha_salida})
              this.setState({hora_salida: contrato.data.hora_salida})
              this.setState({hora_presentarse: contrato.data.hora_presentarse})

              this.setState({encargado: contrato.data.encargado})
              this.setState({direccion_salida: contrato.data.direccion_salida})
              this.setState({entre_calles: contrato.data.entre_calles})
              this.setState({colonia_ciudad: contrato.data.colonia_ciudad})
              this.setState({punto_referencia: contrato.data.punto_referencia})
              this.setState({fecha_regreso: contrato.data.fecha_regreso})
              this.setState({hora_regreso: contrato.data.hora_regreso})
              this.setState({fecha_contrato: contrato.data.fecha_contrato})

              this.setState({tipo_unidad: contrato.data_vehicle.tipo_unidad})
              this.setState({capacidad: contrato.data_vehicle.capacidad})
              this.setState({equipada: contrato.data_vehicle.equipada})
              

              this.setState({importe_total: contrato.data.importe_total})
              this.setState({anticipo: contrato.data.anticipo})
              this.setState({saldo: contrato.data.saldo})


                

                if(isMobileDevice()){
                  this.EmbededHTML()
                }else{
                  this.EmbededPDF()
                }
                
                
            }

          })

          
    }
 


  handleClickOpen = () => {
    this.setState({open: true})
  };

 

  handleClose = () => {
   this.setState({open: false})
   this.props.history.push('./Contratos');
 }



  componentDidMount(){
    this.getDataContrato()
    
  }

  

  GeneratePDF = () => {
    var {  receiptId, cantidad } = this.state

    var {
      folio,
      //datos contratante
      cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono,  
      //info
      destino, fecha_salida, hora_salida, hora_presentarse,  encargado, direccion_salida, entre_calles, colonia_ciudad, punto_referencia, fecha_regreso, hora_regreso, 
      //pagos
      fecha_contrato,  importe_total, anticipo, saldo
    } = this.state 
      
    
      const doc = new jsPDF('p', 'pt', 'letter');
      
        
      ContratoPDF.Header(doc, folio)

      // ContratoPDF.Detalles(doc, CLIENTE_NOMBRE, HOTEL , DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
      //   adultos_juniors, menores_cargo, menores_sin_cargo, 
      //   TRAVELAGENCY_NOMBRE, TRAVELAGENCY_TELEFONO, TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE, 
      //   redondo, OBSERVACIONES, LOGOAGENCIA)

      // ContratoPDF.pieCharter(doc)

        doc.save(`${folio}.pdf`);
    
  }

  EmbededPDF = () => {
      const doc = new jsPDF('p', 'pt', 'letter');
      var checkBox = new jsPDF.API.AcroFormCheckBox();
      var {
        folio,
        //datos contratante
        cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono,  
        //info
        destino, fecha_salida, hora_salida, hora_presentarse,  encargado, direccion_salida, entre_calles, colonia_ciudad, punto_referencia, fecha_regreso, hora_regreso, fecha_contrato,
        //unidad
        tipo_unidad, capacidad,equipada,
        //pagos
        importe_total, anticipo, saldo
      } = this.state 
        
      ContratoPDF.Header(doc, "Folio")
      ContratoPDF.Detalles(doc, cliente_nombre, cliente_direccion, cliente_ciudad, cliente_telefono
                          ,destino, fecha_salida, hora_salida, hora_presentarse,  encargado, direccion_salida, entre_calles, colonia_ciudad
                          ,punto_referencia, fecha_regreso, hora_regreso,fecha_contrato, tipo_unidad, capacidad,equipada,checkBox,
                          importe_total, anticipo, saldo)
                          
      ContratoPDF.condiciones(doc)
        
        
        let data = doc.output('datauristring');
        // doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
        // doc.output('datauristring');        //returns the data uri string
        // doc.output('datauri');              //opens the data uri in current window
        // doc.output('dataurlnewwindow');     //opens the data uri in new window

        let iframe = `<iframe type="application/pdf" src="${data}#toolbar=0&navpanes=0" width="100%" height="1100px" frameborder="0"></iframe>`;

        this.setState({
          embed: iframe
        });
  }

  EmbededHTML = () => {
    var {  PAPELETA, CLIENTE_NOMBRE, HOTEL,DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
      TRAVELAGENCY_NOMBRE , TRAVELAGENCY_CIUDAD, CLAVE , INCLUYE, OBSERVACIONES, adultos_juniors, menores_cargo, menores_sin_cargo } = this.state

        // var embed = PreviewHTML.setvariables(PAPELETA, CLIENTE_NOMBRE, HOTEL,DESTINO, FECHA_SALIDA, 
        //   FECHA_REGRESO, ABORDA, TRAVELAGENCY_NOMBRE , TRAVELAGENCY_CIUDAD, 
        //   CLAVE , INCLUYE, OBSERVACIONES , adultos_juniors, menores_cargo, menores_sin_cargo);
        //   console.log(embed)
        // this.setState({embed});

        // console.log(embed)
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
                  Contrato
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

export default withStyles(styles)(ContratoTransporteDialog);
