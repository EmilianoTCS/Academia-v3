import React, { Component } from "react";
import { BsPencilSquare, BsX, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import "../css/Tables.css";
import Header from "../templates/header";
import "../css/Paginador.css";
import '../css/Botones.css'
import "../css/Forms.css";
import EditarCursos from "./EditarCursos";
class ListadoCursos extends Component {
  state = {
    loadedData: false,
    cursos: [],
    paginador: [],
    num_boton: "",
    toggle_formEdit: false,
    toggle_formCurso: false,
    codigoCuenta : "",
    idRamo : "",
    area: "",
    nombreCurso : "",
    hh_academicas: "",
    pre_requisito: "",
    relator: "",
    fechaFin: "",
    fechaInicio: "",
    horaInicio: "",
    horaFin: "",
    cursosEdit: [],
    codigoCuentaEdit : "",
    codigoRamoEdit : "",
    fechaFinEdit: "",
    fechaInicioEdit: "",
    horaInicioEdit: "",
    horaFinEdit: "",
    IDEdit : ""
  };
  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listCuentas.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, cursos: dataResponse });
      })
      .catch(console.log());
  }
  loadPaginador() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Cuenta.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ paginador: dataResponse });
      })
      .catch(console.log());
  }
  sendNum = (e) => {
    e.preventDefault();
    // console.log("Sending data..");
    const num_boton = e.target.value;
    this.setState({num_boton : num_boton})
    var sendNum = {num_boton : num_boton}

    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listCuentas.php?pagina",
      {
        method: "POST",
        body: JSON.stringify(sendNum),
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        console.log(this.state.num_boton);
        this.setState({ cursos: dataResponse });
      })
      .catch(console.log());
  };
  sendDataRamo = (e) =>{
    e.preventDefault();
    console.log("Sending data..");
    const{codigoCuenta, idRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
    var datosEnviar = {codigoCuenta: codigoCuenta, idRamo: idRamo, 
    nombreCurso:nombreCurso, area:area, hh_academicas:hh_academicas, pre_requisito: pre_requisito, relator: relator}
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarRamo.php?insertarRamo",{
        method: "POST",
        body: JSON.stringify(datosEnviar)
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();

      })
      .catch(console.log());
  }
  sendDataCurso = (e) =>{
    e.preventDefault();
    console.log("Sending data..");
    const{codigoCuenta, idRamo, nombreCurso, fechaInicio, fechaFin, horaInicio, horaFin} = this.state;
    var datosEnviar = {codigoCuenta: codigoCuenta, idRamo: idRamo, 
    nombreCurso:nombreCurso, fechaInicio:fechaInicio, fechaFin:fechaFin, horaInicio: horaInicio, horaFin: horaFin}
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarCurso.php?insertarCurso",{
        method: "POST",
        body: JSON.stringify(datosEnviar)
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();
      })
      .catch(console.log());
  }
  SwitchToggleEdit = () => {
    this.setState({ toggle_formEdit: !this.state.toggle_formEdit });
  };
  SwitchToggleCurso = () => {
    this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
  };
  TurnOffCurso = () => {
    this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
  };
  componentDidMount() {
    this.loadData();
    this.loadPaginador();
  }
  cambioValor = (e) =>{
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({state});
    this.setState({cursosEdit: state});
  }
  deleteData = (ID) =>{
    console.log(ID);
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateState.php?updateStateCursos="+ID)
     .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();
      })
      .catch(console.log());
 }

 loadDataEdit(ID) {
  fetch(
    "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectCuentas.php?ID="+ID
  )
    .then((response) => response.json())
    .then((dataResponse) => {
      this.setState({ loadedData: true, cursosEdit: dataResponse[0], toggle_formEdit: true });  
      console.log(dataResponse[0]); 
      
    })
    .catch(console.log());
}

