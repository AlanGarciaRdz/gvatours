import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class SignIn extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isSignedUp: false, // <-- initialize the signup state as false
      email: '',
      password: ''
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.Ingresar = this.Ingresar.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)

    // const classes = useStyles();
    
  }

  componentDidUpdate(){
    
  }

  componentDidMount(){
    localStorage.clear();
  }

  handleChange = ({target: {value,name}}) => this.setState({[name]: value})

   Ingresar(){
     API.post('/Login', this.state)
    .then(res => {
      if (res.status === 200) {
        
        localStorage.setItem('09b267c0', res.data.role);
        localStorage.setItem('6443a053', res.data.name);
        localStorage.setItem('c7383f2e', res.data.email);
        localStorage.setItem('4055bf1e', res.data.uuid_user);
        localStorage.setItem('4718acf4', res.data.id_user);
        localStorage.setItem('63dd46ba', res.data.iniciales);
        this.setState({ isSignedUp: true }); // after signing up, set the state to true. This will trigger a re-render
      }else{
        //TODO: add ERROR ALERT
      }
    })
    
   }

   _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.Ingresar()
    }
  }


   render(){
    const { classes } = this.props;
    if (this.state.isSignedUp) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "/Charters" }} />;
    }else{
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper} onKeyPress={this._handleKeyDown}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            {/* <form className={classes.form} noValidate> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                // className={classes.submit}
                onClick={this.Ingresar}
              >
                Ingresar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/RecuperarContra" variant="body2">
                    Olvide mi Contraseña
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Registro" variant="body2">
                    {"No tienes cuenta? Registrarse"}
                  </Link>
                </Grid>
              </Grid>
            {/* </form> */}
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );
      }
    }

}
  

export default withStyles(styles)(SignIn);



