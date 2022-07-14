import React, { Component } from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";
import { Link } from "react-router-dom";
class Colaboradores extends Component {
  state = {
    loadedData: false,
    colaboradores: [],
    paginador: [],
    num_boton: "",
    toggle_formColaboradores: false,
    codigoCuenta: "",
    nombre_completo: "",
    usuario: "",
    area: "",
    subgerencia: "",
    correo: "",
  };

  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listColaboradores.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, colaboradores: dataResponse });
      })
      .catch(console.log());
  }
  
  loadPaginador() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Colaboradores.php"
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
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listColaboradores.php?pagina",
      {
        method: "POST",
        body: JSON.stringify(sendNum),
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        console.log(this.state.num_boton);
        this.setState({ colaboradores: dataResponse });
      })
      .catch(console.log());
  };
  componentDidMount() {
    this.loadData();
    this.loadPaginador();
  }

  SwitchToggleColaboradores = () => {
    this.setState({
      toggle_formColaboradores: !this.state.toggle_formColaboradores,
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
    const { codigoCuenta, nombre_completo, usuario, area, subgerencia, correo } = this.state;

    var datosEnviar = {codigoCuenta: codigoCuenta, nombre_completo: nombre_completo, 
    usuario:usuario, area:area, subgerencia: subgerencia, correo: correo}
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarColaborador.php?insertarColaborador",{
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

  deleteData = (ID) =>{
    console.log(ID);
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-deleteColaborador.php?delete="+ID)
     .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();
      })
      .catch(console.log());
 }
  render() {
    const { loadedData, colaboradores, paginador } = this.state;
    const toggle_formColaboradores = this.state.toggle_formColaboradores;
    const { codigoCuenta, nombre_completo, usuario, area, subgerencia, correo } =
      this.state;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
    return (
      <div>
        <Header />
        <div id="container_tabla">
          <div id="btn_container">
            <button id="btn_registrar" onClick={this.SwitchToggleColaboradores}>
              Registrar colaborador
            </button>
            <input type="text" id="search_cuenta" placeholder="Buscador" />
          </div>
          <table id="tabla_cuenta">
            <thead id="list_theadCuentas">
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>usuario</th>
                <th>Área</th>
                <th>codigoCuenta</th>
                <th>Subgerencia</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody id="list_tbodyCuentas">
              {colaboradores.map((colaborador) => (
                <tr key={colaborador.ID}>
                  <td>{colaborador.ID}</td>
                  <td>{colaborador.nombre_completo}</td>
                  <td><Link style={{paddingLeft: 13, textDecoration: 'none'}} to={"/InfoColaboradores/"+colaborador.usuario}>{colaborador.usuario}</Link></td>
                  <td>{colaborador.area}</td>
                  <td>{colaborador.codigoCuenta}</td>
                  <td>{colaborador.subgerencia}</td>
                  <td>{colaborador.correo}</td>
                  <td>
                    <button
                      id="btn_delete"
                      onClick={() => this.deleteData(colaborador.ID)}
                    >
                      <BsTrash />
                    </button>
                    <button id="btn_edit_cuenta"><Link to={"/EditarColaboradores/"+colaborador.ID}><BsPencilSquare /></Link></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </div>
        <div
          id="form_registrarColaborador"
          className={
            toggle_formColaboradores ? "active" : "form_registrarColaborador"
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
      </div>
    );
  }
}

export default Colaboradores;
