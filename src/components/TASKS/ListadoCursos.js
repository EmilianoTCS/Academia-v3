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
    changed: false, //Valida la edición de los datos
    listadoRamos : [], //Se utiliza en el formulario de inserción de cursos
    listadoCuentas: [], //Se utiliza en el formulario de inserción de cursos
    listadoRelatores: [] //Se utiliza en el formulario de inserción de ramos
  };

  //Recoleta SOLAMENTE LOS NOMBRES de los ramos - Se utiliza para cargar información en los SELECT  
  loadListadoRamos(){
          fetch(
            "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/ListadoNombreRamos.php?listadoRamos"
          )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({listadoRamos : dataResponse})
          })
          .catch(console.log())
  }
  //Recoleta SOLAMENTE LOS NOMBRES de los relatores - Se utiliza para cargar información en los SELECT  
  loadListadoRelatores(){
          fetch(
            "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/ListadoRelatores.php?listadoRelatores"
          )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({listadoRelatores : dataResponse})
          })
          .catch(console.log())
  }
  //Recolecta SOLAMENTE LOS NOMBRES de las cuentas - Se utiliza para cargar información en los SELECT  
  loadListadoCuentas(){
          fetch(
            "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/ListadoCuentas.php?listadoCuentas"
          )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({listadoCuentas : dataResponse})
          })
          .catch(console.log())
  }
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
    this.loadListadoRamos();
    this.loadListadoCuentas();
    this.loadListadoRelatores();
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
    const{codigoCuentaEdit, codigoRamoEdit,fechaInicioEdit, fechaFinEdit, horaInicioEdit, horaFinEdit} = this.state.cursosEdit;
    var datosEnviar = {ID:ID ,codigoCuentaEdit: codigoCuentaEdit, codigoRamoEdit: codigoRamoEdit, fechaInicioEdit:fechaInicioEdit, fechaFinEdit:fechaFinEdit, horaInicioEdit: horaInicioEdit, horaFinEdit: horaFinEdit}

    console.log(datosEnviar);
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
    const listadoRamos = this.state.listadoRamos;
    const listadoCuentas = this.state.listadoCuentas;
    const listadoRelatores = this.state.listadoRelatores;

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
                <select name="input_idCuenta_Curso" value={idCuenta} onChange={this.cambioValor} id="input_idCuenta_Curso">
                  <option defaultValue={"Seleccione una cuenta"}>Seleccione una cuenta</option>
                  {listadoCuentas.map((cuenta) => (
                        <option
                          key={cuenta.ID}
                          value={cuenta.codigoCuenta}
                        >
                          {cuenta.codigoCuenta}
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <select name="input_idRamo_Curso" value={codigoRamo} onChange={this.cambioValor} id="input_idRamo_Curso">
                <option defaultValue={"Seleccione un ramo"}>Seleccione un ramo</option>
                {listadoRamos.map((ramo) => (
                        <option
                          key={ramo.ID}
                          value={ramo.codigoRamo}
                        >
                          {ramo.nombreRamo}
                        </option>
                      ))}
                </select>
              </div>
              <div class="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
                <input 
                type="date" 
                id="input_fechaInicio" 
                name="input_fechaInicio"
                className="form-control"
                onChange={this.cambioValor}
                />
              </div>

              <div className="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="input_fechaFin">Fecha Fin: </label>
                <input
                  className="form-control"
                  type="date"
                  name="input_fechaFin"
                  id="input_fechaFin"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                />
              </div>  

              <div className="md-form md-outline">
                  <label htmlFor="input_horaInicio">Hora Inicio: </label>
                  <input 
                  type="time" 
                  name="input_horaInicio"
                  className="form-control" 
                  id="input_horaInicio"
                  onChange={this.cambioValor} />
              </div>

              <div className="md-form md-outline">
                  <label htmlFor="input_horaFin">Hora Fin: </label>
                  <input 
                  type="time" 
                  name="input_horaFin"
                  className="form-control" 
                  id="input_horaFin"
                  onChange={this.cambioValor} />
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
                  <option value="4">Fondo Esperanza</option>
                  <option value="5">Transbank</option>
                  <option value="1">BCI</option>
                  <option value="2">BCI Ágil</option>
                  <option value="3">BCI Técnico</option>
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

              <div class="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
                <input 
                type="date" 
                id="input_fechaInicio" 
                name="fechaInicioEdit"
                className="form-control"
                onChange={this.cambioValor}
                value={cursosEdit.fechaInicioEdit}
                />
              </div>

              <div class="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="input_fechaInicio">Fecha Fin: </label>
                <input 
                type="date" 
                id="input_fechaInicio" 
                name="fechaFinEdit"
                className="form-control"
                onChange={this.cambioValor}
                value={cursosEdit.fechaFinEdit}
                />
              </div>
                
              <div className="md-form md-outline">
                  <label htmlFor="input_horaInicio">Hora Inicio: </label>
                  <input 
                  type="time" 
                  name="horaInicioEdit"
                  className="form-control" 
                  id="input_horaInicio"
                  onChange={this.cambioValor} 
                  value={cursosEdit.horaInicioEdit}
                  />
              </div>

              <div className="md-form md-outline">
                  <label htmlFor="input_horaInicio">Hora Fin: </label>
                  <input 
                  type="time" 
                  name="horaFinEdit"
                  className="form-control" 
                  id="input_horaInicio"
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
            
            {/* FORM REGISTRAR RAMOS */}
            <div id="form_registrarRamo" className={toggle_formRamo ? "active" : "form_registrarRamo"} >
          <div className="btn_close" onClick={this.SwitchToggleRamo}>
            <BsX />
          </div>
          <h3>Registro de ramos</h3>
          <form id="form_agregarRamo" onSubmit={this.sendDataRamo}>
          <div>
                <select name="input_idCuenta_Curso" value={idCuenta} onChange={this.cambioValor} id="input_idCuenta_Curso">
                  <option defaultValue={"Seleccione una cuenta"}>Seleccione una cuenta</option>
                  {listadoCuentas.map((cuenta) => (
                        <option
                          key={cuenta.ID}
                          value={cuenta.codigoCuenta}
                        >
                          {cuenta.codigoCuenta}
                        </option>
                      ))}
                </select>
              </div>
            <div>
              <label htmlFor="input_idRamo">Código del Ramo: </label>
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
                <select name="pre_requisito" value={pre_requisito} onChange={this.cambioValor} id="input_preRequisito">
                <option defaultValue={"Seleccione un prerequisito"}>Seleccione un prerequisito</option>
                {listadoRamos.map((ramo) => (
                        <option
                          key={ramo.ID}
                          value={ramo.codigoRamo}
                        >
                          {ramo.nombreRamo}
                        </option>
                      ))}
                </select>
              </div>           
            <div>
                <select name="relator" value={relator} onChange={this.cambioValor} id="input_relator">
                  <option defaultValue={"Seleccione una cuenta"}>Seleccione un relator</option>
                  {listadoRelatores.map((relator) => (
                        <option
                          key={relator.ID}
                          value={relator.nombre}
                        >
                          {relator.nombre}
                        </option>
                      ))}
                </select>
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
