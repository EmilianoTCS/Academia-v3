import React, { Component } from "react";
import Header from "../templates/header";

class EditarColaboradores extends Component {
  state = {loadedData: false, colaboradores: [],
    ID:"",
    usuario: "",
    codigoCuenta: "",
    nombre_completo: "",
    area: "",
    subgerencia: "",
    correo: ""};

  

  loadData() {
    const ID = this.props.match.params.ID
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectColaborador.php?ID="+ID
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, colaboradores: dataResponse[0] });   
      })
      .catch(console.log());
  }

  sendData = (e) =>{
    const ID = this.props.match.params.ID
    e.preventDefault();
    console.log("Sending data..");
    const{codigoCuenta, usuario, nombre_completo, area, subgerencia, correo} = this.state;

    var datosEnviar = {ID: ID, codigoCuenta: codigoCuenta, usuario: usuario, 
        nombre_completo:nombre_completo, area:area, subgerencia:subgerencia, correo: correo}
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-editColaborador.php?editarColaborador",{
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
    this.setState({colaboradores: state});
  }


  render() {
    const {loadedData, colaboradores} = this.state;
        if(!loadedData){
            return(
            <h1>Loading...</h1>
            );
        }
    return (
      <div>
        <Header/>
        <div
          id="form_registrarColaborador"
          className="active"
        >
          <h3>Registro de Colaboradores</h3>
          <form id="form_agregarColaborador" onSubmit={this.sendData}>
            <input type="hidden" id="input_Usuario" value={colaboradores.ID} />
            <div>
              <label htmlFor="input_idCuenta_Colaborador">
                ID de la Cuenta:{" "}
              </label>
              <select
                name="codigoCuenta"
                value={colaboradores.codigoCuenta}
                onChange={this.cambioValor}
                id="input_idCuenta_Colaborador"
                >
                <option value="fondo_esperanza">Fondo Esperanza</option>
                <option value="Transbank">Transbank</option>
                <option value="BCI">BCI</option>
                <option value="BCI_agil">BCI Ágil</option>
                <option value="BCI_tecnico">BCI Técnico</option>
              </select>
            </div>
            <div>
              <label htmlFor="input_nombreCompleto">Nombre Completo: </label>
              <input
                type="text"
                value={colaboradores.nombre_completo}
                name="nombre_completo"
                onChange={this.cambioValor}
                id="input_nombreCompleto"
              />
            </div>
            <div>
              <i id="icon_info" className="bi bi-info-circle-fill">
                <div id="triangulo_der"></div>
                <div id="container_info">
                  <span className="info_idColaborador">
                    Tip: El ID está conformado por la primera letra del nombre
                    seguido por su apellido.
                  </span>
                </div>
              </i>
            </div>
            <div id="container_idUsuario">
              <label htmlFor="input_idUsuario">ID del Usuario: </label>
              <input
                type="text"
                name="usuario"
                onChange={this.cambioValor}
                value={colaboradores.usuario}
                id="input_idUsuario"
                placeholder="Primer letra + Apellido"
              />
            </div>
            <div>
              <label htmlFor="input_areaColaborador">Área: </label>
              <input
                type="text"
                value={colaboradores.area}
                name="area"
                onChange={this.cambioValor}
                id="input_areaColaborador"
                placeholder="Seguridad"
              />
            </div>
            <div>
              <label htmlFor="input_subgerenciaColaborador">
                Subgerencia:{" "}
              </label>
              <input
                type="text"
                value={colaboradores.subgerencia}
                name="subgerencia"
                onChange={this.cambioValor}
                id="input_subgerenciaColaborador"
                placeholder="Infraestructura y producción TI"
              />
            </div>
            <div>
              <i id="icon_info" className="bi bi-info-circle-fill">
                <div id="triangulo_der"></div>
                <div id="container_info">
                  <span className="info_idColaborador">
                    Tip: El correo está formado por el usuario + @dominio.
                  </span>
                </div>
              </i>
              <label htmlFor="input_correoColaborador">Correo: </label>
              <input
                type="text"
                name="correo"
                value={colaboradores.correo}
                onChange={this.cambioValor}
                id="input_correoColaborador"
                placeholder="usuario@DOMINIO.COM"
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

export default EditarColaboradores;
