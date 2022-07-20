import React, {Component} from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import '../css/Tables.css';
import Header from "../templates/header";

import '../css/Botones.css';
import '../css/Forms.css';
import { BiShowAlt } from "react-icons/bi";

class ListadoRelator extends Component {
    state = { 
      loadedData: false, 
      relatores: [], 
      paginador: [],
      num_boton: "",
      relator: "",
      codigoRamo: "",
      area: "",
      nombreRamo:"",
      hh_academicas: "",
      pre_requisito: "",
      toggle_formRelator: false,
      toggle_formEdit: false,
      relatoresEdit: [],
      IDEdit: "",
      nombreEdit: "",
      areaEdit: ""
} 

    loadData() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listOrador.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, relatores: dataResponse });
          })
          .catch(console.log());
      }

      loadPaginador() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Relator.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ paginador: dataResponse });
          })
          .catch(console.log());
      }
    
      sendNum = (e) => {
        e.preventDefault();
        const num_boton = e.target.value;
        this.setState({num_boton : num_boton})
        var sendNum = {num_boton : num_boton}
    
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listOrador.php?pagina",
          {
            method: "POST",
            body: JSON.stringify(sendNum),
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ relatores: dataResponse });
            console.log(dataResponse);
            console.log(sendNum);
          })
          .catch(console.log());
      };

     componentDidMount() {
        this.loadData();
        this.loadPaginador();
      }

      cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state});
        this.setState({relatoresEdit: state});
      }

      sendDataRelator = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const {relator, idCuenta, codigoRamo, nombreRamo, hh_academicas, pre_requisito, area} = this.state;
        var datosEnviar = {idCuenta: idCuenta, codigoRamo: codigoRamo, 
          nombreRamo:nombreRamo, relator:relator, hh_academicas:hh_academicas, pre_requisito: pre_requisito, area: area}
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarRelator.php?insertarRelator",{
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
    SwitchToggleRelator = () => {
      this.setState({ toggle_formRelator: !this.state.toggle_formRelator });
    };
    SwitchToggleFormEdit = () => {
      this.setState({ toggle_formEdit: false });
    };
    
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

   loadDataEdit(ID) {
    console.log(ID);
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectRelatores.php?ID="+ID
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, relatoresEdit: dataResponse[0] });  
        this.setState({toggle_formEdit: true});
        console.log(dataResponse);
      })
      .catch(console.log());
  }
  sendDataRelatorEdit = (e) =>{
    e.preventDefault();
    console.log("Sending data..");
    console.log(this.state.relatoresEdit.IDEdit);
    const{ nombreEdit, areaEdit, IDEdit} = this.state;

    var datosEnviar = {IDEdit: IDEdit, nombre: nombreEdit, area:areaEdit}
    console.log(datosEnviar);
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editRelatores.php?editarRelatores",{
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
        const { loadedData, relatores, paginador } = this.state;
        const toggle_formRelator = this.state.toggle_formRelator;
        const toggle_formEdit = this.state.toggle_formEdit;
        const {relator, idCuenta, codigoRamo, nombreRamo, hh_academicas, pre_requisito, area} = this.state;
        const relatoresEdit = this.state.relatoresEdit;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
        return (
            <div className="container-fluid">
                <Header></Header>
               <h1 id="subtitulo_pagina">Listado de relatores</h1>
                <button id="btn_registrarCliente" onClick={this.SwitchToggleRelator}>Registrar relator</button>
                <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                    <tr>
                                <th>ID</th>
                                <th>Relator</th>
                                <th>Área</th>
                                <th>Cuenta</th>
                                <th>Código Ramo</th>
                                <th>Nombre del ramo</th>
                                <th>Operaciones</th>
                             </tr>
                        </thead>
                        <tbody>
                        {relatores.map((relator) => (
                                <tr>
                                    <td>{relator.ID}</td>
                                    <td>{relator.nombre}</td>
                                    <td>{relator.area}</td>
                                    <td>{relator.codigoCuenta}</td>
                                    <td>{relator.codigoRamo}</td>
                                    <td>{relator.nombreRamo}</td>
                                    <td>
                                    <button onClick={() => this.loadDataEdit(relator.ID)} title="Editar relator" id="btn_edit_cuenta"><BsPencilSquare/></button>
                                    <button title="Examinar relator"id="btn_edit_cuenta"><BiShowAlt /></button>
                                    <button title="Eliminar relator" id="btn_delete"><BsTrash/></button>

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

        <div id="form_registrarOrador" className={ toggle_formRelator ? "active" : "form_registrarOrador"}>
            <div className="btn_close" onClick={this.SwitchToggleRelator}>&times;</div>
            <h3 id="registrar">Registro de Oradores</h3>
            <form id="form_agregarOrador" onSubmit={this.sendDataRelator} >
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
                  <label htmlFor="input_relator">Relator: </label>
                  <input type="text" name="relator" id="input_relator" onChange={this.cambioValor} value={relator}/>
              </div>
            
              <div>
                  <label htmlFor="input_idRamo">ID del Ramo: </label>
                  <input type="text" name="codigoRamo" id="input_idRamo" placeholder="Ejemplo: JAV" onChange={this.cambioValor} value={codigoRamo}/>
              </div>
              <div>
                  <label htmlFor="input_areaRamo">Área: </label>
                  <input type="text" name="area" id="input_areaRamo" placeholder="Ejemplo: Automatización"onChange={this.cambioValor} value={area}/>
              </div>
              <div>
                  <label htmlFor="input_nombreCurso">Nombre del Curso: </label>
                  <input type="text" name="nombreRamo" id="input_nombreCurso" placeholder="Ejemplo: JAVA" onChange={this.cambioValor} value={nombreRamo}/>
              </div>
              <div>
                  <label htmlFor="input_hhAcademicas">Horas académicas: </label>
                  <input type="text" name="hh_academicas" id="input_hhAcademicas" onChange={this.cambioValor} value={hh_academicas}/>
              </div>
              <div>
                  <label htmlFor="input_preRequisito">Pre-Requisito: </label>
                  <input type="text" name="input_preRequisito" id="pre_requisito" placeholder="Ejemplo: JAV-SEL" onChange={this.cambioValor} value={pre_requisito}/>
              </div>
              <div id="button_container">
                  <input type="submit" id="btn_registrar" value="Registrar"/>
              </div>
          </form>
    </div>

    <div id="form_registrarOrador" className={ toggle_formEdit ? "active" : "form_registrarOrador"}>
            <div className="btn_close" onClick={this.SwitchToggleFormEdit}>&times;</div>
            <h3 id="registrar">Actualizar Oradores</h3>
            <form id="form_agregarOrador" onSubmit={this.sendDataRelatorEdit} >
              <input type="text" name="IDEdit" value={relatoresEdit.IDEdit}/>
              <div>
                  <label htmlFor="input_relator">Nombre: </label>
                  <input type="text" onChange={this.cambioValor} name="nombreEdit" id="input_relator"  value={relatoresEdit.nombre}/>
              </div>
              <div>
                  <label htmlFor="input_areaRamo">Área: </label>
                  <input type="text" name="areaEdit" id="input_areaRamo" placeholder="Ejemplo: Automatización"value={relatoresEdit.area}/>
              </div>
              <div id="button_container">
                  <input type="submit" onChange={this.cambioValor} id="btn_registrar" value="Actualizar"/>
              </div>
          </form>
    </div>


            </div>
        );
    }
}
 
export default ListadoRelator
