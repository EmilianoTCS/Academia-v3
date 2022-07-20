import React, { Component } from "react";
import Header from "../templates/header";
import "../css/Prerequisitos.css";

import ToggleSwitch from "../templates/ToggleSwitch";

class Prerequisitos extends Component {
  state = {
    idCursos: [],
    CursoaInsertar: "",
    PrerequisitoAInsertar: "",
    CursoaConsultar: "2",
    prerequisitos: []
  };

  loadidCursos() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/idCurso.php?idCurso"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, idCursos: dataResponse });
      })
      .catch(console.log());
  }
  componentDidMount() {
    this.loadidCursos();
    this.loadPrerequisitos(this.state.CursoaConsultar);
  }
  loadPrerequisitos = (ID) => {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/prerequisitos.php?ID="+ID
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, prerequisitos: dataResponse });
      })
      .catch(console.log());
  };

  toggleisActivePrerequisito = (ID) => {
    fetch(
     "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStatePrerequisito.php?updateStatePrerequisito="+ID)
    .then((response) => response.json())
     .then((dataResponse) => {
       console.log(dataResponse);
       this.loadPrerequisitos(this.state.CursoaConsultar)
     })
     .catch(console.log());
 }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
    this.loadPrerequisitos(this.state.CursoaConsultar)
  };

  insertPrerequisito = (e) => {
    e.preventDefault();
    console.log("Sending data..");
    const { CursoaInsertar, PrerequisitoAInsertar } = this.state;
    var datosEnviar = {
      CursoaInsertar: CursoaInsertar,
      PrerequisitoAInsertar: PrerequisitoAInsertar,
    };
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarPrerequisito.php?insertarPrerequisito",
      {
        method: "POST",
        body: JSON.stringify(datosEnviar),
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
      })
      .catch(console.log());
  };

  



  render() {
    const idCurso = this.state.idCursos;
    const prerequisitos = this.state.prerequisitos;
    return (
      <div className="container">
        <Header></Header>
        <div id="container-prerequisitos">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Añadir requisitos</h4>
              <br />
              <div className="container">
                <div className="form-group">
                  <form onSubmit={this.insertPrerequisito}>
                    <label htmlFor="CursoaInsertar">Seleccione un curso</label>
                    <select
                      className="form-control"
                      name="CursoaInsertar"
                      id="CursoaInsertar"
                      onChange={this.cambioValor}
                    >
                      {idCurso.map((idCurso) => (
                        <option
                          onChange={() => this.loadPrerequisitos(idCurso.ID)}
                          key={idCurso.ID}
                          value={idCurso.ID}
                        >
                          {idCurso.codigoRamo + " -- " + idCurso.nombreRamo}
                        </option>
                      ))}
                    </select>
                    <br />
                    <label htmlFor="PrerequisitoAInsertar">
                      Seleccione el pre requisito a insertar
                    </label>

                    <select
                      className="form-control"
                      name="PrerequisitoAInsertar"
                      id="PrerequisitoAInsertar"
                      onChange={this.cambioValor}
                    >
                      {idCurso.map((idCurso) => (
                        <option
                          key={idCurso.ID}
                          value={idCurso.ID}
                        >
                          {idCurso.codigoRamo + " -- " + idCurso.nombreRamo}
                        </option>
                      ))}
                    </select>
                    <br />
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Guardar"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div id="container-prerequisitos">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Habilitar o deshabiltar prerequisitos
              </h4>
              <br />
              <div className="container">
                <div className="form-group">
                <label htmlFor="CursoaInsertar">Seleccione un curso</label>
                    <select
                    onChange={this.cambioValor}
                      className="form-control"
                      name="CursoaConsultar"
                      id="CursoaConsultar"
                    >
                      {idCurso.map((idCurso) => (
                        <option
                          key={idCurso.ID}
                          value={idCurso.ID}
                        >
                          {idCurso.codigoRamo + " -- " + idCurso.nombreRamo}
                        </option>
                      ))}
                    </select>
                    <br />
                  <table className="table table-striped table-inverse table-responsive">
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Nombre del ramo</th>
                        <th>ID del pre_requisito</th>
                        <th>Fecha de modificación</th>
                        <th>Habilitar o Deshabilitar</th>
                      </tr>
                    </thead>
                    <tbody>
                        {prerequisitos.map((prerequisito) => (
                            <tr key={prerequisito.ID}>
                            <td>{prerequisito.codigoRamo}</td>
                            <td>{prerequisito.nombreRamo}</td>
                            <td>{prerequisito.pre_requisito}</td>
                            <td>{prerequisito.fechaActualizacion}</td>
                            <td onChange={() => this.toggleisActivePrerequisito(prerequisito.ID)}><ToggleSwitch isActive={prerequisito.isActive}/></td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Prerequisitos;
