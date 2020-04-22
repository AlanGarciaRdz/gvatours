import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../core/Copyright'

import API from "../../utils/API";

import { Redirect } from "react-router-dom";

const styles = (theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



  class SignUp extends React.Component{

    constructor(props){
      super(props)
      this.state = {
        isSignedUp: false,
        email: '',
        password: '',
        name: '',
        role: '1'
      }
      
      this.handleChange = this.handleChange.bind(this)
      this.Registrar = this.Registrar.bind(this)
      this._handleKeyDown = this._handleKeyDown.bind(this)
  
      // const classes = useStyles();
      
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        //   this.Registrar()
        }
      }
  
    componentDidUpdate(){
      
    }
  
    handleChange = ({target: {value,name}}) => this.setState({[name]: value})
  
    Registrar(){
        API.post('/users', this.state)
    .then(res => {
        console.log(res.data)
        if (res.status === 201) {
            this.setState({ isSignedUp: true }); // after signing up, set the state to true. This will trigger a re-render
        }else{
            //TODO: add ERROR ALERT
        }
    })
    
    }

    render(){
            const { classes } = this.props;
            if (this.state.isSignedUp) {
                return <Redirect to = {{ pathname: "/home" }} />;
            }
            else{
                return (
                    <Container component="main" maxWidth="xs">
                      <CssBaseline />
                      <div className={classes.paper}  onKeyPress={this._handleKeyDown}>
                        <Avatar className={classes.avatar}>
                          <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                          Registrar
                        </Typography>
                        {/* <form className={classes.form} noValidate> */}
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                autoFocus
                                onChange= {this.handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Correo Electronico"
                                name="email"
                                autoComplete="email"
                                onChange= {this.handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange= {this.handleChange}
                              />
                            </Grid>
                          </Grid>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick= {this.Registrar}
                          >
                            Registrar
                          </Button>
                          <Grid container justify="flex-end">
                            <Grid item>
                              <Link href="#" variant="body2">
                                No tienes cuenta? Registrarse
                              </Link>
                            </Grid>
                          </Grid>
                        {/* </form> */}
                      </div>
                      <Box mt={5}>
                        <Copyright />
                      </Box>
                    </Container>
                  );
            }
    }  
}


export default withStyles(styles)(SignUp);