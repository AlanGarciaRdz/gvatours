import React from "react";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import Create from "@material-ui/icons/Create";
import UploadImage from "./UploadImage";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import API from "../../../utils/API";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

class CuponForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agencias: [],
      open: true,
      nombreAgencia: "",
      contacto: "",
      correo_agencia: "",
      ciudad: "",
      telefono: "",
      UUID: "",
      imageurl: "",
    };

    this.getTravelA = this.getTravelA.bind(this);
    this.addTableData = this.addTableData.bind(this);

    this.crear_editar_borrar_elemento =
      this.crear_editar_borrar_elemento.bind(this);
    this.limpiarSTATE = this.limpiarSTATE.bind(this);

    this.handleClientChange = this.handleClientChange.bind(this);
    this.handleHotelChange = this.handleHotelChange.bind(this);
    this.handleAgencyChange = this.handleAgencyChange.bind(this);

    this.seleccionarElemento = this.seleccionarElemento.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickbuton = this.clickbuton.bind(this);
  }

  componentDidMount() {
    this.getTravelA();
  }

  handleClientChange = (uuid_cliente) => {
    // console.log("uuid Client",uuid_cliente)
    this.setState({
      val_uuid_cliente: uuid_cliente,
    });
  };

  handleHotelChange = (uuid_hotel) => {
    // console.log("uuid Hotel",uuid_hotel)
    this.setState({
      val_uuid_hotel: uuid_hotel,
    });
  };

  handleAgencyChange = (uuid_agencia) => {
    // console.log("uuid Agencia",uuid_agencia)
    this.setState({
      val_uuid_agencia: uuid_agencia,
    });
  };

  seleccionarElemento(row) {
    this.setState({ UUID: row.UUID });
    this.setState({ nombreAgencia: row.nombre });
    this.setState({ ciudad: row.ciudad });
    this.setState({ telefono: row.telefono });
    this.setState({ correo_agencia: row.correo });
    this.setState({ contacto: row.contacto });
    this.setState({ imageurl: row.imageurl });
    this.setState({ base64: row.base64 });
    console.log(row);

    localStorage.setItem("4e9e8ad1", row.imageurl);
    localStorage.setItem("4c6a8493", row.base64);
  }

  limpiarSTATE() {
    this.setState({ UUID: "" });
    this.setState({ nombreAgencia: "" });
    this.setState({ ciudad: "" });
    this.setState({ telefono: "" });
    this.setState({ correo_agencia: "" });
    this.setState({ contacto: "" });

    localStorage.removeItem("4e9e8ad1");
    localStorage.removeItem("4c6a8493");
  }

  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  };

  crear_editar_borrar_elemento(status) {
    var data = {
      data: {
        nombre: document.getElementById("nombre").value,
        ciudad: document.getElementById("ciudad").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo_agencia").value,
        contacto: document.getElementById("contacto").value,
        imageurl: localStorage.getItem("4e9e8ad1")
          ? localStorage.getItem("4e9e8ad1")
          : "",
        base64: localStorage.getItem("4c6a8493")
          ? localStorage.getItem("4c6a8493")
          : "",
      },
    };

    if (this.state.UUID === "") {
      API.post(`/TravelA/`, data).then((res) => {
        try {
          this.getTravelA();
        } catch (error) {
          console.error("400 NO SE PUDO CREAR AGENCIA");
          return "400 NO SE PUDO CREAR AGENCIA";
        }
      });
    } else {
      API.put(`/TravelA/${this.state.UUID}`, data).then((res) => {
        try {
          this.getTravelA();
          this.limpiarSTATE();
        } catch (error) {
          console.error("400 NO SE PUDO EDITAR AGENCIA");
          return "400 NO SE PUDO EDITAR AGENCIA";
        }
      });
    }

    if (status === 3) {
      API.delete(`/TravelA/${this.state.UUID}`, data).then((res) => {
        try {
          this.getTravelA();
          this.limpiarSTATE();
        } catch (error) {
          console.error("400 NO SE PUDO borrar AGENCIA");
          return "400 NO SE PUDO borrar AGENCIA";
        }
      });
    }
  }

  getTravelA() {
    API.get("/TravelA").then((res) => {
      if (res.status === 200) {
        // console.log(res.data)
        //Folio, Fecha_Entrada, Agencia, Hotel, Pagado, Total_Venta
        var rowsP = [];
        // console.log(this.state.data_clientes)
        console.log(res.data);
        rowsP = //Promise.all(
          res.data.map((row) =>
            this.addTableData(
              row.uuid_travelA,
              row.uuid_travelA.split("-")[2] +
                "-" +
                row.uuid_travelA.split("-")[3], //ID
              row.data.nombre,
              row.data.contacto,
              row.data.correo,
              row.data.ciudad,
              row.data.telefono,
              row.data.base64,
              row.data.imageurl
            )
          );
        this.setState({ agencias: rowsP });
        console.log(this.state.agencias);
      } else {
        //TODO: add ERROR ALERT
      }
    });
  }

  // Generate Order Data
  addTableData(
    UUID,
    HUUID,
    nombre,
    contacto,
    correo,
    ciudad,
    telefono,
    base64,
    imageurl
  ) {
    return {
      UUID,
      HUUID,
      nombre,
      contacto,
      correo,
      ciudad,
      telefono,
      base64,
      imageurl,
    };
  }

  clickbuton(e) {
    debugger;
    console.log("boton");
  }

  render() {
    const { classes } = this.props;
    const { agencias } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre de Agencia"
            type="text"
            name="nombreAgencia"
            value={this.state.nombreAgencia}
            onChange={this.handleChange}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="contacto"
            label="Nombre del contacto"
            type="text"
            name="contacto"
            value={this.state.contacto}
            onChange={this.handleChange}
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="correo_agencia"
            label="Correo electronico"
            name="correo_agencia"
            value={this.state.correo_agencia}
            onChange={this.handleChange}
            type="text"
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="ciudad"
            label="Ciudad en donde se encuentra la Agencia"
            name="ciudad"
            value={this.state.ciudad}
            onChange={this.handleChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="telefono"
            label="Telefono"
            name="telefono"
            value={this.state.telefono}
            onChange={this.handleChange}
            type="text"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                src={`data:image/png;base64, ${this.state.base64}`}
                title="Logo Agencia"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  LOGO DE LA AGENCIA MAX 500 kb (100 px x 100 px)
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <TextField
                    autoFocus
                    margin="dense"
                    id="imageurl"
                    label="Ubicacion de la imagen"
                    name="imageurl"
                    disabled
                    value={this.state.imageurl}
                    onChange={this.handleChange}
                    type="text"
                    fullWidth
                  />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <UploadImage />
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={8} sm={6}>
          <Button
            variant="contained"
            color="primary"
            href="#contained-buttons"
            onClick={() => this.crear_editar_borrar_elemento(1)}
          >
            Crear/Editar Agencia
          </Button>
          <Button
            variant="contained"
            color="error"
            href="#contained-buttons"
            onClick={() => this.crear_editar_borrar_elemento(3)}
          >
            Eliminar
          </Button>
        </Grid>

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Contacto</TableCell>
                <TableCell align="right">Correo</TableCell>
                <TableCell align="right">Ciudad</TableCell>
                <TableCell align="right">Telefono</TableCell>
                <TableCell align="right">Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agencias.map((row) => (
                <TableRow key={row.UUID}>
                  <TableCell component="th" scope="row">
                    {row.HUUID}
                  </TableCell>
                  <TableCell align="right">{row.nombre}</TableCell>
                  <TableCell align="right">{row.contacto}</TableCell>
                  <TableCell align="right">{row.correo}</TableCell>
                  <TableCell align="right">{row.ciudad}</TableCell>
                  <TableCell align="right">{row.telefono}</TableCell>
                  {/* Edit */}
                  <TableCell align="right">
                    <ListItem
                      button
                      onClick={() => this.seleccionarElemento(row)}
                    >
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
