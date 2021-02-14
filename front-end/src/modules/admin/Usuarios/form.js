import React from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem';
import Create from '@material-ui/icons/Create';

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


class CuponForm extends React.Component{


        constructor(props){
            super(props)
            this.state = {
                usuarios: [],
                open: true,
                name: '', 
                iniciales: '',
                role: '', 
                correo: '',
                password: '',
                UUID:''
            }

            this.getUsers = this.getUsers.bind(this);
            this.addTableData = this.addTableData.bind(this);
            
            this.crear_editar_borrar_elemento = this.crear_editar_borrar_elemento.bind(this);
            this.limpiarSTATE = this.limpiarSTATE.bind(this);

            this.handleClientChange = this.handleClientChange.bind(this);
            this.handleHotelChange = this.handleHotelChange.bind(this);
            this.handleAgencyChange = this.handleAgencyChange.bind(this);

            this.seleccionarElemento = this.seleccionarElemento.bind(this);   
            this.handleChange = this.handleChange.bind(this);         
        
        }

      
        componentDidMount(){

            this.getUsers();
        }

        handleClientChange = (uuid_usuario) => {
          // console.log("uuid Client",uuid_usuario)
          this.setState({
            val_uuid_usuario: uuid_usuario})
        }

        handleHotelChange = (uuid_hotel) => {
          // console.log("uuid Hotel",uuid_hotel)
          this.setState({
            val_uuid_hotel: uuid_hotel}
          )
        }

        handleAgencyChange = (uuid_usuer) => {
          // console.log("uuid usuer",uuid_usuer)
          this.setState({
            val_uuid_usuer: uuid_usuer}
          )
        }

        seleccionarElemento(row){
          console.log(row)
          this.setState({UUID: row.UUID})
          this.setState({name: row.name})
          this.setState({correo: row.email})
          this.setState({role: row.role})
          this.setState({password: row.password})
          this.setState({iniciales: row.iniciales})
        }

        limpiarSTATE(){
          this.setState({UUID: ''})
          this.setState({name: ''})
          this.setState({correo: ''})
          this.setState({role: ''})
          this.setState({iniciales: ''})
        }

        handleChange = (evt) => {
          let value = evt.target.value;

          if(evt.target.name === "role"){
            value = 1
          }
          this.setState({
            ...this.state,
            [evt.target.name]: value
          });
        };
   

        crear_editar_borrar_elemento(status){ 
            var data = 
            {
                "name": document.getElementById("name").value,
                "password": document.getElementById("password").value,
                "email": document.getElementById("correo").value,
                "role": document.getElementById("role").value,
                "iniciales": document.getElementById("iniciales").value,
                "data": {}, //in case we need more data
            }

            console.log(data)
            

            if(this.state.UUID === ''){
                API.post(`/Users/`, data).then(res => {
        
                  try{
                    this.getUsers()
                  }catch(error){
                    console.error("400 NO SE PUDO CREAR usuer")
                    return "400 NO SE PUDO CREAR usuer"
                  }
              })
            }else{
                API.put(`/Users/${this.state.UUID}`, data).then(res => {
                  try{
                      this.getUsers()
                      this.limpiarSTATE()
                  }catch(error){
                    console.error("400 NO SE PUDO EDITAR usuer")
                    return "400 NO SE PUDO EDITAR usuer"
                  }
              })
            }

            if(status === 3){
              API.delete(`/users/${this.state.UUID}`, data).then(res => {
                try{
                    this.getUsers()
                    this.limpiarSTATE()
                }catch(error){
                  console.error("400 NO SE PUDO borrar usuer")
                  return "400 NO SE PUDO borrar usuer"
                }
            })
            }
        }


        getUsers() {
          
            API.get('/users')
              .then(res => {
                if (res.status === 200) {
                  // console.log(res.data)
                  //Folio, Fecha_Entrada, usuer, Hotel, Pagado, Total_Venta
                  var  rowsP = []
                  // console.log(this.state.data_usuarios)
                  console.log(res.data)
                  rowsP = //Promise.all(
                    res.data.map(row => ( 
                    this.addTableData(
                      row.uuid_user,
                      row.name,
                      row.email,
                      row.role,
                      row.password,
                      row.iniciales
                    )))
                  

                    this.setState({usuarios: rowsP});
                    console.log(this.state.usuarios)
                  
                  
                }else{
                  //TODO: add ERROR ALERT
                }
              })
          }



        // Generate Order Data
        addTableData(UUID, name, email, role, password, iniciales) {
          return {UUID, name, email, role,password,iniciales};
        }

    

render(){
    const { classes } = this.props;
    const {usuarios} = this.state;

    return (
        <React.Fragment>
  

            <Grid item xs={12}>
            
          
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nombre del usuario"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />


          
                <TextField
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                  required
                />
                
          
                  <TextField
                  autoFocus
                  margin="dense"
                  id="correo"
                  label="Correo electronico"
                  name="correo"
                  value={this.state.correo}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                  required
                />




                <TextField
                  autoFocus
                  margin="dense"
                  id="role"
                  label="Permisios de Sistema 1 = Administrador  2 = Usuario"
                  name="role"
                  value={this.state.role}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                />

                <TextField
                  autoFocus
                  margin="dense"
                  id="iniciales"
                  label="Iniciales"
                  name="iniciales"
                  value={this.state.iniciales}
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                />




            </Grid>


          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="primary" href="#contained-buttons" onClick={() => this.crear_editar_borrar_elemento(1)} >
              Crear/Editar Usuario
            </Button>
            <Button variant="contained" color="error" href="#contained-buttons" onClick={() => this.crear_editar_borrar_elemento(3)} >
              Eliminar
            </Button>
          </Grid>
  
          <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Iniciales</TableCell>            
          </TableRow>

          

          
        </TableHead>
        <TableBody>
          {usuarios.map(row => (
            <TableRow key={row.UUID}>
              
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.iniciales}</TableCell>
              
              {/* Edit */}
              <TableCell align="right">
                <ListItem button onClick={() => this.seleccionarElemento(row)}>
                    <Create />
                </ListItem>
             </TableCell>
             {/* Edit */}            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
      );
    
}

    }
  

export default withStyles(styles)(CuponForm);