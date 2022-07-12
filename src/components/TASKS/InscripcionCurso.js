import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Forms.css';
class InscripcionCurso extends Component {
    state = {  
        idCuenta : "",
        usuario: "",
        idCurso: "",
        porcentaje_aprobacion: "",
        codigoCuenta: "",
        codigoCurso: "",
        styles: "",
        success: false,
        error: false

    } 

    cambioValor = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
      };
    
      sendData = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const {idCuenta,usuario,idCurso,porcentaje_aprobacion,codigoCuenta, codigoCurso} = this.state
    
        var datosEnviar = {idCuenta: idCuenta, usuario: usuario, idCurso:idCurso, porcentaje_aprobacion:porcentaje_aprobacion, codigoCuenta: codigoCuenta, codigoCurso: codigoCurso}
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-inscripcionCurso.php?inscripcionCurso",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            if(dataResponse.queryAprobacion === true){
                this.setState({
                    success: !this.state.success
                });
            }else{
                this.setState({
                    error: !this.state.error
                });
            }
    
          })
          .catch(console.log());
      }

      SwitchToggleError = () => {
        this.setState({
            error: !this.state.error
        });
      };
      SwitchToggleSuccess = () => {
        this.setState({
            success: !this.state.success
        });
      };


    render() { 
        const error = this.state.error;
        const success = this.state.success
        const styles_error = {transition: "transition: all 300ms ease",display: "block",borderRadius: "5px", width: "100%", color: "#970101", fontWeight: "700",backgroundColor: "#FFD3D3", border: "1px solid #970101", padding: "20px"}
        const styles_btnClose_error = {backgroundColor: "#F5A0A0", float:"right",border: "solid 1px #970101",borderRadius: "100%",padding: "0 7px 0 7px", fontWeight: "700", color: "white"}
        
        
        const styles_success = {transition: "transition: all 300ms ease",display: "block", borderRadius: "5px", width: "100%", color: "#316C2B ", fontWeight: "700",backgroundColor: "#D4FFD0", border: "1px solid #316C2B", padding: "20px"}
        const styles_btnClose_success = {backgroundColor: "#A7EDA0" , float:"right",border: "solid 1px #316C2B",borderRadius: "100%",padding: "0 7px 0 7px", fontWeight: "700", color: "#316C2B"}
        
        
        return (
            <div>
            <Header/>
            <div id="form_container" className="card">

            <div style= {error ?  styles_error : {display: "none"} } id="error" role="alert">
            No cumples las condiciones para inscribirte en este curso.
            <button style={styles_btnClose_error} onClick={this.SwitchToggleError}>X</button>
            </div>

            <div style={success ? styles_success : {display: "none"} }role="alert" id="success">
            Inscripción Exitosa.
            <button style={styles_btnClose_success} onClick={this.SwitchToggleSuccess}>X</button>

            </div>
                <div className="card-header">
                <h4>Inscripción de cursos</h4>
                </div>
                    <div>
                        <form onSubmit={this.sendData}>
                            <div className="form-group">
                                <br></br>
                                <label htmlFor="input_idCuenta_Colaborador">Seleccione su cuenta</label>
                                <select className="form-control" name="idCuenta" onChange={this.cambioValor} id="input_idCuenta_Colaborador">
                                    <option>Elige una opción</option>
                                    <option value={"4"}>Fondo Esperanza</option>
                                    <option value={"1"}>BCI</option>
                                    <option value={"2"}>BCI Ágil</option>
                                    <option value={"3"}>BCI Técnico</option>
                                    <option value={"5"}>Transbank</option>

                                </select>
                                <br />

                                <label htmlFor="input_idUsuario">Escriba su usuario</label>
                                <input type="text"
                                className="form-control" name="usuario" onChange={this.cambioValor} id="usuario" aria-describedby="helpId" placeholder=""/>

                                <br />

                                <label htmlFor="input_areaColaborador">Curso al que desea inscribirse:</label>
                                <select className="form-control" name="idCurso" onChange={this.cambioValor} id="idCurso">
                                    <option>Elige una opción</option>
                                    <option value={"2"}>Admin Jenkins</option>
                                    <option value={"4"}>Appium Android</option>
                                    <option value={"5"}>BDD / Gherkin</option>
                                    <option value={"6"}>DevOps - Vanguardia</option>
                                    <option value={"7"}>Java</option>
                                    <option value={"8"}>Int Jenkins</option>
                                    <option value={"9"}>Jira</option>
                                    <option value={"10"}>Linux Cloud</option>
                                    <option value={"11"}>Performance Jmeter</option>
                                    <option value={"12"}>Postman</option>
                                    <option value={"0"}>Selenium - Especialistas</option>
                                    <option value={"13"}>Selenium</option>
                                    <option value={"14"}>Test Driven D</option>
                                    <option value={"15"}>Versionamiento</option>
                                    <option>Transbank</option>
                                    <option>Bantotal</option>
                                </select>

                                <br />
                                <input type="hidden" value="0" className="form-control" name="porcentaje_aprobacion" id="porcentaje_aprobacion"/>                                
                                <input type="hidden" value="" className="form-control" name="codigoCurso" id="codigoCurso"/>
                                <input type="hidden" value="" className="form-control" name="codigoCuenta" id="codigoCuenta"/>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
              </div>
    </div>);
    }
}
 
export default InscripcionCurso;