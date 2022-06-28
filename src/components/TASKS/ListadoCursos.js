import React, { Component } from "react";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import Header from "../templates/header";
import "../css/Paginador.css";
import '../css/Botones.css'
import "../css/Forms.css";
class ListadoCursos extends Component {
  state = {
    loadedData: false,
    cursos: [],
    paginador: [],
    num_boton: "",
    toggle_formRamo: false,
    toggle_formCurso: false,
    idCuenta : "",
    idRamo : "",
    area: "",
    nombreCurso : "",
    hh_academicas: "",
    pre_requisito: "",
    relator: "",
    fechaFin: "",
    fechaInicio: "",
    horaInicio: "",
    horaFin: ""
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
    const{idCuenta, idRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
    var datosEnviar = {idCuenta: idCuenta, idRamo: idRamo, 
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
    const{idCuenta, idRamo, nombreCurso, fechaInicio, fechaFin, horaInicio, horaFin} = this.state;
    var datosEnviar = {idCuenta: idCuenta, idRamo: idRamo, 
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
  SwitchToggleRamo = () => {
    this.setState({ toggle_formRamo: !this.state.toggle_formRamo });
  };
  SwitchToggleCurso = () => {
    this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
    this.SwitchToggleRamo();
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
  }

    deleteData = (ID) =>{
      console.log(ID);
      fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-deleteCuentas.php?delete="+ID)
       .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          this.loadData();
        })
        .catch(console.log());
   }

  render() {
    const { loadedData, cursos, paginador } = this.state;
    const{idCuenta, idRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
    const toggle_formRamo = this.state.toggle_formRamo;
    const toggle_formCurso = this.state.toggle_formCurso;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
    return (
      <div>
        <Header></Header>
        <div id="container_tabla">
        <div id="btn_container">
          <button id="btn_registrar" onClick={this.SwitchToggleRamo}>
            Registrar curso
          </button>
          <input type="text" id="search_cuenta" placeholder="Buscador" />
          </div>
          <table id="tabla_cuenta">
            <thead id="list_theadCuentas">
              <tr>
                <th>ID</th>
                <th>idCuenta</th>
                <th>Nombre del curso</th>
                <th>ID del curso</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody id="list_tbodyCuentas">
              {cursos.map((curso) => (
                <tr key={curso.ID}>
                  <td>{curso.ID}</td>
                  <td>{curso.idCuenta}</td>
                  <td>{curso.idCurso}</td>
                  <td>{curso.nombreRamo}</td>
                  <td>{curso.inicio}</td>
                  <td>{curso.fin}</td>
                  <td>{curso.estado}</td>
                  <td>
                    <button id="btn_delete" onClick={()=>this.deleteData(curso.ID)}>
                      <BsTrash />
                    </button>
                    <button id="btn_edit_cuenta">
                      <BsPencilSquare />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </div>
        <div id="form_registrarRamo" className={toggle_formRamo ? "active" : "form_registrarRamo"} >
          <div className="btn_close" onClick={this.SwitchToggleRamo}>
            <BsX />
          </div>
          <h3>Registro de cursos</h3>
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
                name="idRamo"
                id="input_idRamo"
                placeholder="Ejemplo: JAV"
                onChange={this.cambioValor}
                value={idRamo}
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
              <input type="submit" id="btn_sig" value="Siguiente" onClick={this.SwitchToggleCurso} />
            </div>
          </form>
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
      </div>
    );
  }
}

export default ListadoCursos;
