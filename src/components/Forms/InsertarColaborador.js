import React, { Component } from 'react';
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import Swal from 'sweetalert2';
import { BsX } from "react-icons/bs";
import withReactContent from 'sweetalert2-react-content';
import "../css/Forms.css";
class InsertarColaborador extends Component {
    constructor(props) {
        super(props);
    }
    state = {
    codigoCuenta: "",
    nombre_completo: "",
    usuario: "",
    area: "",
    subgerencia: "",
    correo: ""
}

    // Se activa con la función OnChange cambiando el estado inicial de vacío por el ingresado en los inputs
    cambioValor = (e) => {
    const state = this.state;
    const stateEdit = this.state.colaboradoresEdit;
    stateEdit[e.target.name] = e.target.value;
    state[e.target.name] = e.target.value;
    this.setState({ state });
    this.setState({ colaboradoresEdit: stateEdit });
    };
    // Envía los datos del formulario de creación a la sentencia SQL
    sendData = (e) =>{
    e.preventDefault();
    console.log("Sending data..");
    const { codigoCuenta, nombre_completo, usuario, area, subgerencia, correo } = this.state;

    var datosEnviar = {codigoCuenta: codigoCuenta, nombre_completo: nombre_completo, 
    usuario:usuario, area:area, subgerencia: subgerencia, correo: correo}
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-insertarColaborador.php?insertarColaborador",{
        method: "POST",
        body: JSON.stringify(datosEnviar)
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();
        const MySwal = withReactContent(Swal);
        if(dataResponse === "success"){
          MySwal.fire({
            title: "Se ha creado el registro",
            icon: "success",
            position: "top-right",
            timer: 2500,
            toast: true,
            showConfirmButton: false,
          })
        }else{
          MySwal.fire({
            title: "Se ha producido un error",
            icon: "error",
            position: "top-right",
            timer: 2500,
            toast: true,
            showConfirmButton: false,
          })
        }
      })
      .catch(console.log());
    };
    render() { 
        const { codigoCuenta, nombre_completo, usuario, area, subgerencia, correo } = this.state;
        const isActive = this.props.isActive_formColaboradores;

        return ( 
            <div
          id="form_registrarColaborador"
          className={
            isActive ? "active" : "form_registrarColaborador"
          }
        >
          <div onClick={this.SwitchToggleColaboradores} className="btn_close">
            <BsX />
          </div>
          <h3>Registro de Colaboradores</h3>
          <form id="form_agregarColaborador" onSubmit={this.sendData}>
            <input type="hidden" id="input_Usuario" />
            <div>
              <label htmlFor="input_idCuenta_Colaborador">
                ID de la Cuenta:{" "}
              </label>
              <select
                name="codigoCuenta"
                value={codigoCuenta}
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
                value={nombre_completo}
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
                value={usuario}
                id="input_idUsuario"
                placeholder="Primer letra + Apellido"
              />
            </div>
            <div>
              <label htmlFor="input_areaColaborador">Área: </label>
              <input
                type="text"
                value={area}
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
                value={subgerencia}
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
                value={correo}
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
         );
    }
}
 
export default InsertarColaborador;
