/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import API from "../../utils/API";

class FindRelation extends React.Component{

  constructor(props){
    super(props)
    
    

    this.state = {
      value: null,
      setValue: null,
      open: false,
      toggleOpen: false,
      dialogValue: {
                    nombre_cupon: '',
                    correo: ''
                   },
      Clients: [],
    }



    this.filter = createFilterOptions();


    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getClients = this.getClients.bind(this);
    this.onAddCupons = this.onAddCupons.bind(this);
    this.addClient = this.addClient.bind(this);
    
}



  
  handleClose = () => {
    this.setState({dialogValue:{
              nombre_cupon: '',
              correo: ''
              }
            });
    this.setState({toggleOpen: false});
    this.setState({value: ''})
  };

  handleSubmit = event => {
    const {dialogValue} = this.state;

    event.preventDefault();
    this.setState({setValue:{
      nombre_cupon: dialogValue.nombre_cupon,
      correo: dialogValue.correo,
    }

    });

    // console.log(dialogValue.nombre_cupon)
    
    this.addClient();
    
    this.handleClose();
  };

  componentDidUpdate(){
    const open = this.state;
    // console.log(open)

    //this.getClients();
  }

  componentDidMount(){
    this.getCupons();
  }



getCupons(){
  let {uuid_client} = this.state
  uuid_client = 'b508b579-9cef-410b-a6ac-2fec2a6353c6'

  console.log(`Get cupones x cliente ${uuid_client}`)

  API.get(`/ClientCupon/${uuid_client}`).then(res => {
    
    try{
      if(res.data[0].hasOwnProperty('data')){
        res.data.map(row => ( 
          this.onAddCupons(row.uuid_cupon, row.data.Total_Venta, row.data_travelA.confirmadopor)
          
        ))
        // console.log(this.state.Cupons)
      }
    }catch(error){
      console.error("400 Cupons")
      return "400 Cupons"
    }
 })
}

onAddCupons(uuid_cupon, Total_Venta, correo){
    // console.log(uuid_client, nombre, correo)
    this.setState(state => {
        const list = state.Clients.push({nombre_cupon: uuid_cupon,  Total_Venta, correo: correo});
        return {
          list,
          value: '',
        };
      });
  }

  getClients(){
    API.get(`/clients`).then(res => {
      try{
        if(res.data[0].hasOwnProperty('data')){
          res.data.map(row => ( 
            this.onAddClient(row.uuid_client, row.data.nombre, row.data.correo)
            
          ))
          // console.log(this.state.Clients)
        }
      }catch(error){
        console.error("400 Clients")
        return "400 Clients"
      }
   })
 }

 addClient(){
  const data = {
    "data": {
      "nombre": `${this.state.dialogValue.nombre_cupon}`,
      "direccion": "",
      "ciudad": "",
      "telefono": "",
      "correo": `${this.state.dialogValue.correo}`
    }
  }

  API.post(`/clients/`, data).then(res => {
    
    console.log(data.data)
    try{
      
      console.log(res)
      this.setState({value: res.data.data.nombre});    
      this.props.updateCupon(res.data.uuid_client)
      this.onAddClient(res.data.uuid_client, res.data.data.nombre, res.data.data.correo)

    }catch(error){
      console.error("400 Clients")
      console.error(error)
      return "400 Clients"
    }
 })
}

  render(){
    const {value, dialogValue, toggleOpen  } = this.state;
    return (
      <div>

        <Autocomplete
          value={value}
          fullWidth
          autoComplete="fname"
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                this.setState({ toggleOpen: true })
                this.setState({dialogValue: {
                  nombre_cupon: newValue,
                  correo: '',
                }});
              });
              return;
            }
  
            if (newValue && newValue.inputValue) {
              this.setState({ toggleOpen: true })
              this.setState({dialogValue: {
                nombre_cupon: newValue.inputValue,
                correo: '',
              }});
  
              return;
            }
  
            this.setState({setValue: newValue});
          }}


          filterOptions={(options, params) => {
            const filtered = this.filter(options, params);
  
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                nombre_cupon: `Agregar "${params.inputValue}"`,
              });
            }
            return filtered;
          }
         }

          id="Cupones"
          options={this.state.Clients}
          getOptionLabel={option => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            

            this.setState({value: option.nombre_cupon});

            //this.props.updateCupon(option.uuid_cupon)
            
            return option.nombre_cupon;
          }
          }
          renderOption={option => option.nombre_cupon }
          fullWidth
          renderInput={params => (
            <TextField {...params} label="Cupones" variant="outlined" />
          )}
          
        />
        
        <Dialog open={toggleOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Agregar Cliente</DialogTitle>
            <DialogContent>
              <DialogContentText>
                No encontraste un Cliente? Por favor, agregala!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.nombre_cupon}
                onChange={event => this.setState({dialogValue: {...dialogValue, nombre_cupon: event.target.value }})}
                label="nombre"
                type="text"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.correo}
                onChange={event => this.setState({dialogValue: {...dialogValue, correo: event.target.value }})}
                label="correo"
                type="text"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button type="submit" onClick={this.handleSubmit} color="primary">
                Agregar
              </Button>
            </DialogActions>

           
          </form>

          
          
        </Dialog>
        </div>
    );

  }

  }

  export default FindRelation;

  














