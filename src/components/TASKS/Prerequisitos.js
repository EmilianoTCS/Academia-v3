import React, { Component } from "react";
import Header from "../templates/header";
import "../css/Prerequisitos.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ToggleSwitch from "../templates/ToggleSwitch";
import { SpinnerDotted } from 'spinners-react';
class Prerequisitos extends Component {
  state = {
    idCursos: [],
    idCursosInsert: [],
    PrerequisitoAInsertar: "",
    CursoaConsultar: "",
    prerequisitos: [],
    loadedData: false
  };
  // Carga el listado de cursos
  loadidCursos() {
    fetch(
      "http://20.168.67.13/TASKS/auxiliar/idCurso.php?idCurso"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, idCursos: dataResponse });
      })
      .catch(console.log());
  }
  // Carga el listado de cursos EXCEPTUANDO el seleccionado antes
  loadidCursosInsert = (ID) =>{
    fetch(
      "http://20.168.67.13/TASKS/auxiliar/idCursoInsert.php?idCurso="+ID
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, idCursosInsert: dataResponse });
      })
      .catch(console.log());
  }
  
  // Carga las funciones de forma automática
  componentDidMount() {
    this.loadidCursos();
    this.loadPrerequisitos(this.state.CursoaConsultar);
  }

  // Carga el listado de pre requisitos para el curso seleccionado
  loadPrerequisitos = (ID) => {
    fetch(
      "http://20.168.67.13/TASKS/auxiliar/prerequisitos.php?ID="+ID
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, prerequisitos: dataResponse });
      })
      .catch(console.log());
  };

  // Permite habilitar o deshabilitar un pre requisito
  toggleisActivePrerequisito = (ID) => {
    fetch(
     "http://20.168.67.13/TASKS/coe-updateStatePrerequisito.php?updateStatePrerequisito="+ID)
    .then((response) => response.json())
     .then(() => {
       this.loadPrerequisitos(this.state.CursoaConsultar)
     })
     .catch(console.log());
 }

//  Detecta cambios en el estado
  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
    this.loadPrerequisitos(this.state.CursoaConsultar)
    this.loadidCursosInsert(this.state.CursoaConsultar)
  };

  // Realiza la inserción del pre requisito seleccionado
  insertPrerequisito = (e) => {
    e.preventDefault();
    console.log("Sending data..");
    const { CursoaConsultar, PrerequisitoAInsertar } = this.state;
    var datosEnviar = {
      CursoaConsultar: CursoaConsultar,
      PrerequisitoAInsertar: PrerequisitoAInsertar,
    };
    console.log(datosEnviar);
    fetch(
      "http://20.168.67.13/TASKS/coe-insertarPrerequisito.php?insertarPrerequisito",
      {
        method: "POST",
        body: JSON.stringify(datosEnviar),
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadPrerequisitos(CursoaConsultar);
        const MySwal = withReactContent(Swal);
        if(dataResponse === "success"){
          MySwal.fire({
            title: "Se ha insertado el registro",
            icon: "success",
            position: "top-right",
            timer: 2500,
            toast: true,
            showConfirmButton: false,
          })
        }else{
          MySwal.fire({
            title: "Se ha producido un error",
            icon: "error",
            position: "top-right",
            timer: 2500,
            toast: true,
            showConfirmButton: false,
          })
        }
      })
      .catch(console.log());
  };

  
  render() {
    const idCurso = this.state.idCursos;
    const idCursoInsert = this.state.idCursosInsert;
    const prerequisitos = this.state.prerequisitos;
    const loadedData = this.state.loadedData;
    const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }

    if(!loadedData){
      return(
        <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
        );
  } 
    return (
      <div className="container">
        <Header></Header>
        <h1 id="subtitulo_pagina">Administración de pre requisitos</h1>
        <div id="container-prerequisitos" >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Añadir requisitos</h4>
              <br />
              <div className="container">
                <div className="form-group">
                  <form onSubmit={this.insertPrerequisito}>
                    <select
                      className="form-control"
                      name="CursoaConsultar"
                      id="CursoaConsultar"
                      onChange={this.cambioValor}
                    >
                      <option defaultValue={"Seleccione un curso"}>Seleccione un curso</option>
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
                    <select
                      className="form-control"
                      name="PrerequisitoAInsertar"
                      id="PrerequisitoAInsertar"
                      onChange={this.cambioValor}
                    >
                      <option defaultValue={"Seleccione un curso"}>Seleccione el pre requisito a insertar</option>
                      {idCursoInsert.map((idCursoInsert) => (
                        <option
                          key={idCursoInsert.ID}
                          value={idCursoInsert.ID}
                        >
                          {idCursoInsert.codigoRamo + " -- " + idCursoInsert.nombreRamo}
                        </option>
                      ))}
                    </select>
                    <br />
                    <input
                      className="btn btn-primary"
                      style={{float:"left"}}
                      type="submit"
                      value="Guardar"
                    />
                  </form>
                </div>
              </div>
              <br />
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
    );
  }
}

export default Prerequisitos;
