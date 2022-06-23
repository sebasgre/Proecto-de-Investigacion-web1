import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
const regex = RegExp(/^\D+\S+/);
const data = [
  { id: 1, jugador: "Cristiano Ronaldo", equipo: "Manchester United" },
  { id: 2, jugador: "Lionel Messi", equipo: "Paris Saint-Germain" },
  { id: 3, jugador: "Neymar", equipo: "Paris Saint-Germain" },
  { id: 4, jugador: "Eden Hazard", equipo: "Real Madrid" },
  { id: 5, jugador: "Kylian Mbappe", equipo: "Paris Saint-Germain" },
  { id: 6, jugador: "Sadio Mane", equipo: "Liverpool" },
  { id: 7, jugador: "Vinicius Jr", equipo: "Real Madrid" },
  { id: 8, jugador: "Mohamed Salah", equipo: "Liverpool" },
  { id: 9, jugador: "Gareth Bale", equipo: "Real Madrid" },
  { id: 10, jugador: "Erling Halland", equipo: "Manchester City" },
];
class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      jugador: "",
      equipo: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    // eslint-disable-next-line array-callback-return
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        if(regex.test(dato.jugador) && regex.test(dato.equipo)){
          arreglo[contador].jugador = dato.jugador;
          arreglo[contador].equipo = dato.equipo;
        }else {
          alert("El nombre del jugador y el equipo no pueden contener numeros ni espacios en blanco");
        }
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      // eslint-disable-next-line array-callback-return
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
      var lista2 = this.state.data;

      var contador2 = 1;

      // eslint-disable-next-line array-callback-return
      lista2.map((registro) => {

        registro.id = contador2;

        contador2++;

      })

      this.setState({ data: lista2 });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    if(regex.test(valorNuevo.jugador) && regex.test(valorNuevo.equipo)){
      lista.push(valorNuevo);
      this.setState({ data: lista, modalInsertar: false });
    }else{
      alert("El nombre del jugador y el equipo no pueden contener numeros ni espacios en blanco");
    }
  }

  // validar = (evaluar) => {
  //   if(regex.test(evaluar.jugador) && regex.test(evaluar.equipo)){
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.jugador}</td>
                  <td>{dato.equipo}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Jugador:
              </label>
              <input
                className="form-control"
                name="jugador"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.jugador}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Equipo:
              </label>
              <input
                className="form-control"
                name="equipo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.equipo}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Jugador</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Jugador:
              </label>
              <input
                className="form-control"
                name="jugador"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Equipo:
              </label>
              <input
                className="form-control"
                name="equipo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
