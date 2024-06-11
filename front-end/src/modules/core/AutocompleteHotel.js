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

class AutocompleteHotel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      setValue: null,
      open: false,
      toggleOpen: false,
      dialogValue: {
        name_hotel: "",
        destino: "",
        uuid_hotel: "",
      },
      Hoteles: [],
      Currentuuid: "",
    };

    this.filter = createFilterOptions();

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getHotels = this.getHotels.bind(this);
    this.onAddHOTEL = this.onAddHOTEL.bind(this);
    this.addHotel = this.addHotel.bind(this);
  }

  handleClose = () => {
    this.setState({
      dialogValue: {
        name_hotel: "",
        destino: "",
      },
    });
    this.setState({ toggleOpen: false });
  };

  handleSubmit = (event) => {
    const { dialogValue } = this.state;

    event.preventDefault();
    this.setState({
      setValue: {
        name_hotel: dialogValue.name_hotel,
        destino: dialogValue.destino,
      },
    });

    this.addHotel();

    this.handleClose();
  };

  componentDidUpdate() {
    const { Currentuuid } = this.state;

    if (this.props.value !== "") {
      console.log(`props value ${this.props.value}`);
      console.log(`state value ${this.state.value}`);

      if (this.props.value !== this.state.value) {
        this.setState({ value: this.props.value });
        console.log(this.props);
        let currentHotel = this.state.Hoteles.find(
          (e) => e.uuid_hotel === Currentuuid
        );
        console.log(currentHotel);
        try {
          this.props.updateHotel(
            currentHotel.uuid_hotel,
            currentHotel.name_hotel,
            currentHotel.destino
          );
        } catch (error) {
          this.props.updateHotel(this.props.uuid);
          console.log(`uuid hotel` + this.props.uuid);
        }
      }
    }
  }

  componentDidMount() {
    this.getHotels();
    console.log(this.props);
  }

  onAddHOTEL(uuid_hotel, nombre, destino) {
    // console.log(uuid_hotel, nombre, destino)
    this.setState((state) => {
      const list = state.Hoteles.push({
        name_hotel: nombre,
        uuid_hotel,
        destino: destino,
      });
      return {
        list,
        value: "",
      };
    });
  }

  getHotels() {
    API.get(`/Hotels/`).then((res) => {
      try {
        if (res.data[0].hasOwnProperty("data")) {
          res.data.map((row) =>
            this.onAddHOTEL(row.uuid_hotel, row.data.nombre, row.data.destino)
          );
          // console.log(this.state.Hoteles)
        }
      } catch (error) {
        console.error("400 HOTEL");
        return "400 HOTEL";
      }
    });
  }

  addHotel() {
    const data = {
      data: {
        nombre: `${this.state.dialogValue.name_hotel}`,
        direccion: "",
        telefono: "",
        correo: "",
        destino: `${this.state.dialogValue.destino}`,
      },
    };

    API.post(`/Hotels/`, data).then((res) => {
      try {
        // console.log(res.data)
        this.setState({
          value: res.data.data.nombre,
          Currentuuid: res.data.uuid_hotel,
        });

        this.onAddHOTEL(
          res.data.uuid_hotel,
          res.data.data.nombre,
          res.data.data.destino
        );

        this.props.updateHotel(
          res.data.uuid_hotel,
          res.data.data.nombre,
          res.data.data.destino
        );
      } catch (error) {
        console.log(error);
        console.error("400 HOTEL");
        return "400 HOTEL";
      }
    });
  }

  render() {
    const { value, dialogValue, toggleOpen } = this.state;
    return (
      <div>
        <Autocomplete
          value={value}
          fullWidth
          autoComplete="fname"
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                this.setState({ toggleOpen: true });
                this.setState({
                  dialogValue: {
                    name_hotel: newValue,
                    destino: "",
                  },
                });
              });
              return;
            }

            if (newValue && newValue.inputValue) {
              this.setState({ toggleOpen: true });
              this.setState({
                dialogValue: {
                  name_hotel: newValue.inputValue,
                  destino: "",
                },
              });

              return;
            }

            this.setState({ setValue: newValue });
          }}
          filterOptions={(options, params) => {
            const filtered = this.filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name_hotel: `Agregar "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          id="hotel"
          options={this.state.Hoteles}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }

            this.setState({ value: option.name_hotel });

            this.props.updateHotel(
              option.uuid_hotel,
              option.name_hotel,
              option.destino
            );

            return option.name_hotel;
          }}
          renderOption={(option) => option.name_hotel}
          renderInput={(params) => (
            <TextField {...params} label="HOTEL" variant="outlined" />
          )}
        />

        <Dialog
          open={toggleOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Agregar hotel</DialogTitle>
            <DialogContent>
              <DialogContentText>
                No encontraste un HOTEL? Por favor, agregalo!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.name_hotel}
                onChange={(event) =>
                  this.setState({
                    dialogValue: {
                      ...dialogValue,
                      name_hotel: event.target.value,
                    },
                  })
                }
                label="nombre"
                type="text"
              />
              <TextField
                margin="dense"
                id="name"
                value={dialogValue.destino}
                onChange={(event) =>
                  this.setState({
                    dialogValue: {
                      ...dialogValue,
                      destino: event.target.value,
                    },
                  })
                }
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
        </Dialog>
      </div>
    );
  }
}

export default AutocompleteHotel;
