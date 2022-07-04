import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Forms.css'

class EditarRamos extends Component {
    state = { loaderData: false, ramos : [],
    ID : "",
    codigoCuenta : "",
    codigoRamo : "",
    area: "",
    hh_academicas: "",
    pre_requisito: "",
    nombreCurso: "",
    relator: "" } 

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
        const{codigoCuenta, codigoRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;

        var datosEnviar = {ID: ID, codigoCuenta: codigoCuenta, codigoRamo: codigoRamo, 
        nombreCurso:nombreCurso, area:area, hh_academicas:hh_academicas, pre_requisito: pre_requisito, relator: relator}
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editRamo.php?editarRamo",{
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
                <label htmlFor="input_idCuenta">ID de la Cuenta: </label>
                <select name="codigoCuenta" onChange={this.cambioValor} value={ramos.codigoCuenta} id="input_idCuenta">
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
                    value={ramos.codigoRamo}
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
                    value={ramos.area}
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
                    value={ramos.nombreCurso}
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
                <label htmlFor="input_preRequisito">Pre-Requisito: </label>
                <input
                    type="text"
                    name="pre_requisito"
                    id="input_preRequisito"
                    placeholder="Ejemplo: JAV-SEL"
                    onChange={this.cambioValor}
                    value={ramos.pre_requisito}
                />
                </div>
                <div>
                <label htmlFor="input_relator">Relator: </label>
                <input type="text" name="relator" id="input_relator"
                onChange={this.cambioValor}
                value={ramos.relator}
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