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

  SwitchToggleRamo = () => {
    this.setState({ toggle_formRamo: !this.state.toggle_formRamo });
  };
  SwitchToggleCurso = () => {
    this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
    this.setState({ toggle_formRamo: this.state.toggle_formRamo });
  };
  componentDidMount() {
    this.loadData();
    this.loadPaginador();
  }


  //   deleteData = (idUsuario) =>{
  //     console.log(idUsuario);
  //     fetch(
  //       "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-deleteColaborador.php?idUsuario="+idUsuario)
  //      .then((response) => response.json())
  //       .then((dataResponse) => {
  //         console.log(dataResponse);
  //         this.loadData();
  //       })
  //       .catch(console.log());
  //  }

  render() {
    const { loadedData, cursos, paginador } = this.state;
    const toggle_formRamo = this.state.toggle_formRamo;

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
                  <td>{curso.idCuenta}</td>
                  <td>{curso.idCurso}</td>
                  <td>{curso.nombreRamo}</td>
                  <td>{curso.inicio}</td>
                  <td>{curso.fin}</td>
                  <td>{curso.estado}</td>
                  <td>
                    <button id="btn_delete">
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
        <div
          id="form_registrarRamo"
          className={toggle_formRamo ? "active" : "form_registrarRamo"}
        >
          <div className="btn_close" onClick={this.SwitchToggleRamo}>
            <BsX />
          </div>
          <h3>Registro de cursos</h3>
          <form id="form_agregarRamo" action="" method="post">
            <div>
              <label htmlFor="input_idCuenta">ID de la Cuenta: </label>
              <select name="input_idCuenta" id="input_idCuenta">
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
                name="input_idRamo"
                id="input_idRamo"
                placeholder="Ejemplo: JAV"
              />
            </div>
            <div>
              <label htmlFor="input_areaRamo">Área: </label>
              <input
                type="text"
                name="input_areaRamo"
                id="input_areaRamo"
                placeholder="Ejemplo: Automatización"
              />
            </div>
            <div>
              <label htmlFor="input_nombreCurso">Nombre del Curso: </label>
              <input
                type="text"
                name="input_nombreCurso"
                id="input_nombreCurso"
                placeholder="Ejemplo: JAVA"
              />
            </div>
            <div>
              <label htmlFor="input_hhAcademicas">Horas académicas: </label>
              <input
                type="text"
                name="input_hhAcademicas"
                id="input_hhAcademicas"
              />
            </div>
            <div>
              <label htmlFor="input_preRequisito">Pre-Requisito: </label>
              <input
                type="text"
                name="input_preRequisito"
                id="input_preRequisito"
                placeholder="Ejemplo: JAV-SEL"
              />
            </div>
            <div>
              <label htmlFor="input_relator">Relator: </label>
              <input type="text" name="input_relator" id="input_relator" />
            </div>
            <div>
              <input type="submit" id="btn_sig" value="Siguiente" />
            </div>
          </form>

          <div id="form_registrarCurso">
            <div className="btn_close"><BsX /></div>
            <h3>Registro de cursos</h3>
            <form id="form_agregarCurso" action="" method="post">
              <input type="hidden" id="input_idCurso" />
              <div>
                <label htmlFor="input_idCuenta_Curso">ID de la Cuenta: </label>
                <select name="input_idCuenta_Curso" id="input_idCuenta_Curso">
                  <option value="fondo_esperanza">Fondo Esperanza</option>
                  <option value="Transbank">Transbank</option>
                  <option value="BCI">BCI</option>
                  <option value="BCI_agil">BCI Ágil</option>
                  <option value="BCI_tecnico">BCI Técnico</option>
                </select>
              </div>
              <div>
                <label htmlFor="input_idRamo_Curso">ID del Ramo: </label>
                <select
                  name="input_idRamo_Curso"
                  id="input_idRamo_Curso"
                ></select>
              </div>
              <div>
                <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
                <input
                  type="text"
                  name="input_fechaInicio"
                  id="input_fechaInicio"
                  placeholder="yyyy-mm-dd"
                />
              </div>
              <div>
                <label htmlFor="input_fechaFin">Fecha Fin: </label>
                <input
                  type="text"
                  name="input_fechaFin"
                  id="input_fechaFin"
                  placeholder="yyyy-mm-dd"
                />
              </div>
              <div>
                <label htmlFor="input_horaInicio">Hora Inicio: </label>
                <input
                  type="text"
                  name="input_horaInicio"
                  id="input_horaInicio"
                  placeholder="HH:mm:ss"
                />
              </div>
              <div>
                <label htmlFor="input_horaFin">Hora Fin: </label>
                <input
                  type="text"
                  name="input_horaFin"
                  id="input_horaFin"
                  placeholder="HH:mm:ss"
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
      </div>
    );
  }
}

export default ListadoCursos;