sendDataCursoEdit = (e) =>{
  e.preventDefault();
  console.log("Sending data..");
  const ID = (this.state.cursosEdit.IDEdit);
  const{codigoCuentaEdit, codigoRamoEdit,fechaInicioEdit, fechaFinEdit, horaInicioEdit, horaFinEdit} = this.state;
  var datosEnviar = {ID:ID ,codigoCuentaEdit: codigoCuentaEdit, codigoRamoEdit: codigoRamoEdit, fechaInicioEdit:fechaInicioEdit, fechaFinEdit:fechaFinEdit, horaInicioEdit: horaInicioEdit, horaFinEdit: horaFinEdit}

  fetch(
    "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editCurso.php?editarCurso",{
      method: "POST",
      body: JSON.stringify(datosEnviar)
    }
  )
    .then((response) => response.json())
    .then((dataResponse) => {
      console.log(datosEnviar);
      console.log(dataResponse);
      this.loadData();
    })
    .catch(console.log());
}






  render() {
    const { loadedData, cursos, paginador } = this.state;
    const toggle_formCurso = this.state.toggle_formCurso;
    const toggle_formEdit = this.state.toggle_formEdit;
    const cursosEdit = this.state.cursosEdit;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
    return (
      <div className="container-fluid">
        <Header></Header>
        <h1 id="subtitulo_pagina">Listado de cursos</h1>
        <div>
          <button id="btn_registrarCliente" onClick={this.SwitchToggleCurso}>Registrar curso</button>
           <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Código del curso</th>
                            <th>Código de la Cuenta</th>
                            <th>Nombre del curso</th>
                            <th>Inicio</th>
                            <th>Fin</th>
                            <th>Estado</th>
                            <th>Operaciones</th>
                      </tr>
                        </thead>
                        <tbody>
                              {cursos.map((curso) => (
                                <tr key={curso.ID}>
                                  <td>{curso.codigoCurso}</td>
                                  <td>{curso.codigoCuenta}</td>
                                  <td>{curso.nombreRamo}</td>
                                  <td>{curso.inicio}</td>
                                  <td>{curso.fin}</td>
                                  <td>{curso.estado}</td>
                                  <td>
                                    <button title="Editar curso" id="btn_edit_cuenta" onClick={() => this.loadDataEdit(curso.ID)} >
                                    <BsPencilSquare />
                                    </button>
                                    <button title="Examinar curso" id="btn_edit_cuenta"><Link style={{color: "black"}} to={"/InfoCursos/"+curso.codigoCurso}><BiShowAlt /></Link></button>
                                    <button title="Eliminar curso" onClick={() => this.deleteData(curso.ID)} id="btn_delete"><BsTrash/></button>

                                  </td>
                                </tr>
                              ))}
                         </tbody>
                         <div id="paginador">
                            {paginador.map((pagina) => (
                            <li key={pagina.paginas}>
                                <button
                                onClick={this.sendNum}
                                name="paginas"
                                value={pagina.paginas}
                                >
                                {pagina.paginas}
                                </button>
                            </li>
                            ))}
                        </div>
                </table>
                
                </div>

        <div id="form_registrarCurso" className={toggle_formCurso ? "active" : "form_registrarCurso"}>
            <div className="btn_close" onClick={this.TurnOffCurso}><BsX /></div>
            <h3>Registro de cursos</h3>
            <form id="form_agregarCurso" onSubmit={this.sendDataCurso}>
              <input type="hidden" id="input_idCurso" />
              <div>
                <label htmlFor="input_idCuenta_Curso">ID de la Cuenta: </label>
                <select name="input_idCuenta_Curso" onChange={this.cambioValor} id="input_idCuenta_Curso">
                  <option value="fondo_esperanza">Fondo Esperanza</option>
                  <option value="Transbank">Transbank</option>
                  <option value="BCI">BCI</option>
                  <option value="BCI_agil">BCI Ágil</option>
                  <option value="BCI_tecnico">BCI Técnico</option>
                </select>
              </div>
              <div>
                <label htmlFor="input_idRamo_Curso">ID del Ramo: </label>
                <select name="input_idRamo_Curso"onChange={this.cambioValor} id="input_idRamo_Curso">
                  <option>JAV</option>
                </select>
              </div>
              <div>
                <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
                <input
                  type="text"
                  name="input_fechaInicio"
                  id="input_fechaInicio"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                />
              </div>
              <div>
                <label htmlFor="input_fechaFin">Fecha Fin: </label>
                <input
                  type="text"
                  name="input_fechaFin"
                  id="input_fechaFin"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                />
              </div>
              <div>
                <label htmlFor="input_horaInicio">Hora Inicio: </label>
                <input
                  type="text"
                  name="input_horaInicio"
                  id="input_horaInicio"
                  placeholder="HH:mm:ss"
                  onChange={this.cambioValor}
                />
              </div>
              <div>
                <label htmlFor="input_horaFin">Hora Fin: </label>
                <input
                  type="text"
                  name="input_horaFin"
                  id="input_horaFin"
                  placeholder="HH:mm:ss"
                  onChange={this.cambioValor}
                />
              </div>
              <div>
                <input
                  type="submit"
                  className="btn_registrar"
                  value="Registrar"
                />
              </div>
            </form>
          </div>
                              
        
          <div id="form_registrarCurso" className={toggle_formEdit ? "active" : "form_registrarCurso"}>    
          <div className="btn_close" onClick={this.SwitchToggleEdit}><BsX /></div>
            <h3>Actualización de cursos</h3>
            <form id="form_agregarCurso" onSubmit={this.sendDataCursoEdit}>
              <input type="hidden" value={cursosEdit.IDEdit}></input>
              <div>
                <label htmlFor="input_idCuenta_Curso">ID de la Cuenta: </label>
                <select name="codigoCuentaEdit" onChange={this.cambioValor} value={cursosEdit.codigoCuentaEdit} id="input_idCuenta_Curso">
                  <option value="fondo_esperanza">Fondo Esperanza</option>
                  <option value="Transbank">Transbank</option>
                  <option value="BCI">BCI</option>
                  <option value="BCI_agil">BCI Ágil</option>
                  <option value="BCI_tecnico">BCI Técnico</option>
                </select>
              </div>
              <div>
                <label htmlFor="input_idRamo_Curso">ID del Ramo: </label>
                <select name="codigoRamoEdit"onChange={this.cambioValor} value={cursosEdit.codigoRamoEdit} id="input_idRamo_Curso">
                  <option>ADM</option>
                  <option>APP</option>
                  <option>BDD</option>
                  <option>DEV</option>
                  <option>JAV</option>
                  <option>JEN</option>
                  <option>JIR</option>
                  <option>LIN</option>
                  <option>PER</option>
                  <option>POS</option>
                  <option>SEE</option>
                  <option>SEL</option>
                  <option>TDD</option>
                  <option>VER</option>
                </select>
              </div>
              <div>
                <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
                <input
                  type="text"
                  name="fechaInicioEdit"
                  id="input_fechaInicio"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                  value={cursosEdit.fechaInicioEdit}
                />
              </div>
              <div>
                <label htmlFor="input_fechaFin">Fecha Fin: </label>
                <input
                  type="text"
                  name="fechaFinEdit"
                  id="input_fechaFin"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                  value={cursosEdit.fechaFinEdit}

                />
              </div>
              <div>
                <label htmlFor="input_horaInicio">Hora Inicio: </label>
                <input
                  type="text"
                  name="horaInicioEdit"
                  id="input_horaInicio"
                  placeholder="HH:mm:ss"
                  onChange={this.cambioValor}
                  value={cursosEdit.horaInicioEdit}

                />
              </div>
              <div>
                <label htmlFor="input_horaFin">Hora Fin: </label>
                <input
                  type="text"
                  name="horaFinEdit"
                  id="input_horaFin"
                  placeholder="HH:mm:ss"
                  onChange={this.cambioValor}
                  value={cursosEdit.horaFinEdit}

                />
              </div>
              <div>
                <input
                  type="submit"
                  className="btn_registrar"
                  value="Actualizar"
                />
              </div>
            </form>
          </div>

      </div>
    );
  }
}

export default ListadoCursos;
