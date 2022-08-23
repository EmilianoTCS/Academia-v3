import React, { Component } from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import { BiShowAlt } from "react-icons/bi";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "../css/Forms.css";
import { Link } from "react-router-dom";

class Colaboradores extends Component {
    state = {
    loadedData: false,
    colaboradores: [],
    paginador: [],
    num_boton: "",
    toggle_formColaboradores: false,
    toggle_formEdit: false,
    codigoCuenta: "",
    nombre_completo: "",
    usuario: "",
    area: "",
    subgerencia: "",
    correo: "",
    colaboradoresEdit: [],
    changed: false
    };
    // Recolecta los datos del registro de clientes
    loadData() {
    fetch(
      "http://20.168.67.13/TASKS/coe-listColaboradores.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, colaboradores: dataResponse });
      })
      .catch(console.log());
    }
    // Recolecta los datos del paginador
    loadPaginador() {
    fetch(
      "http://20.168.67.13/paginador/botones_Colaboradores.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ paginador: dataResponse });
      })
      .catch(console.log());
    }
    // Envía el número seleccionado del paginador a la sentencia SQL para poder cambiar de página
    sendNum = (e) => {
    e.preventDefault();
    console.log("Sending data..");
    const num_boton = e.target.value;
    this.setState({ num_boton: num_boton });
    var sendNum = { num_boton: num_boton };

    fetch(
      "http://20.168.67.13/TASKS/coe-listColaboradores.php?pagina",
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
    // Realiza la carga automática de funciones en el instante que se ingresó a la pantalla
    componentDidMount() {
    this.loadData();
    this.loadPaginador();
    };
    // Permite alternar la visibilidad del formulario de creación de datos
    SwitchToggleColaboradores = () => {
    this.setState({
      toggle_formColaboradores: !this.state.toggle_formColaboradores,
    });
    };
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
      "http://20.168.67.13/TASKS/coe-insertarColaborador.php?insertarColaborador",{
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
    // Muestra un mensaje de confirmación para eliminar
    alertDelete = (ID) => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: "¿Deseas eliminar este colaborador?",
      text: "Puedes volver a habilitarlo en la página Administrador",
      icon: 'warning',
      iconColor: "#e10b1c",
      dangerMode: true,
      showConfirmButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonColor: "dark-gray",
      cancelButtonText: "Cancelar"
    })
    .then(response => {
      if(response.isConfirmed){
        MySwal.fire({
          title: "Se ha eliminado el registro",
          icon: "success",
          position: "top-right",
          timer: 2500,
          toast: true,
          showConfirmButton: false,
        })
        this.deleteData(ID);
      }
    })
    };
    // Función para "eliminar", solamente deshabilita su visibilidad en los registros y puede ser rehabilitada en la página Administrador
    deleteData = (ID) =>{
    console.log(ID);
    fetch(
      "http://20.168.67.13/TASKS/coe-deleteColaborador.php?delete="+ID)
     .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();
      })
      .catch(console.log());
    };
    // Permite alternar la visibilidad del formulario de actualización de datos
    SwitchToggleFormEdit = () => {
this.setState({ toggle_formEdit: false });
    };
    // Muestra un mensaje de confirmación para editar
    alertEdit = (e) => {
      e.preventDefault();
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: "¿Guardar cambios?",
      icon: 'info',
      iconColor: "#427eff",
      dangerMode: true,
      showConfirmButton: true,
      confirmButtonText: "Guardar",
      confirmButtonColor: "#427eff",
      showCancelButton: true,
      cancelButtonColor: "dark-gray",
      cancelButtonText: "Cancelar"
    })
    .then(response => {
      if(response.isConfirmed){
        this.sendDataColaboradoresEdit(e);
      }
    })

    };
    // Recolecta los datos de un registro en específico utilizando el ID como referencia
    loadDataEdit(ID) {
  fetch(
  "http://20.168.67.13/TASKS/coe-selectColaborador.php?ID="+ID )
   .then((response) => response.json())
   .then((dataResponse) => {
    this.setState({ loadedData: true, colaboradoresEdit: dataResponse[0]});
    this.setState({toggle_formEdit : true})
    })
    .catch(console.log());
    };
    // Envía los datos del formulario de actualización a la sentencia SQL
    sendDataColaboradoresEdit = (e) =>{
      e.preventDefault();
      const ID = this.state.colaboradoresEdit.ID;
 
      const{ nombre_completo, usuario, area, codigoCuenta, subgerencia, correo} = this.state.colaboradoresEdit;
      var datosEnviar = {ID: ID, nombre_completo : nombre_completo, usuario: usuario, area: area, codigoCuenta: codigoCuenta, subgerencia: subgerencia, correo: correo}

      console.log(datosEnviar);
      fetch(
      "http://20.168.67.13/TASKS/coe-editColaborador.php?editarColaborador",{
      method: "POST",
      body: JSON.stringify(datosEnviar)
      })
      .then((response) => response.json())
      .then((dataResponse) => {
      this.setState({loadedData : true})
      this.setState({changed : false})
      this.loadData();
      const MySwal = withReactContent(Swal);
            if(dataResponse === "success"){
              MySwal.fire({
                title: "Se ha actualizado el registro",
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
    const { loadedData, colaboradores, paginador } = this.state;
    const toggle_formColaboradores = this.state.toggle_formColaboradores;
    const { codigoCuenta, nombre_completo, usuario, area, subgerencia, correo } = this.state;
    const toggle_formEdit = this.state.toggle_formEdit
    const colaboradoresEdit = this.state.colaboradoresEdit

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
    return (
      <div className="container-fluid">
        <Header />
        <h1 id="subtitulo_pagina">Listado de colaboradores</h1>
        {/* LISTADO DE COLABORADORES */}
        <div>
          <button id="btn_registrarCliente" onClick={this.SwitchToggleColaboradores}>Registrar colaborador</button>
           <table style={{whiteSpace: "nowrap"}}id="tablaClientes" className="table table-striped table-inverse table-responsive">
            <thead className="thead-inverse">
              <tr>
                <th>ID</th>
                <th>Nombre Completo</th>
                <th>Usuario</th>
                <th>Área</th>
                <th>CodigoCuenta</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              {colaboradores.map((colaborador) => (
                <tr key={colaborador.ID}>
                  <td>{colaborador.ID}</td>
                  <td>{colaborador.nombre_completo}</td>
                  <td>{colaborador.usuario}</td>
                  <td>{colaborador.area}</td>
                  <td>{colaborador.codigoCuenta}</td>
                  <td>{colaborador.correo}</td>
                  <td>
                  <button onClick={() => this.loadDataEdit(colaborador.ID)} title="Editar colaborador" id="btn_edit_cuenta"><BsPencilSquare /></button>
                  <button title="Examinar colaborador"id="btn_edit_cuenta"><Link style={{textDecoration: 'none', color: "black"}} to={"/InfoColaboradores/"+colaborador.usuario}><BiShowAlt /></Link></button>
                    <button
                    title="Eliminar colaborador"
                      id="btn_delete"
                      onClick={() => this.alertDelete(colaborador.ID)}
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
        {/* FORMULARIO DE CREACIÓN DE COLABORADORES */}
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
        {/* FORMULARIO EDICIÓN DE COLABORADORES */}
        <div id="form_registrarColaborador" className={ toggle_formEdit ? "active" : "form_registrarColaborador"}>
          <div onClick={this.SwitchToggleFormEdit} className="btn_close"> <BsX /></div>
          <h3>Actualización de colaboradores</h3>
          <form id="form_agregarColaborador" onSubmit={this.sendDataColaboradoresEdit}>
            <input type="hidden" id="input_Usuario" />
            <div>
              <label htmlFor="input_idCuenta_Colaborador"> ID de la Cuenta:</label>
              <select name="codigoCuenta" value={colaboradoresEdit.codigoCuenta} onChange={this.cambioValor} id="input_idCuenta_Colaborador" >
                <option value="fondo_esperanza">Fondo Esperanza</option>
                <option value="Transbank">Transbank</option>
                <option value="BCI">BCI</option>
                <option value="BCI_agil">BCI Ágil</option>
                <option value="BCI_tecnico">BCI Técnico</option>
              </select>
            </div>
            <div>
              <label htmlFor="input_nombreCompleto">Nombre Completo: </label>
              <input type="text" value={colaboradoresEdit.nombre_completo} name="nombre_completo" onChange={this.cambioValor} id="input_nombreCompleto" />
            </div>
            <div id="container_idUsuario">
              <label htmlFor="input_idUsuario">ID del Usuario: </label>
              <input
                type="text"
                name="usuario"
                onChange={this.cambioValor}
                value={colaboradoresEdit.usuario}
                id="input_idUsuario"
                placeholder="Primer letra + Apellido"
              />
            </div>
            <div>
              <label htmlFor="input_areaColaborador">Área: </label>
              <input
                type="text"
                value={colaboradoresEdit.area}
                name="area"
                onChange={this.cambioValor}
                id="input_areaColaborador"
                placeholder="Seguridad"
              />
            </div>
            <div>
              <label htmlFor="input_correoColaborador">Correo: </label>
              <input
                type="text"
                name="correo"
                value={colaboradoresEdit.correo}
                onChange={this.cambioValor}
                id="input_correoColaborador"
                placeholder="usuario@DOMINIO.COM"
              />
            </div>
            <div>
              <input type="submit" id="btn_registrar" value="Actualizar" />
            </div>
          </form>
        </div>

      </div>
    );
  }
}

export default Colaboradores;
