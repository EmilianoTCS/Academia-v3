import React, {Component} from "react";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import '../css/Tables.css'
import '../css/Botones.css'
import Header from "../templates/header";
import { Link } from "react-router-dom";


class ListadoRamos extends Component {
    state = { loadedData: false, ramos: [], paginador: [],
      num_boton: "",
      toggle_formRamo: false,
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
        const{idCuenta, codigoRamo, nombreCurso, fechaInicio, fechaFin, horaInicio, horaFin} = this.state;
        var datosEnviar = {idCuenta: idCuenta, codigoRamo: codigoRamo, 
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
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateRamos.php?updateStateRamos="+ID)
         .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            this.loadData();
          })
          .catch(console.log());
     }




    render() { 
        const { loadedData, ramos, paginador } = this.state;
        const{idCuenta, codigoRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
        const toggle_formRamo = this.state.toggle_formRamo;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
        return (
            <div className="container-fluid">
             <Header></Header> 
            <h1 id="subtitulo_pagina">Listado de ramos</h1>

             <button id="btn_registrarCliente" onClick={this.SwitchToggleRamo}>Registrar ramo</button>
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
                                    <button title="Editar ramo" id="btn_edit_cuenta"><Link style={{color: "black"}} to={"/EditarRamos/"+ramo.ID}><BsPencilSquare /></Link></button>
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
              <input type="submit" id="btn_sig" value="Siguiente" onClick={this.SwitchToggleCurso} />
            </div>
          </form>
        </div>
            </div>
        );
    }
}
 
export default ListadoRamos
