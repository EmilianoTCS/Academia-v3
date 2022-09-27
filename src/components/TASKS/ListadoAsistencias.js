import React, {Component} from "react";
import Header from "../templates/header";
import { SpinnerDotted } from 'spinners-react';
// import { Link } from "react-router-dom";
// import { BsPencilSquare, BsX, BsTrash } from "react-icons/bs";
// import { BiShowAlt } from "react-icons/bi";

class ListadoAsistencias extends Component {
    state = {
        asistencias: [],
        idCursos: [],
        loadedData: false,
        CursoaConsultar: "",
        fechasAsistencia: []
      } 
    
    // Carga las funciones de forma automática
    componentDidMount() {
    this.loadidCursos();
    this.loadData(this.state.CursoaConsultar);
    }

    // Carga el listado de cursos
    loadidCursos() {
    fetch(
    "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/idCurso.php?idCurso"
    )
    .then((response) => response.json())
    .then((dataResponse) => {
    this.setState({ loadedData: true, idCursos: dataResponse });
    })
    .catch(console.log());
    }


    // Recolecta los datos del registro de asistencias dependiendo del curso seleccionado.
    loadData = (CursoaConsultar) => {
    fetch(
    "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-listAsistencias.php?ID="+CursoaConsultar
    )
    .then((response) => response.json())
    .then((dataResponse) => {

    this.setState({ loadedData: true, asistencias: dataResponse });
    })
    .catch(console.log());
    };

    // Recolecta los datos del registro de asistencias dependiendo del curso seleccionado.
    loadDataFechas = (CursoaConsultar) => {
      fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/fechasAsistencia.php?ID="+CursoaConsultar
      )
      .then((response) => response.json())
      .then((dataResponse) => {

      this.setState({fechasAsistencia: dataResponse });
      })
      .catch(console.log());
    };

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
        this.loadData(this.state.CursoaConsultar)
        this.loadDataFechas(this.state.CursoaConsultar)
      };

    render() { 
        const {loadedData, idCursos, asistencias, fechasAsistencia} = this.state;
        const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }
        const setFechas = new Set();
        const setUsuarios = new Set();
        const setValor = new Set();

        if (!loadedData) {
            return (
            <div style={{margin: "auto"}}>
            <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
            </div>
            );
          }
        return (
        <div className="container-fluid">
            <Header />
            <h1 id="subtitulo_pagina">Listado de asistencias</h1>
            <div className="row"> 
              <select
                className="form-control"
                      name="CursoaConsultar"
                      id="CursoaConsultar"
                      onChange={this.cambioValor}
                      style={{width:"200px", marginLeft: "17%", marginTop: "1%"}}
                    >
                      <option defaultValue={"Seleccione un curso"}>Seleccione un curso</option>
                      {idCursos.map((idCurso) => (
                        <option
                          key={idCurso.ID}
                          value={idCurso.ID}
                        >
                          {idCurso.codigoRamo + " -- " + idCurso.nombreRamo}
                        </option>
                      ))}
              
              </select>                  
            </div>
            <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                      {asistencias.map((item) => {
                        setFechas.add(item.atributo)
                      })}
                      {asistencias.map((item) => {
                        setUsuarios.add(item.usuario)
                      })}
                      {asistencias.map((item) => {
                        setValor.add(item.valor)
                      })}
                    <thead className="thead-inverse">
                    <tr >
                        <th>Usuario</th>
                        {Array.from(setFechas).map((element) => (
                        <th>
                          {element}</th>
                      ))}
                      </tr>
                        </thead>
                        <tbody>

                                {Array.from(setUsuarios).map((element) => (
                                  <tr>
                                   <td>{element}</td>
                                      {asistencias.map((element) => (
                                          <td>{element.valor}</td>                                  
                                      ))}                                
                                  </tr>
                                ))}
                                
                         </tbody>
                </table>
        </div>
        );
    }
}
 
export default ListadoAsistencias;