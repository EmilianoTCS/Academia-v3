import React, { Component } from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";
import { BiShowAlt } from "react-icons/bi";

import '../css/Tables.css';
class ListadoClientes extends Component {
    state = { 
      loadedData: false, //Se activa cuando recibe la carga de datos
      clientes: [],  //Array que recibe los datos desde el backend
      paginador: [], //Recibe la cantidad de páginas totales desde el backend
      num_boton: "", //Botón seleccionado del paginador
      // Strings vacíós donde serán insertados los valores obtenidos desde los input{
      tipo_cliente: "", 
      nombreCliente: "", 
      referente: "", 
      correoReferente: "", 
      cargoReferente: "", 
      telefonoReferente: "", 
      // }
      isActive: true, 
      toggle_formClientes: false, // Activa la visibilidad del formulario de creación de clientes
      clientesEdit: [], //Array que recibe los datos desde el backend del cliente seleccionado
      changed: false //Valida la edición de los datos
    }
    
      // Recolecta los datos del registro de clientes
      loadData() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listClientes.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, clientes: dataResponse });
          })
          .catch(console.log());
      }

      // Recolecta los datos del paginador
      loadPaginador() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Clientes.php"
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
        console.log("Sending data..");
        const num_boton = e.target.value;
        this.setState({ num_boton: num_boton });
        var sendNum = { num_boton: num_boton };
    
        fetch(
            "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listClientes.php?pagina",
          {
            method: "POST",
            body: JSON.stringify(sendNum),
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ clientes: dataResponse });
          })
          .catch(console.log());
      };

      // Realiza la carga automática de funciones en el instante que se ingresó a la pantalla
      componentDidMount() {
        this.loadData();
        this.loadPaginador();
      }

      // Permite alternar la visibilidad del formulario de creación de datos
      SwitchToggleClientes = () => {
        this.setState({
          toggle_formClientes: !this.state.toggle_formClientes,
        });
      };

      // Se activa con la función OnChange cambiando el estado inicial de vacío por el ingresado en los inputs
      cambioValor = (e) => {
        const state = this.state;
        const stateEdit = this.state;
        state[e.target.name] = e.target.value;
        stateEdit[e.target.name] = e.target.value;
        this.setState({ state });
        this.setState({ clientesEdit: stateEdit });
        this.setState({changed: true});
      };

      // Envía los datos del formulario de creación a la sentencia SQL
      sendData = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const {tipo_cliente,nombreCliente,referente,correoReferente,cargoReferente, telefonoReferente, isActive} = this.state
    
        var datosEnviar = {tipo_cliente: tipo_cliente, nombreCliente: nombreCliente, 
            referente:referente, correoReferente:correoReferente, cargoReferente: cargoReferente, telefonoReferente: telefonoReferente, isActive:isActive}
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarCliente.php?insertarCliente",{
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

      // Recolecta los datos de un registro en específico utilizando el ID como referencia
      loadDataEdit(ID) {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectClientes.php?ID="+ID
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, clientesEdit: dataResponse[0]});
            this.setState({toggle_formEdit : true})
          })
          .catch(console.log());
      }

      // Envía los datos del formulario de actualización a la sentencia SQL
      sendDataClientesEdit = (e) =>{
        e.preventDefault();
        const ID = this.state.clientesEdit.ID;
        const changed = this.state.changed;
        if(!changed){
          const{ tipo_cliente, nombreCliente, referente, correoReferente, cargoReferente, telefonoReferente} = this.state.clientesEdit;
          var datosEnviar = {ID: ID, tipo_cliente : tipo_cliente, nombreCliente: nombreCliente, referente: referente, correoReferente: correoReferente, cargoReferente: cargoReferente, telefonoReferente: telefonoReferente}
        }else{
          const{ tipo_cliente, nombreCliente, referente, correoReferente, cargoReferente, telefonoReferente} = this.state;
          var datosEnviar = {ID: ID, tipo_cliente : tipo_cliente, nombreCliente: nombreCliente, referente: referente, correoReferente: correoReferente, cargoReferente: cargoReferente, telefonoReferente: telefonoReferente}
        }
        console.log(datosEnviar);
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editClientes.php?editarCliente",{
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

      // Permite alternar la visibilidad del formulario de actualización de datos
      SwitchToggleFormEdit = () => {
        this.setState({ toggle_formEdit: false });
      };

      // Función para "eliminar", solamente deshabilita su visibilidad en los registros y puede ser rehabilitada en la página Administrador
      deleteData = (ID) =>{
        console.log(ID);
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateClientes.php?updateStateClientes="+ID)
         .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            this.loadData();
          })
          .catch(console.log());
     }

    render() { 
        // Definición de constantes referenciando a this.state
        const {loadedData, clientes, paginador, toggle_formClientes} = this.state;
        const {tipo_cliente,nombreCliente,referente,correoReferente,cargoReferente, telefonoReferente} = this.state
        const toggle_formEdit = this.state.toggle_formEdit
        const clientesEdit = this.state.clientesEdit
        if(!loadedData){
            return(
                <div>
                    <h1>Loading..</h1>
                </div>
            )
        }
        return ( 
            <div className="container-fluid">
                <Header />
              <h1 id="subtitulo_pagina">Listado de clientes</h1>
                {/* LISTADO DE CLIENTES */}
               <div>
               <button id="btn_registrarCliente" onClick={this.SwitchToggleClientes}>Registrar cliente</button>
                <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th>ID</th>
                            <th>Tipo de cliente</th>
                            <th>Nombre del cliente</th>
                            <th>Referente</th>
                            <th>Correo</th>
                            <th>Cargo</th>
                            <th>Teléfono</th>
                        </tr>
                        </thead>
                        <tbody>                                                
                            {clientes.map((cliente) => (
                             <tr key={cliente.ID}>
                                                <td>{cliente.ID}</td>
                                                <td>{cliente.tipo_cliente}</td>
                                                <td>{cliente.nombreCliente}</td>
                                                <td>{cliente.referente}</td>
                                                <td>{cliente.correoReferente}</td>
                                                <td>{cliente.cargoReferente}</td>
                                                <td>{cliente.telefonoReferente}</td>
                                                <td>
                                                <button onClick={() => this.loadDataEdit(cliente.ID)} title="Editar cliente"id="btn_edit_cuenta"><BsPencilSquare /></button>
                                                <button title="Examinar cliente"id="btn_edit_cuenta"><BiShowAlt /></button>
                                                    <button
                                                    id="btn_delete"
                                                    title="Eliminar cliente"
                                                    onClick={() => this.deleteData(cliente.ID)}
                                                    >
                                                    <BsTrash />
                                                    </button>
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
                </div> 
                {/* FORM REGISTRAR CLIENTE */}
                <div id="form_registrarClientes" className={ toggle_formClientes ? "active" : "form_registrarClientes" }>
                    <div onClick={this.SwitchToggleClientes} className="btn_close"><BsX /></div>
                    <h3>Registro de clientes</h3>
                <form id="form_agregarCliente" onSubmit={this.sendData}>
                        <input type="hidden" id="input_Usuario" />
                        <div>
                        <label htmlFor="input_tipo_cliente">Tipo de cliente: </label>
                        <select
                            name="tipo_cliente"
                            value={tipo_cliente}
                            onChange={this.cambioValor}
                            id="input_tipo_cliente">
                            <option value="interno">Interno</option>
                            <option value="externo">Externo</option>
                        </select>
                        </div>
                        <div>
                        <label htmlFor="input_nombreCliente">Nombre del cliente: </label>
                        <input
                            type="text"
                            value={nombreCliente}
                            name="nombreCliente"
                            onChange={this.cambioValor}
                            id="input_nombreCliente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_referente">Referente: </label>
                        <input
                            type="text"
                            name="referente"
                            onChange={this.cambioValor}
                            value={referente}
                            id="input_referente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_correoReferente">Correo del referente: </label>
                        <input
                            type="text"
                            value={correoReferente}
                            name="correoReferente"
                            onChange={this.cambioValor}
                            id="input_correoReferente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_cargoReferente">Cargo del referente:</label>
                        <input
                            type="text"
                            value={cargoReferente}
                            name="cargoReferente"
                            onChange={this.cambioValor}
                            id="input_cargoReferete"                            
                        />
                        </div>
                        <div>
                        <label htmlFor="input_telefonoReferente">Télefono del referente: </label>
                        <input
                            type="text"
                            name="telefonoReferente"
                            value={telefonoReferente}
                            onChange={this.cambioValor}
                            id="input_telefonoReferente"                            
                        />
                        </div>
                        <div>
                        <input type="submit" id="btn_registrar" value="Registrar" />
                        </div>
                </form>
                </div>
                            
              {/* FORM ACTUALIZAR CLIENTE */}
                <div id="form_registrarClientes" className={toggle_formEdit ? "active" : "form_registrarClientes"}>
            <div className="btn_close" onClick={this.SwitchToggleFormEdit}>&times;</div>
                    <h3>Actualización de clientes</h3>
                <form id="form_agregarCliente" onSubmit={this.sendDataClientesEdit}>

                        <div>
                        <label htmlFor="input_tipo_cliente">Tipo de cliente: </label>
                        <select
                            name="tipo_cliente"
                            value={clientesEdit.tipo_cliente}
                            onChange={this.cambioValor}
                            id="input_tipo_cliente">
                            <option value="interno">Interno</option>
                            <option value="externo">Externo</option>
                        </select>
                        </div>
                        <div>
                        <label htmlFor="input_nombreCliente">Nombre del cliente: </label>
                        <input
                            type="text"
                            value={clientesEdit.nombreCliente}
                            name="nombreCliente"
                            onChange={this.cambioValor}
                            id="input_nombreCliente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_referente">Referente: </label>
                        <input
                            type="text"
                            name="referente"
                            onChange={this.cambioValor}
                            value={clientesEdit.referente}
                            id="input_referente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_correoReferente">Correo del referente: </label>
                        <input
                            type="text"
                            value={clientesEdit.correoReferente}
                            name="correoReferente"
                            onChange={this.cambioValor}
                            id="input_correoReferente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_cargoReferente">Cargo del referente:</label>
                        <input
                            type="text"
                            value={clientesEdit.cargoReferente}
                            name="cargoReferente"
                            onChange={this.cambioValor}
                            id="input_cargoReferente"                            
                        />
                        </div>
                        <div>
                        <label htmlFor="input_telefonoReferente">Teléfono del referente: </label>
                        <input
                            type="text"
                            name="telefonoReferente"
                            value={clientesEdit.telefonoReferente}
                            onChange={this.cambioValor}
                            id="input_telefonoReferente"                            
                        />
                        </div>
                        <div>
                        <input type="submit" id="btn_registrar" value="Actualizar" />
                        </div>
                </form>
                </div>
            </div>
        );
    }
}
 
export default ListadoClientes;