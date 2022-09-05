import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Forms.css';
import Select from 'react-select';
import { SpinnerDotted } from 'spinners-react';
class InscripcionCurso extends Component {
    state = {  
        loadedData: false,
        idCuenta : "",
        usuario: [],
        idCurso: "",
        porcentaje_aprobacion: "0",
        codigoCuenta: "null",
        codigoCurso: "null",
    } 
    // Detecta cambios de los valores ingresados en el input
    cambioValor = (e) => {
        this.setState({
            warning: false
        }) 
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ state });
        this.test(this.state.usuario);
    };    
    // Envía el número seleccionado del paginador a la sentencia SQL para poder cambiar de página
    sendData = (e) =>{
       e.preventDefault();
        console.log("Sending data..");
        const {idCuenta,usuario,idCurso,porcentaje_aprobacion,codigoCuenta, codigoCurso} = this.state
        var datosEnviar = {idCuenta: idCuenta, usuario: usuario, idCurso:idCurso, porcentaje_aprobacion:porcentaje_aprobacion, codigoCuenta: codigoCuenta, codigoCurso: codigoCurso}
        fetch(
          "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-inscripcionCurso.php?inscripcionCurso",{
            method: "POST",
            body: JSON.stringify(datosEnviar)
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            if(dataResponse.queryAprobacion === true){
                this.setState({
                    success: !this.state.success,
                    warning: false
                });
            }else{
                this.setState({
                    error: !this.state.error,
                    warning: false
                });
            }
    
          })
          .catch(console.log());
      
    }
    //Recoleta SOLAMENTE LOS NOMBRES de los usuarios - Se utiliza para cargar información en los SELECT  
    loadListadoUsuarios(){
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/ListadoUsuarios.php?listadoUsuarios"
    )
    .then((response) => response.json())
    .then((dataResponse) => {
      this.setState({usuario : dataResponse, loadedData: true})
      
    })
    .catch(console.log())
    }

    componentDidMount(){
        this.loadListadoUsuarios();
    }

    render() { 
        const loadedData = this.state.loadedData
        const usuario= this.state.usuario.map((label => (
            {label: label.usuario,
             value: label.ID,
             name: "usuario"
            })))
        const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }

        if(!loadedData){
                return(
                  <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
                  );
            }
        return (
            <div className="container-fluid">
            <Header/>
            <div id="form_container" className="card">

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
                                <Select options={usuario} />

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
                                <input type="hidden" value="null" className="form-control" name="codigoCurso" id="codigoCurso"/>
                                <input type="hidden" value="null" className="form-control" name="codigoCuenta" id="codigoCuenta"/>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
              </div>
    </div>);
    }
}
 
export default InscripcionCurso;