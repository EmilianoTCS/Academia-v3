import React, {Component} from "react";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import '../css/Tables.css'
import '../css/Botones.css'
import Header from "../templates/header";


class ListadoRamos extends Component {
    state = { loadedData: false, ramos: [], paginador: [],
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
      horaFin: ""} 

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
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-deleteCursos.php?delete="+ID)
         .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            this.loadData();
          })
          .catch(console.log());
     }




    render() { 
        const { loadedData, ramos, paginador } = this.state;
        const{idCuenta, idRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
        const{fechaInicio, fechaFin, horaInicio, horaFin} = this.state;
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
                    <button id="btn_registrar" onClick={this.SwitchToggleRamo}>Registrar ramo</button>
                    <input type="text" id="search_cuenta" placeholder="Buscador"/>
                    </div>
                    <table id="tabla_curso">
                                              <thead id="list_theadCursos">
                            <tr>
                                <th>ID</th>
                                <th>idCuenta</th>
                                <th>ID del ramo</th>
                                <th>Nombre del ramo</th>
                                <th>HH académicas</th>
                                <th>Pre-requisito</th>
                                <th>Relator</th>
                             </tr>
                        </thead>
                        <tbody id="list_tbodyCursos">
                        {ramos.map((ramo) => (
                                <tr key={ramo.ID}>
                                    <td>{ramo.ID}</td>
                                    <td>{ramo.idCuenta}</td>
                                    <td>{ramo.idRamo}</td>
                                    <td>{ramo.nombreRamo}</td>
                                    <td>{ramo.hh_academicas}</td>
                                    <td>{ramo.pre_requisito}</td>
                                    <td>{ramo.relator}</td>
                                    <td>
                                    <button id="btn_delete" onClick={()=> this.deleteData(ramo.ID)}><BsTrash/></button>
                                    <button id="btn_edit_cuenta"><BsPencilSquare/></button>
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
                  name="fechaInicio"
                  id="input_fechaInicio"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                  value={fechaInicio}
                />
              </div>
              <div>
                <label htmlFor="input_fechaFin">Fecha Fin: </label>
                <input
                  type="text"
                  name="fechaFin"
                  id="input_fechaFin"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                  value={fechaFin}
                />
              </div>
              <div>
                <label htmlFor="input_horaInicio">Hora Inicio: </label>
                <input
                  type="text"
                  name="horaInicio"
                  id="input_horaInicio"
                  placeholder="HH:mm:ss"
                  onChange={this.cambioValor}
                  value={horaInicio}
                />
              </div>
              <div>
                <label htmlFor="input_horaFin">Hora Fin: </label>
                <input
                  type="text"
                  name="horaFin"
                  id="input_horaFin"
                  placeholder="HH:mm:ss"
                  onChange={this.cambioValor}
                  value={horaFin}
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
