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
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

class AutocompleteSelect extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      value: null,
      setValue: null,
      open: false,
      toggleOpen: false,
      dialogValue: {
                    item: '',
                    destino: ''
                   },
      Items: [],
    }



    this.filter = createFilterOptions();


    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getItems = this.getItems.bind(this);
    this.onAddItems = this.onAddItems.bind(this);
    this.addHotel = this.addHotel.bind(this);
    
}



  
  handleClose = () => {
    this.setState({dialogValue:{
              item: '',
              destino: ''
              }
            });
    this.setState({toggleOpen: false});
  };

  handleSubmit = event => {
    const {dialogValue} = this.state;

    event.preventDefault();
    this.setState({setValue:{
      item: dialogValue.item,
      destino: dialogValue.destino,
    }
    });

    this.addHotel();
    
    this.handleClose();
  };

  componentDidUpdate(){
    const open = this.state;
    console.log("uupdate")
    
    if(this.props.value !== ""){
      console.log(open)
      if(this.props.value !== this.state.value){
        
        this.props.updateItem(this.state.value, this.props.name)
        this.setState({value: this.props.value});
      }
    }
    
  }

  componentDidMount(){
    this.getItems(this.props.items, this.props.name);
    
  }

  onAddItems(item, index){
    
    this.setState(state => {
        const list = state.Items.push({item: item,  index, destino: item});
        return {
          list,
          value: '',
        };
      });

      
  }

  getItems(items, name){
      try{
        if(items.length){
          
          items.map((item, index) => ( 
            this.onAddItems(item, index)
          ))
        }
      }catch(error){
        console.error(`400 NO ITEMS on ${name}`)
        return "400 ITEMS"
      }
   
 }

 addHotel(){
  
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
                  item: newValue,
                  destino: '',
                }});
              });
              return;
            }
  
            if (newValue && newValue.inputValue) {
              this.setState({ toggleOpen: true })
              this.setState({dialogValue: {
                item: newValue.inputValue,
                destino: '',
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
                item: `Agregar "${params.inputValue}"`,
              });
            }
            return filtered;
          }
         }

          id={this.props.name}
          options={this.state.Items}
          getOptionLabel={option => {
            
            
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            
            this.setState({value: option.item});

            this.props.updateItem(option.item, this.props.name)

            return option.item;
          }
          }
          renderOption={option => option.item }
          fullWidth
          renderInput={params => (
            <TextField {...params} label={this.props.label} variant="outlined" />
          )}
          
        />
        
        {/* <Dialog open={toggleOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Agregar hotel</DialogTitle>
            <DialogContent>
              <DialogContentText>{`No encontraste un ${this.props.label} Por favor, agregalo!`} </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.item}
                onChange={event => this.setState({dialogValue: {...dialogValue, item: event.target.value }})}
                label="nombre"
                type="text"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.destino}
                onChange={event => this.setState({dialogValue: {...dialogValue, destino: event.target.value }})}
                label="Destino"
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
          
        </Dialog> */}
        </div>
    );

  }

  }

  export default AutocompleteSelect;

  

