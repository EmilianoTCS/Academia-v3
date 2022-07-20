import React, { Component } from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";
import { Link } from "react-router-dom";
import { BiShowAlt } from "react-icons/bi";

import '../css/Tables.css';
class ListadoClientes extends Component {
    state = { loadedData: false, clientes: [], paginador: [],
        num_boton: "", tipo_cliente: "", nombreCliente: "", referente: "", correoReferente: "", cargoReferente: "", telefonoReferente: "", isActive: true, toggle_formClientes: false }
    
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
      componentDidMount() {
        this.loadData();
        this.loadPaginador();
      }

      SwitchToggleClientes = () => {
        this.setState({
          toggle_formClientes: !this.state.toggle_formClientes,
        });
      };
    
      cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
      };
    
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


    render() { 
        const {loadedData, clientes, paginador, toggle_formClientes} = this.state;
        const {tipo_cliente,nombreCliente,referente,correoReferente,cargoReferente, telefonoReferente} = this.state
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
                                                <button title="Editar cliente"id="btn_edit_cuenta"><Link style={{color: "black"}}to={"/EditarClientes/"+cliente.ID}><BsPencilSquare /></Link></button>
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
                <div id="form_registrarClientes" className={ toggle_formClientes ? "active" : "form_registrarClientes" }>
                    <div onClick={this.SwitchToggleClientes} className="btn_close"><BsX /></div>
                    <h3>Registro de Clientes</h3>

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
            </div>
        );
    }
}
 
export default ListadoClientes;