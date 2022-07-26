import React, {Component} from "react";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import '../css/Tables.css'
import '../css/Botones.css'
import Header from "../templates/header";
import "../css/Forms.css";


class ListadoRamos extends Component {
    state = { loadedData: false, ramos: [], paginador: [],
      num_boton: "",
      toggle_formRamo: false,
      toggle_formEdit: false,
      toggle_formCurso: false,
      idCuenta : "",
      codigoRamo : "",
      area: "",
      nombreCurso : "",
      hh_academicas: "",
      pre_requisito: "",
      relator: "",
      fechaFin: "",
      fechaInicio: "",
      horaInicio: "",
      horaFin: "",
      ramosEdit : [],
      codigoRamoEdit : "",
      nombreRamoEdit : "",
      hh_academicasEdit : "",
      pre_requisitoEdit : "",
      nombreRelatorEdit: ""} 

    loadData() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listCursos.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, ramos: dataResponse });
          })
          .catch(console.log());
      }
      loadPaginador() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Cursos.php"
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
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listCursos.php?pagina",
          {
            method: "POST",
            body: JSON.stringify(sendNum),
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            console.log(this.state.num_boton);
            this.setState({ ramos: dataResponse });
          })
          .catch(console.log());
      };
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
      SwitchToggleCurso = () => {
        this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
      };
      SwitchToggleRamo = () => {
        this.setState({ toggle_formRamo: !this.state.toggle_formRamo });
      };
      SwitchToggleRamoEdit = () => {
        this.setState({ toggle_formEdit: false });
      };
      componentDidMount() {
        this.loadData();
        this.loadPaginador();
      }
      cambioValor = (e) =>{
        const state = this.state;
        const stateEdit = this.state.ramosEdit;
        state[e.target.name] = e.target.value;
        stateEdit[e.target.name] = e.target.value;
        this.setState({state});
        this.setState({ramosEdit: stateEdit});
      }
      deleteData = (ID) =>{
        console.log(ID);
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateRamos.php?updateStateRamos="+ID)
         .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            this.loadData();
          })
          .catch(console.log());
     }
     loadDataEdit(ID) {
      fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectCursos.php?ID="+ID
      )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({ loadedData: true, ramosEdit: dataResponse[0] });  
          this.setState({toggle_formEdit: true});
        })
        .catch(console.log());
    }
    sendDataRamoEdit = (e) =>{
      const ID = this.state.ramosEdit.ID
      e.preventDefault();
      console.log("Sending data..");
      const{codigoRamo, nombreRamo, hh_academicas, pre_requisito, nombreRelator} = this.state;

      var datosEnviar = {ID: ID, codigoRamo: codigoRamo, 
      nombreRamo:nombreRamo, hh_academicas:hh_academicas, pre_requisito: pre_requisito, nombreRelator: nombreRelator}
      fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editRamo.php?editarRamo",{
          method: "POST",
          body: JSON.stringify(datosEnviar)
        }
      )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({loadedData : true})
          console.log(dataResponse);
        })
        .catch(console.log());
    }


    render() { 
        const { loadedData, ramos, cursos, paginador } = this.state;
        const{idCuenta, codigoRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
        const toggle_formRamo = this.state.toggle_formRamo;
        const toggle_formEdit = this.state.toggle_formEdit;
        const toggle_formCurso = this.state.toggle_formCurso;
        const ramosEdit = this.state.ramosEdit;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
        return (
            <div className="container-fluid">
             <Header></Header> 
            <h1 id="subtitulo_pagina">Listado de ramos</h1>
             <button id="btn_registrarCliente" onClick={this.SwitchToggleRamo}>Registrar ramo</button>
             <button id="btn_registrarCliente" style={{marginLeft : "1%"}} onClick={this.SwitchToggleCurso}>Registrar curso</button>

            {/* LISTADO DE RAMOS */}
             <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                    <tr>

                                <th>ID del ramo</th>
                                <th>Nombre del ramo</th>
                                <th>HH académicas</th>
                                <th>Pre-requisito</th>
                                <th>Relator</th>
                                <th>Área</th>
                                <th>Operaciones</th>
                             </tr>
                        </thead>
                        <tbody>
                        {ramos.map((ramo) => (
                                <tr key={ramo.ID}>
                                    <td>{ramo.codigoRamo}</td>
                                    <td>{ramo.nombreRamo}</td>
                                    <td>{ramo.hh_academicas}</td>
                                    <td>{ramo.pre_requisito}</td>
                                    <td>{ramo.nombre}</td>
                                    <td>{ramo.area}</td>
                                    <td>
                                    <button onClick={() => this.loadDataEdit(ramo.ID)} title="Editar ramo" id="btn_edit_cuenta"><BsPencilSquare /></button>
                                    <button title="Examinar ramo" id="btn_edit_cuenta"><BiShowAlt /></button>
                                    <button title="Eliminar ramo" id="btn_delete" onClick={()=> this.deleteData(ramo.ID)}><BsTrash/></button>
                                    </td>
                                </tr>
                ))}
                         </tbody>
                         <div id="paginador">
                            {paginador.map((pagina) => (
                            <li>
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
            {/* FORM REGISTRAR RAMOS */}
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
                  value="Actualizar"
                />
              </div>
          </form>
                </div>
            {/* FORM ACTUALIZAR RAMOS */}
            <div id="form_registrarRamo" className={toggle_formEdit ? "active" : "form_registrarRamo"}>
        <div className="btn_close" onClick={this.SwitchToggleRamoEdit}>
            <BsX />
          </div>
            <h3>Actualización de ramos</h3>
            <form id="form_agregarRamo" onSubmit={this.sendDataRamoEdit}>
                <div>
                <label htmlFor="input_idRamo">Codigo del Ramo: </label>
                <input
                    type="text"
                    name="codigoRamo"
                    id="input_codigoRamo"
                    placeholder="Ejemplo: JAV"
                    onChange={this.cambioValor}
                    value={ramosEdit.codigoRamo}
                />
                </div>
                <div>
                <label htmlFor="input_nombreRamo">Nombre del ramo: </label>
                <input
                    type="text"
                    name="nombreRamo"
                    id="input_nombreRamo"
                    onChange={this.cambioValor}
                    value={ramosEdit.nombreRamo}
                />
                </div>
                <div>
                <label htmlFor="input_hhAcademicas">Horas académicas: </label>
                <input
                    type="text"
                    name="hh_academicas"
                    id="input_hhAcademicas"
                    onChange={this.cambioValor}
                    value={ramosEdit.hh_academicas}
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
            </div>
        );
    }
}
 
export default ListadoRamos
