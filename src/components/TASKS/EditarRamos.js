import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Forms.css'

class EditarRamos extends Component {
    state = { loaderData: false, ramos : [],
    ID : "",
    codigoRamo : "",
    nombreRamo : "",
    hh_academicas: "",
    pre_requisito: "",
    nombreRelator: "",
    loadedData: false} 

    loadData() {
        const ID = this.props.match.params.ID
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectCursos.php?ID="+ID
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, ramos: dataResponse[0] });   
          })
          .catch(console.log());
      }
      sendDataRamo = (e) =>{
        const ID = this.props.match.params.ID
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


    componentDidMount(){
        this.loadData();
    }
    cambioValor = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ramos: state});
      }

    render() { 
        const {loadedData, ramos} = this.state;
        if(!loadedData){
            return(
            <h1>Loading...</h1>
            );
        }
        return (
        <div>
                <Header/>
                <div id="form_registrarRamo" className="active" >
            <h3>Actualización de ramos</h3>
            <form id="form_agregarRamo" onSubmit={this.sendDataRamo}>
                <div>
                <label htmlFor="input_idRamo">Codigo del Ramo: </label>
                <input
                    type="text"
                    name="codigoRamo"
                    id="input_codigoRamo"
                    placeholder="Ejemplo: JAV"
                    onChange={this.cambioValor}
                    value={ramos.codigoRamo}
                />
                </div>
                <div>
                <label htmlFor="input_nombreRamo">Nombre del ramo: </label>
                <input
                    type="text"
                    name="nombreRamo"
                    id="input_nombreRamo"
                    onChange={this.cambioValor}
                    value={ramos.nombreRamo}
                />
                </div>
                <div>
                <label htmlFor="input_hhAcademicas">Horas académicas: </label>
                <input
                    type="text"
                    name="hh_academicas"
                    id="input_hhAcademicas"
                    onChange={this.cambioValor}
                    value={ramos.hh_academicas}
                />
                </div>
                <div>
                <input type="submit" id="btn_sig" value="Siguiente" onClick={this.SwitchToggleCurso} />
                </div>
            </form>
            </div>
        </div>);
    }
}
 
export default EditarRamos;