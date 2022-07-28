import React, {Component} from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import '../css/Tables.css';
import Header from "../templates/header";
import '../css/Botones.css';
import '../css/Forms.css';

class ListadoRelator extends Component {

    // Declaración de variables iniciales
    state = { 
      loadedData: false, //Booleano que se activa cuando es recibida la carga de datos
      relatores: [], //Array donde serán almacenados los registros del JSON que vienen del backend
      paginador: [], //Recibe la cantidad de páginas totales desde el backend
      num_boton: "", //Es el botón seleccionado del paginador
      relator: "", // {Strings vacíos donde serán almacenados los valores de los inputs para introducir registros
      codigoRamo: "",
      area: "",
      nombreRamo:"",
      hh_academicas: "",
      pre_requisito: "", // }
      toggle_formRelator: false, //Booleano para la visibilidad del formulario
      toggle_formEdit: false, //Booleano para la visibilidad del formulario
      relatoresEdit: [],  //Array donde serán almacenados los registros del JSON que vienen del backend
      IDEdit: "", // {Strings vacíos donde se introducen los valores del input para la edición de datos
      nombreEdit: "",
      areaEdit: "", // }
      changed: false //Booleano que valida la edición de los datos
} 
      // Recolecta los datos del registro de relatores
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

      // Recolecta los datos del paginador
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

      // Envía el número seleccionado del paginador a la sentencia SQL para poder cambiar de página
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
          })
          .catch(console.log());
      };

      // Realiza la carga automática de funciones en el instante que se ingresó a la pantalla
     componentDidMount() {
        this.loadData();
        this.loadPaginador();
      }

      // Se activa con la función OnChange cambiando el estado inicial de vacío por el ingresado en los inputs
      cambioValor = (e) =>{
        const state = this.state;
        const stateEdit = this.state.relatoresEdit;
        state[e.target.name] = e.target.value;
        stateEdit[e.target.name] = e.target.value;
        this.setState({state});
        this.setState({relatoresEdit: stateEdit});
      }

      // Envía los datos del formulario de creación a la sentencia SQL
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
      
      // Permite alternar la visibilidad del formulario de creación de datos
      SwitchToggleRelator = () => {
      this.setState({ toggle_formRelator: !this.state.toggle_formRelator });
      };

      // Permite alternar la visibilidad del formulario de actualización de datos
      SwitchToggleFormEdit = () => {
      this.setState({ toggle_formEdit: false });
      };
    
      // Función para "eliminar", solamente deshabilita su visibilidad en los registros y puede ser rehabilitada en la página Administrador
      deleteData = (ID) =>{
      console.log(ID);
      fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateRelator.php?updateStateRelator="+ID)
       .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          this.loadData();
        })
        .catch(console.log());
      }

      // Recolecta los datos de un registro en específico utilizando el ID como referencia, se activa el botón de editar
       loadDataEdit(ID) {
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
      
      // Envía los datos del formulario de actualización a la sentencia SQL
      sendDataRelatorEdit = (e) =>{
        e.preventDefault();
        const IDEdit = this.state.relatoresEdit.IDEdit;
        const {nombreEdit, areaEdit }= this.state.relatoresEdit

        var datosEnviar = {IDEdit: IDEdit, nombreEdit: nombreEdit, areaEdit:areaEdit}
        console.log(datosEnviar);

        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editRelatores.php?editarRelatores",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
          }
        )
          .then((response) => response.json())
          .then(() => {
            this.setState({loadedData : true})
            this.setState({changed : false}) //Reestablece el estado inicial del booleano

          })
          .catch(console.log());
      }




    render() { 
        // Definición de constantes referenciando a this.state
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

                {/* LISTADO DE RELATORES */}
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
                                    <button onClick={() => this.deleteData(relator.ID)} title="Eliminar relator" id="btn_delete"><BsTrash/></button>

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

                {/* FORM REGISTRAR RELATOR */}
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

              {/* FORM ACTUALIZAR RELATOR  */}
              <div id="form_registrarOrador" className={ toggle_formEdit ? "active" : "form_registrarOrador"}>
                        <div className="btn_close" onClick={this.SwitchToggleFormEdit}>&times;</div>
                        <h3 id="registrar">Actualización de relatores</h3>
                        <form id="form_agregarOrador" onSubmit={this.sendDataRelatorEdit} >
                          <div>
                              <label htmlFor="input_relator">Nombre: </label>
                              <input type="text" onChange={this.cambioValor} name="nombreEdit" id="input_relator"  value={relatoresEdit.nombreEdit}/>
                          </div>
                          <div>
                              <label htmlFor="input_areaRamo">Área: </label>
                              <input type="text" name="areaEdit" onChange={this.cambioValor} id="input_areaRamo" placeholder="Ejemplo: Automatización"value={relatoresEdit.areaEdit}/>
                          </div>
                          <div id="button_container">
                              <input type="submit"  id="btn_registrar" value="Actualizar"/>
                          </div>
                      </form>
                </div>
            </div>
        );
    }
}
 
export default ListadoRelator
