import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Forms.css'

class EditarClientes extends Component {
    state = { loadedData: false, clientes : [],
    ID : "",
    tipo_cliente : "",
    nombreCliente : "",
    referente: "",
    correoReferente: "",
    cargoReferente: "",
    telefonoReferente: "" } 

    loadData() {
        const ID = this.props.match.params.ID
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectClientes.php?ID="+ID
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, clientes: dataResponse[0]});
            console.log(dataResponse[0]);
          })
          .catch(console.log());
      }


      sendData = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const {tipo_cliente,nombreCliente,referente,correoReferente,cargoReferente, telefonoReferente} = this.state
    
        var datosEnviar = {tipo_cliente: tipo_cliente, nombreCliente: nombreCliente, 
            referente:referente, correoReferente:correoReferente, cargoReferente: cargoReferente, telefonoReferente: telefonoReferente}
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editClientes.php?editarCliente",{
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


    componentDidMount(){
        this.loadData();
    }
    cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({cursos: state});
      }

    render() { 
        const {loadedData, clientes} = this.state;
        if(!loadedData){
            return(
            <h1>Loading...</h1>
            );
        }
        return (
        <div>
            <Header/>
            <div id="form_registrarClientes" className="active">
                    <h3>Actualización de Clientes</h3>
                <form id="form_agregarCliente" onSubmit={this.sendData}>
                        <input type="hidden" id="input_Usuario" />
                        <div>
                        <label htmlFor="input_tipo_cliente">Tipo de cliente: </label>
                        <select
                            name="tipo_cliente"
                            value={clientes.tipo_cliente}
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
                            value={clientes.nombreCliente}
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
                            value={clientes.referente}
                            id="input_referente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_correoReferente">Correo del referente: </label>
                        <input
                            type="text"
                            value={clientes.correoReferente}
                            name="correoReferente"
                            onChange={this.cambioValor}
                            id="input_correoReferente"
                        />
                        </div>
                        <div>
                        <label htmlFor="input_cargoReferente">Cargo del referente:</label>
                        <input
                            type="text"
                            value={clientes.cargoReferente}
                            name="cargoReferente"
                            onChange={this.cambioValor}
                            id="input_cargoReferente"                            
                        />
                        </div>
                        <div>
                        <label htmlFor="input_telefonoReferente">Télefono del referente: </label>
                        <input
                            type="text"
                            name="telefonoReferente"
                            value={clientes.telefonoReferente}
                            onChange={this.cambioValor}
                            id="input_telefonoReferente"                            
                        />
                        </div>
                        <div>
                        <input type="submit" id="btn_registrar" value="Registrar" />
                        </div>
                </form>
                </div>
        </div>);
    }
}
 
export default EditarClientes;