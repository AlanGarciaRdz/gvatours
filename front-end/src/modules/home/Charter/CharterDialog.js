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
import PreviewHTML from './charter_html'
import {isMobileDevice} from '../../../utils/helpers';



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
        open: true,
        receipt: ``,
        charter_data: null,
        embed: ''
      }


      this.handleClickOpen = this.handleClickOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.getCharterData = this.getCharterData.bind(this);
      this.EmbededPDF = this.EmbededPDF.bind(this);
    }


    getCharterData = () =>{
          

      API.get(`/Charters/${queryString.parse(this.props.location.search).id}`)
          .then(res => {
            if (res.status === 200) {
               
                this.setState({charter_data: res.data[0]})
                var res = res.data[0]

                //   [
                //     {
                //         "uuid_charter": "36958a62-a7c3-49f6-83df-54d3e3959c22",
                //         "id_charter": 1191785,
                //         "data": {
                //             "clave": "AD  1241243",
                //             "ciudad": "test",
                //             "uuid_hotel": "c2a2359d-80b0-4058-8aa7-1443665af778",
                //             "fecha_salida": "",
                //             "uuid_agencia": "dd2e53a5-866b-43b9-b836-1ce79b31f8c5",
                //             "uuid_cliente": "d0f72adb-6f92-4eab-a927-24932193286c",
                //             "OBSERVACIONES": "observo",
                //             "fecha_regreso": "",
                //             "menores_cargo": "2",
                //             "folio_papeleta": "AD  1241243",
                //             "adultos_juniors": "1",
                //             "menores_sin_cargo": "3"
                //         },
                //         "status": "1",
                //         "created_at": "2021-01-31T06:00:00.000Z",
                //         "updated_at": "2021-01-31T06:00:00.000Z",
                //         "hotel": {
                //             "correo": "cabanas@guayabitos.com",
                //             "nombre": "Las Cabanas del Capitan2",
                //             "destino": "Rincón de Guayabitos",
                //             "telefono": "327 274 0304",
                //             "direccion": "Rtno. Jacarandas 88, Rincón de Guayabitos, 63724 Rincón de Guayabitos, Nay."
                //         },
                //         "cliente": {
                //             "correo": "agarcia@test.com",
                //             "nombre": "alan_update",
                //             "telefono": "3316954455",
                //             "direccion": "dato salida"
                //         },
                //         "travelagency": {
                //             "ciudad": "test",
                //             "correo": "test",
                //             "nombre": "nueva agencia",
                //             "contacto": "test",
                //             "telefono": "test"
                //         }
                //     }
                // ]
                  
                
                this.setState({PAPELETA: res.data.folio_papeleta})
                
                this.setState({CLIENTE_NOMBRE: res.cliente.nombre})
                this.setState({HOTEL: res.hotel.nombre})
                this.setState({DESTINO: res.hotel.destino})
                this.setState({FECHA_SALIDA: res.data.fecha_salida})
                this.setState({FECHA_REGRESO: res.data.fecha_regreso})   
                // ABORDA
                this.setState({ABORDA: res.data.aborda})   
                //pasajeros
                this.setState({adultos_juniors: res.data.adultos_juniors})   
                this.setState({menores_cargo: res.data.menores_cargo}) 
                this.setState({menores_sin_cargo: res.data.menores_sin_cargo})             
                
                this.setState({TRAVELAGENCY_NOMBRE: res.travelagency.nombre})
                this.setState({TRAVELAGENCY_TELEFONO: res.travelagency.telefono})
                this.setState({TRAVELAGENCY_CIUDAD: res.travelagency.ciudad})
                this.setState({AGENTE: res.data.agente ? res.data.agente : ''})

                this.setState({CLAVE: res.data.folio_papeleta})
                // INCLUYE
                this.setState({INCLUYE: res.data.incluye})   
                
                this.setState({redondo: res.data.redondo})   
                this.setState({OBSERVACIONES: res.data.OBSERVACIONES})   

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
   this.props.history.push('./Charters');
 }



  componentDidMount(){
    this.getCharterData()
    
  }

  

  GeneratePDF = () => {
    var {  receiptId, cantidad } = this.state

    var { PAPELETA , CLIENTE_NOMBRE, HOTEL , DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA,
      adultos_juniors, menores_cargo, menores_sin_cargo,
      TRAVELAGENCY_NOMBRE,TRAVELAGENCY_TELEFONO, TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE,
      redondo, OBSERVACIONES} = this.state 

    
      const doc = new jsPDF('p', 'pt', 'letter');
        
      CharterPDF.Header(doc, PAPELETA, cantidad)

      CharterPDF.Detalles(doc, CLIENTE_NOMBRE, HOTEL , DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
        adultos_juniors, menores_cargo, menores_sin_cargo, 
        TRAVELAGENCY_NOMBRE, TRAVELAGENCY_TELEFONO, TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE, 
        redondo, OBSERVACIONES)

      CharterPDF.pieCharter(doc)

        doc.save(`${PAPELETA}.pdf`);
    
  }

  EmbededPDF = () => {
    var {  cantidad } = this.state

    var { PAPELETA , CLIENTE_NOMBRE, HOTEL,DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA,
      adultos_juniors, menores_cargo, menores_sin_cargo,
      TRAVELAGENCY_NOMBRE,TRAVELAGENCY_TELEFONO, TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE,
      redondo, OBSERVACIONES} = this.state 

    
      const doc = new jsPDF('p', 'pt', 'letter');
        
      CharterPDF.Header(doc, PAPELETA, cantidad)

      CharterPDF.Detalles(doc, CLIENTE_NOMBRE, HOTEL,DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
        adultos_juniors, menores_cargo, menores_sin_cargo, 
        TRAVELAGENCY_NOMBRE, TRAVELAGENCY_TELEFONO, TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE, 
        redondo, OBSERVACIONES)

      CharterPDF.pieCharter(doc)

        
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

        var embed = PreviewHTML.setvariables(PAPELETA, CLIENTE_NOMBRE, HOTEL,DESTINO, FECHA_SALIDA, 
          FECHA_REGRESO, ABORDA, TRAVELAGENCY_NOMBRE , TRAVELAGENCY_CIUDAD, 
          CLAVE , INCLUYE, OBSERVACIONES , adultos_juniors, menores_cargo, menores_sin_cargo);
          console.log(embed)
        this.setState({embed});

        console.log(embed)
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
                  Charter
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
          <Charter />
        </div>
       )
       
     }

    }
      

}

export default withStyles(styles)(CharterDialog);
