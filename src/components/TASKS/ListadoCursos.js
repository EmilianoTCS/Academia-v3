import React, { Component } from "react";
import { BsPencilSquare, BsX, BsTrash } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";

import { Link } from "react-router-dom";
import "../css/Tables.css";
import Header from "../templates/header";
import "../css/Paginador.css";
import '../css/Botones.css'
import "../css/Forms.css";
class ListadoCursos extends Component {
  state = {
    loadedData: false, //Se activa cuando recibe la carga de datos
    cursos: [], //Array que recibe los datos desde el backend
    paginador: [], //Recibe la cantidad de páginas totales desde el backend
    num_boton: "", //Botón seleccionado del paginador
    toggle_formEdit: false, //Activa la visibilidad del formulario de edición
    toggle_formCurso: false, // Activa la visibilidad del formulario de creación de curso
    toggle_formRamo: false, // Activa la visibilidad del formulario de creación de ramos
    // Strings vacíós donde serán insertados los valores obtenidos desde los input{
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
    //}
    cursosEdit: [], //Array que recibe los datos desde el backend del curso seleccionado
    changed: false //Valida la edición de los datos
  };

  //Carga los datos de los cursos para introducirlos en la tabla
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
  //Carga los datos del paginador
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
  //Envía el número seleccionado para cambiar de página
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
  //Envía los datos del formulario de creación de ramos
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
  //Envía los datos del formulario de creación de cursos
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
  //Habilita / deshabilita la visibilidad del formulario de edición de registros
  SwitchToggleEdit = () => {
    this.setState({ toggle_formEdit: !this.state.toggle_formEdit });
  };
  //Habilita / deshabilita la visibilidad del formulario de creación de cursos
  SwitchToggleCurso = () => {
    this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
  };
  //Habilita / deshabilita la visibilidad del formulario de creación de ramos
  SwitchToggleRamo = () => {
    this.setState({ toggle_formRamo: !this.state.toggle_formRamo });
  };
  //Realiza la carga automática de funciones al ingresar a la página
  componentDidMount() {
    this.loadData();
    this.loadPaginador();
  }
  // Detecta cambios de los valores ingresados en el input
  cambioValor = (e) =>{
    const state = this.state;
    const stateEdit = this.state.cursosEdit;
    state[e.target.name] = e.target.value;
    stateEdit[e.target.name] = e.target.value;
    this.setState({state});
    this.setState({cursosEdit: stateEdit});
  }
  // "Elimina" el registro seleccionado, pero puede volver a habilitarse en la página Administrador
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
  //Carga los datos del curso seleccionado
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
  //Envía los datos del formulario de creación de ramos
  sendDataRamo = (e) =>{
  e.preventDefault();
  console.log("Sending data..");
  const{idCuenta, codigoRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
  var datosEnviar = {idCuenta: idCuenta, codigoRamo: codigoRamo, 
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
    })
    .catch(console.log());
  }
  //Envía los datos del formulario de edición de cursos
  sendDataCursoEdit = (e) =>{
  e.preventDefault();
  const ID = (this.state.cursosEdit.IDEdit);
  const changed = this.state.changed;
  if(!changed){
    const{codigoCuentaEdit, codigoRamoEdit,fechaInicioEdit, fechaFinEdit, horaInicioEdit, horaFinEdit} = this.state.cursosEdit;
    var datosEnviar = {ID:ID ,codigoCuentaEdit: codigoCuentaEdit, codigoRamoEdit: codigoRamoEdit, fechaInicioEdit:fechaInicioEdit, fechaFinEdit:fechaFinEdit, horaInicioEdit: horaInicioEdit, horaFinEdit: horaFinEdit}
  }else{
    const{codigoCuentaEdit, codigoRamoEdit,fechaInicioEdit, fechaFinEdit, horaInicioEdit, horaFinEdit} = this.state;
    var datosEnviar = {ID:ID ,codigoCuentaEdit: codigoCuentaEdit, codigoRamoEdit: codigoRamoEdit, fechaInicioEdit:fechaInicioEdit, fechaFinEdit:fechaFinEdit, horaInicioEdit: horaInicioEdit, horaFinEdit: horaFinEdit}
  }
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
    const toggle_formRamo = this.state.toggle_formRamo;
    const toggle_formEdit = this.state.toggle_formEdit;
    const cursosEdit = this.state.cursosEdit;
    const{idCuenta, codigoRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;


    if (!loadedData) {
      return <div>Loading data...</div>;
    }
    return (
      <div className="container-fluid">
        <Header></Header>
        <h1 id="subtitulo_pagina">Listado de cursos</h1>

        {/* LISTADO DE CURSOS */}
        <div>
          <div className="row">
          <button id="btn_registrarCliente" onClick={this.SwitchToggleCurso}>Registrar curso</button>
          <button id="btn_registrarCliente" style={{marginLeft : "1%"}} onClick={this.SwitchToggleRamo}>Registrar ramo</button>
          </div>
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
        {/* FORM REGISTRAR CURSO */}
        <div id="form_registrarCurso" className={toggle_formCurso ? "active" : "form_registrarCurso"}>
            <div className="btn_close" onClick={this.SwitchToggleCurso}><BsX /></div>
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
        {/* FORM ACTUALIZAR CURSO */}
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
        {/* FORM REGISTRAR RAMO */}
          <div id="form_registrarRamo" className={toggle_formRamo ? "active" : "form_registrarRamo"} >
          <div className="btn_close" onClick={this.SwitchToggleRamo}>
            <BsX />
          </div>
          <h3>Registro de ramos</h3>
          <form id="form_agregarRamo" onSubmit={this.sendDataRamo}>
            <div>
              <label htmlFor="input_idCuenta">ID de la Cuenta: </label>
              <select name="idCuenta" onChange={this.cambioValor} value={idCuenta} id="input_idCuenta">
                <option value="fondo_esperanza">Fondo Esperanza</option>
                <option value="Transbank">Transbank</option>
                <option value="BCI">BCI</option>
                <option value="BCI_agil">BCI Ágil</option>
                <option value="BCI_tecnico">BCI Técnico</option>
              </select>
            </div>
            <div>
              <label htmlFor="input_idRamo">ID del Ramo: </label>
              <input
                type="text"
                name="codigoRamo"
                id="input_idRamo"
                placeholder="Ejemplo: JAV"
                onChange={this.cambioValor}
                value={codigoRamo}
              />
            </div>
            <div>
              <label htmlFor="input_areaRamo">Área: </label>
              <input
                type="text"
                name="area"
                id="input_areaRamo"
                placeholder="Ejemplo: Automatización"
                onChange={this.cambioValor}
                value={area}
              />
            </div>
            <div>
              <label htmlFor="input_nombreCurso">Nombre del Curso: </label>
              <input
                type="text"
                name="nombreCurso"
                id="input_nombreCurso"
                placeholder="Ejemplo: JAVA"
                onChange={this.cambioValor}
                value={nombreCurso}
              />
            </div>
            <div>
              <label htmlFor="input_hhAcademicas">Horas académicas: </label>
              <input
                type="text"
                name="hh_academicas"
                id="input_hhAcademicas"
                onChange={this.cambioValor}
                value={hh_academicas}
              />
            </div>
            <div>
              <label htmlFor="input_preRequisito">Pre-Requisito: </label>
              <input
                type="text"
                name="pre_requisito"
                id="input_preRequisito"
                placeholder="Ejemplo: JAV-SEL"
                onChange={this.cambioValor}
                value={pre_requisito}
              />
            </div>
            <div>
              <label htmlFor="input_relator">Relator: </label>
              <input type="text" name="relator" id="input_relator"
               onChange={this.cambioValor}
               value={relator}
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
      </div>
    );
  }
}

export default ListadoCursos;
