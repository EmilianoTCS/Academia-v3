import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Forms.css'

class EditarCursos extends Component {
    state = { loaderData: false, cursos : [],
    ID : "",
    idCuenta : "",
    idRamo : "",
    fechaFin: "",
    fechaInicio: "",
    horaInicio: "",
    horaFin: "" } 

    loadData() {
        const ID = this.props.match.params.ID
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectCuentas.php?ID="+ID
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, cursos: dataResponse[0] });   
          })
          .catch(console.log());
      }

      sendDataCurso = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const ID = this.props.match.params.ID
        const{idCuenta, idRamo,fechaInicio, fechaFin, horaInicio, horaFin} = this.state;
        var datosEnviar = {ID:ID ,idCuenta: idCuenta, idRamo: idRamo, fechaInicio:fechaInicio, fechaFin:fechaFin, horaInicio: horaInicio, horaFin: horaFin}
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editCurso.php?editarCurso",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            console.log(datosEnviar);
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
        const {loadedData, cursos} = this.state;
        if(!loadedData){
            return(
            <h1>Loading...</h1>
            );
        }
        return (
        <div>
            <Header/>
            <div id="form_registrarCurso" className={"active"}>          
            <h3>Actualización de cursos</h3>
            <form id="form_agregarCurso" onSubmit={this.sendDataCurso}>
              <input type="hidden" name="ID" id="ID" value={cursos.ID} />
              <div>
                <label htmlFor="input_idCuenta_Curso">ID de la Cuenta: </label>
                <select name="idCuenta" onChange={this.cambioValor} value={cursos.idCuenta} id="input_idCuenta_Curso">
                  <option value="fondo_esperanza">Fondo Esperanza</option>
                  <option value="Transbank">Transbank</option>
                  <option value="BCI">BCI</option>
                  <option value="BCI_agil">BCI Ágil</option>
                  <option value="BCI_tecnico">BCI Técnico</option>
                </select>
              </div>
              <div>
                <label htmlFor="input_idRamo_Curso">ID del Ramo: </label>
                <select name="idRamo"onChange={this.cambioValor} value={cursos.idRamo} id="input_idRamo_Curso">
                  <option>ADM</option>
                  <option>APP</option>
                  <option>BDD</option>
                  <option>DEV</option>
                  <option>JAV</option>
                  <option>JEN</option>
                  <option>JIR</option>
                  <option>LIN</option>
                  <option>PER</option>
                  <option>POS</option>
                  <option>SEE</option>
                  <option>SEL</option>
                  <option>TDD</option>
                  <option>VER</option>
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
                  value={cursos.fechaInicio}
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
                  value={cursos.fechaFin}

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
                  value={cursos.horaInicio}

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
                  value={cursos.horaFin}

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
        </div>);
    }
}
 
export default EditarCursos;