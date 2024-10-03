/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

import API from "../../utils/API";

class AutocompleteAgency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      ciudad: null,
      setValue: null,
      open: false,
      toggleOpen: false,
      dialogValue: {
        nombre_agencia: "",
        contacto: "",
      },
      Agencies: [],
      Currentuuid: "",
    };

    this.filter = createFilterOptions();

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAgencies = this.getAgencies.bind(this);
    this.onAddAgency = this.onAddAgency.bind(this);
    this.addAgency = this.addAgency.bind(this);
  }

  handleClose = () => {
    this.setState({
      dialogValue: {
        nombre_agencia: "",
        contacto: "",
        ciudad: "",
      },
    });
    this.setState({ toggleOpen: false });
  };

  handleSubmit = (event) => {
    const { dialogValue } = this.state;

    event.preventDefault();
    this.setState({
      setValue: {
        nombre_agencia: dialogValue.nombre_agencia,
        contacto: dialogValue.contacto,
      },
    });

    this.addAgency();

    this.handleClose();
  };

  componentDidUpdate() {
    const { Currentuuid } = this.state;

    if (this.props.value !== "") {
      if (this.props.value !== this.state.value) {
        this.setState({ value: this.props.value });
        this.setState({ ciudad: this.props });
        //this.props.value = this.state.value;
        let current = this.state.Agencies.find(
          (e) => e.uuid_travelA === Currentuuid
        );
        console.log(current);
        try {
          this.props.updateAgencia(
            current.uuid_travelA,
            current.ciudad,
            current.nombre_agencia
          );
        } catch (error) {}
      }
    }
  }

  componentDidMount() {
    this.getAgencies();
  }

  onAddAgency(uuid_travelA, nombre, contacto, ciudad) {
    // console.log(uuid_travelA, nombre, contacto)
    this.setState((state) => {
      const list = state.Agencies.push({
        nombre_agencia: nombre,
        uuid_travelA,
        contacto: contacto,
        ciudad: ciudad,
      });
      return {
        list,
        value: "",
      };
    });
  }

  getAgencies() {
    API.get(`/TravelA/`).then((res) => {
      try {
        if (res.data[0].hasOwnProperty("data")) {
          console.log(res.data[0]);
          res.data.map((row) =>
            this.onAddAgency(
              row.uuid_travelA,
              row.data.nombre,
              row.data.contacto,
              row.data.ciudad
            )
          );
          console.log(this.state.Agencies);
        }
      } catch (error) {
        console.error("400 Agency");
        return "400 Agency";
      }
    });
  }
  //
  addAgency() {
    const data = {
      data: {
        nombre: `${this.state.dialogValue.nombre_agencia}`,
        direccion: "",
        ciudad: "",
        telefono: "",
        correo: "",
        contacto: `${this.state.dialogValue.contacto}`,
      },
    };

    API.post(`/TravelA/`, data).then((res) => {
      try {
        // console.log(res.data)

        this.setState({
          value: res.data.data.nombre,
          Currentuuid: res.data.uuid_travelA,
        });

        this.props.updateAgencia(
          res.data.uuid_travelA,
          res.data.ciudad,
          res.data.data.nombre
        );

        this.onAddAgency(
          res.data.uuid_travelA,
          res.data.data.nombre,
          res.data.contacto,
          res.data.ciudad
        );
      } catch (error) {
        console.error("400 Agency");
        return "400 Agency";
      }
    });
  }

  render() {
    const { value, dialogValue, toggleOpen, ciudad } = this.state;
    return (
      <div>
        <Autocomplete
          value={value}
          ciudad={ciudad}
          fullWidth
          autoComplete="fname"
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                this.setState({ toggleOpen: true });
                this.setState({
                  dialogValue: {
                    nombre_agencia: newValue,
                    contacto: "",
                  },
                });
              });
              return;
            }

            if (newValue && newValue.inputValue) {
              this.setState({ toggleOpen: true });
              this.setState({
                dialogValue: {
                  nombre_agencia: newValue.inputValue,
                  contacto: "",
                },
              });

              return;
            }

            this.props.updateAgencia(
              newValue.uuid_travelA,
              newValue.ciudad,
              newValue.nombre_agencia
            );

            this.setState({ value: newValue });
          }}
          filterOptions={(options, params) => {
            const filtered = this.filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                nombre_agencia: `Agregar "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          id="Agency"
          options={this.state.Agencies}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }

            /*this.setState({ value: option.nombre_agencia });
            this.setState({ ciudad: option.ciudad });

            this.props.updateAgencia(
              option.uuid_travelA,
              option.ciudad,
              option.nombre_agencia
            );*/

            return option.nombre_agencia;
          }}
          renderOption={(option) => option.nombre_agencia}
          renderInput={(params) => (
            <TextField {...params} label="Agencia" variant="outlined" />
          )}
        />

        <Dialog
          open={toggleOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Agregar Agencia</DialogTitle>
            <DialogContent>
              <DialogContentText>
                No encontraste una Agencia de viajes? Por favor, agregala!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.nombre_agencia}
                onChange={(event) =>
                  this.setState({
                    dialogValue: {
                      ...dialogValue,
                      nombre_agencia: event.target.value,
                    },
                  })
                }
                label="nombre"
                type="text"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.contacto}
                onChange={(event) =>
                  this.setState({
                    dialogValue: {
                      ...dialogValue,
                      contacto: event.target.value,
                    },
                  })
                }
                label="contacto"
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

export default AutocompleteAgency;
