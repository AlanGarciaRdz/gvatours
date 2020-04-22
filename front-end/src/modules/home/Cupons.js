import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
// import {isMobileDevice} from '../../utils/helpers';

import API from "../../utils/API";








function preventDefault(event) {
  event.preventDefault();
}

const styles = (theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


class Cupons extends React.Component{

  constructor(props){
    super(props)
    this.state = {
        open: true,
        rows: []
    }

    this.getCupons = this.getCupons.bind(this);
    this.createData = this.createData.bind(this);
  }

  // Generate Order Data
  createData(UUID, Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta) {
    return {UUID, Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta };
  }

  getCupons() {
    API.get('/Cupon')
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          //Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta
          var  rowsP = []
          rowsP = //Promise.all(
            res.data.map(row => ( 
            this.createData(
              row.uuid_cupon, //FOLIO
              row.uuid_cupon.split('-')[2]+'-'+row.uuid_cupon.split('-')[3], //FOLIO
              row.data.fecha_entrada, //Fecha_entrada
              row.travelagency.nombre, //Nombre 
              row.hotel.nombre, //HOTEL
              row.data.Total_Pagado ?  row.data.Total_Pagado : '0', 
              row.data.Total_Venta  ? row.data.Total_Venta : '0'
            )))
            //)

            this.setState({rows: rowsP});
          
        }else{
          //TODO: add ERROR ALERT
        }
      })
  }

  componentDidMount(){
    
    this.getCupons();
    
  }

  render(){
    const { classes } = this.props;
    const {rows} = this.state;

    return (
      <React.Fragment>
        <Title>Cupones Recientes</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Folio</TableCell>
              <TableCell>Fecha Entrada</TableCell>
              <TableCell>Agencia</TableCell>
              <TableCell>Hotel</TableCell>
              <TableCell>Pagado</TableCell>
              <TableCell align="right">Total Venta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              //Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta
              <TableRow key={row.Folio}>
                <TableCell>{row.Folio}</TableCell>
                <TableCell>{row.Fecha_Entrada}</TableCell>
                <TableCell>{row.Agencia}</TableCell>
                <TableCell>{row.Hotel}</TableCell>
                <TableCell>{row.Pagado}</TableCell>
                <TableCell align="right">{row.Total_Venta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          {/* <Link color="primary" href="/Cupones" onClick={preventDefault}>
            Ver mas cupones
          </Link> */}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Cupons);