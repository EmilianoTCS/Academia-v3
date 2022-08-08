import React, {Component} from "react";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import '../css/Tables.css'
import '../css/Botones.css'
import Header from "../templates/header";
import "../css/Forms.css";
import 'react-datepicker/dist/react-datepicker.css'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Select from 'react-select';


class ListadoRamos extends Component {
    state = { 
      loadedData: false, // Booleano que se activa cuando es recibida la carga de datos
      ramos: [], //Array donde serán almacenados los registros del JSON que vienen del backend
      paginador: [], //Recibe la cantidad de páginas totales desde el backend
      num_boton: "", //Es el botón seleccionado del paginador
      toggle_formRamo: false, //Booleano para la visibilidad del formulario crear ramo
      toggle_formEdit: false, //Booleano para la visibilidad del formulario editar ramo
      toggle_formCurso: false, //Booleano para la visibilidad del formulario editar curso

      //Strings vacíos donde se introducen los valores de los inputs a la hora de insertar registros{
      codigoCuenta : "", 
      codigoRamo : "",
      area: "",
      nombreCurso : "",
      hh_academicas: "",
      pre_requisito: "",
      relator: "",
      fechaFin: "",
      fechaInicio: "",
      horaInicio: "",
      horaFin: "", 
      //}
      ramosEdit : [], //Array donde serán almacenados los registros del JSON que vienen del backend
      //Strings vacíos donde se introducen los valores de los inputs a la hora de insertar registros{
      codigoRamoEdit : "",
      nombreRamoEdit : "",
      hh_academicasEdit : "",
      pre_requisitoEdit : "",
      nombreRelatorEdit: "",
      //}
      changed: false, //Booleano que valida la edición de los datos
      listadoRamos : [], //Se utiliza en el formulario de inserción de cursos
      listadoCuentas: [], //Se utiliza en el formulario de inserción de cursos
      listadoRelatores: [] //Se utiliza en el formulario de inserción de ramos
    }
      // Recoleta SOLAMENTE LOS NOMBRES de los ramos - Se utiliza para cargar información en los SELECT  
      loadListadoRamos(){
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/ListadoNombreRamos.php?listadoRamos"
        )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({listadoRamos : dataResponse})
        })
        .catch(console.log())
      }
      // Recoleta SOLAMENTE LOS NOMBRES de los relatores - Se utiliza para cargar información en los SELECT  
      loadListadoRelatores(){
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/ListadoRelatores.php?listadoRelatores"
        )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({listadoRelatores : dataResponse})
        })
        .catch(console.log())
      }
      // Recolecta SOLAMENTE LOS NOMBRES de las cuentas - Se utiliza para cargar información en los SELECT  
      loadListadoCuentas(){
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/auxiliar/ListadoCuentas.php?listadoCuentas"
        )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({listadoCuentas : dataResponse})
        })
        .catch(console.log())
      }
      // Recolecta los datos del registro de ramos
      loadData() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listCursos.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, ramos: dataResponse });
          })
          .catch(console.log());
      }
      // Recolecta los datos del paginador
      loadPaginador() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Cursos.php"
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
        // console.log("Sending data..");
        const num_boton = e.target.value;
        this.setState({num_boton : num_boton})
        var sendNum = {num_boton : num_boton}
    
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listCursos.php?pagina",
          {
            method: "POST",
            body: JSON.stringify(sendNum),
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            console.log(this.state.num_boton);
            this.setState({ ramos: dataResponse });
          })
          .catch(console.log());
      };
      // Envía los datos para insertar un nuevo ramo
      sendDataRamo = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const{codigoCuenta, codigoRamo, nombreCurso, area, hh_academicas, pre_requisito, relator} = this.state;
        var datosEnviar = {codigoCuenta: codigoCuenta, codigoRamo: codigoRamo, 
        nombreCurso:nombreCurso, area:area, hh_academicas:hh_academicas, pre_requisito: pre_requisito, relator: relator}
        console.log(datosEnviar);
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarRamo.php?insertarRamo",{
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
      }
      // Envía los datos para insertar un nuevo curso
      sendDataCurso = (e) =>{
        e.preventDefault();
        console.log("Sending data..");
        const{codigoCuenta, codigoRamo, fechaInicio, fechaFin, horaInicio, horaFin} = this.state;
        var datosEnviar = {codigoCuenta: codigoCuenta, codigoRamo: codigoRamo, fechaInicio:fechaInicio, fechaFin:fechaFin, horaInicio: horaInicio, horaFin: horaFin}
        console.log(datosEnviar);
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarCurso.php?insertarCurso",{
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
      }
      // Habilita o deshabilita la visibilidad del formulario para la inserción de cursos
      SwitchToggleCurso = () => {
        this.setState({ toggle_formCurso: !this.state.toggle_formCurso });
      // Habilita o deshabilita la visibilidad del formulario para la inserción de cursos
      };
      // Habilita o deshabilita la visibilidad del formulario para la inserción de ramos
      SwitchToggleRamo = () => {
        this.setState({ toggle_formRamo: !this.state.toggle_formRamo });
      };
      // Habilita o deshabilita la visibilidad del formulario para la edición de ramos
      SwitchToggleRamoEdit = () => {
        this.setState({ toggle_formEdit: false });
      };
      // Carga automáticamente las funciones al ingresar a la página
      componentDidMount() {
        this.loadData();
        this.loadPaginador();
        this.loadListadoRamos();
        this.loadListadoCuentas();
        this.loadListadoRelatores();
      }
      // Detecta cambios en el estado
      cambioValor = (e) =>{
        const state = this.state;
        const stateEdit = this.state.ramosEdit;
        state[e.target.name] = e.target.value;
        stateEdit[e.target.name] = e.target.value;
        this.setState({state});
        this.setState({ramosEdit: stateEdit});
      }
      // Detecta cambios en el estado de los Select
      cambioValorSelect= (e) =>{
        const state = this.state;
        state[e.name] = e.value
        this.setState({state});
      }
      // Muestra un mensaje de confirmación para eliminar
      alertDelete = (ID) => {
              const MySwal = withReactContent(Swal)
              MySwal.fire({
                title: "¿Deseas eliminar este ramo?",
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
      }
      // "Elimina" los datos seleccionados, pero pueden volver a habiltarse en la pantalla de Administrador
      deleteData = (ID) =>{
        console.log(ID);
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateRamos.php?updateStateRamos="+ID)
         .then((response) => response.json())
          .then((dataResponse) => {
            console.log(dataResponse);
            this.loadData();
          })
          .catch(console.log());
      }
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
                  this.sendDataRamoEdit(e);
                }
              })
      
      }
      // Carga los datos del curso a editar
      loadDataEdit(ID) {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectCursos.php?ID="+ID
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, ramosEdit: dataResponse[0] });  
            this.setState({toggle_formEdit: true});
          })
          .catch(console.log());
      }
      // Envía los datos del formulario edición
      sendDataRamoEdit = (e) =>{
      const ID = this.state.ramosEdit.ID
      e.preventDefault();

      const{codigoRamo, nombreRamo, hh_academicas} = this.state.ramosEdit;
      var datosEnviar = {ID: ID, codigoRamo: codigoRamo, nombreRamo:nombreRamo, hh_academicas:hh_academicas}
      console.log(datosEnviar
        );
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
      }


    render() { 
        const { loadedData, ramos, paginador } = this.state;
        const{ codigoRamo, nombreCurso, area, hh_academicas} = this.state;
        const toggle_formRamo = this.state.toggle_formRamo;
        const toggle_formEdit = this.state.toggle_formEdit;
        const toggle_formCurso = this.state.toggle_formCurso;
        const ramosEdit = this.state.ramosEdit;
        const listadoRelatores= this.state.listadoRelatores.map((label => (
          {label: label.nombre,
            value: label.nombre,
            name: "relator"
        })))
        const listadoPrerequisitos = this.state.listadoRamos.map((label => (
            {label: label.nombreRamo,
             value: label.codigoRamo,
             name: "pre_requisito"
        })))
        const listadoRamos = this.state.listadoRamos.map((label => (
          {label: label.nombreRamo,
           value: label.codigoRamo,
           name: "codigoRamo"
      })))
        const listadoCuentas = this.state.listadoCuentas.map((label => (
              {label: label.codigoCuenta,
               value: label.ID,
               name : "codigoCuenta"
        })))

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
        return (
            <div className="container-fluid">
             <Header></Header> 
            <h1 id="subtitulo_pagina">Listado de ramos</h1>
             <button id="btn_registrarCliente" onClick={this.SwitchToggleRamo}>Registrar ramo</button>
             <button id="btn_registrarCliente" style={{marginLeft : "1%"}} onClick={this.SwitchToggleCurso}>Registrar curso</button>

            {/* LISTADO DE RAMOS */}
             <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                    <tr>
                        <th>ID del ramo</th>
                        <th>Nombre del ramo</th>
                        <th>HH académicas</th>
                        <th>Pre-requisito</th>
                        <th>Relator</th>
                        <th>Área</th>
                        <th>Operaciones</th>
                     </tr>
                    </thead>
                        <tbody>
                        {ramos.map((ramo) => (
                                <tr key={ramo.ID}>
                                    <td>{ramo.codigoRamo}</td>
                                    <td>{ramo.nombreRamo}</td>
                                    <td>{ramo.hh_academicas}</td>
                                    <td>{ramo.pre_requisito}</td>
                                    <td>{ramo.nombre}</td>
                                    <td>{ramo.area}</td>
                                    <td>
                                    <button onClick={() => this.loadDataEdit(ramo.ID)} title="Editar ramo" id="btn_edit_cuenta"><BsPencilSquare /></button>
                                    <button title="Eliminar ramo" id="btn_delete" onClick={()=> this.alertDelete(ramo.ID)}><BsTrash/></button>
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

            {/* FORM REGISTRAR RAMOS */}
                <div id="form_registrarRamo" className={toggle_formRamo ? "active" : "form_registrarRamo"} >
          <div className="btn_close" onClick={this.SwitchToggleRamo}>
            <BsX />
          </div>
          <h3>Registro de ramos</h3>
          <form id="form_agregarRamo" onSubmit={this.sendDataRamo}>
            <div>
              <Select 
              options={listadoCuentas}
              placeholder="Elige una cuenta"
              onChange={this.cambioValorSelect}
              name="idCuenta"
              />
            </div>
            <div>
              <label htmlFor="input_idRamo">Código del Ramo: </label>
              <input
                type="text"
                name="codigoRamo"
                id="input_idRamo"
                placeholder="Ejemplo: JAV"
                onChange={this.cambioValor}
                value={codigoRamo}
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
                value={area}
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
                value={nombreCurso}
              />
            </div>
            <div>
              <label htmlFor="input_hhAcademicas">Horas académicas: </label>
              <input
                type="text"
                name="hh_academicas"
                id="input_hhAcademicas"
                onChange={this.cambioValor}
                value={hh_academicas}
              />
            </div>
            <div>
                <Select 
                placeholder="Elige un prerequisito"
                options={listadoPrerequisitos}
                onChange={this.cambioValorSelect}
                name="pre_requisito"
                isMulti= {true}
                />
              </div>           
            <div>
               <Select
               placeholder={"Elige un relator"}
               options={listadoRelatores}
               onChange={this.cambioValorSelect}
               name= "relator"
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

            {/* FORM ACTUALIZAR RAMOS */}
            <div id="form_registrarRamo" className={toggle_formEdit ? "active" : "form_registrarRamo"}>
        <div className="btn_close" onClick={this.SwitchToggleRamoEdit}>
            <BsX />
          </div>
            <h3>Actualización de ramos</h3>
            <form id="form_agregarRamo" onSubmit={this.alertEdit}>
                <div>
                <label htmlFor="input_idRamo">Codigo del Ramo: </label>
                <input
                    type="text"
                    name="codigoRamo"
                    id="input_codigoRamo"
                    placeholder="Ejemplo: JAV"
                    onChange={this.cambioValor}
                    value={ramosEdit.codigoRamo}
                />
                </div>
                <div>
                <label htmlFor="input_nombreRamo">Nombre del ramo: </label>
                <input
                    type="text"
                    name="nombreRamo"
                    id="input_nombreRamo"
                    onChange={this.cambioValor}
                    value={ramosEdit.nombreRamo}
                />
                </div>
                <div>
                <label htmlFor="input_hhAcademicas">Horas académicas: </label>
                <input
                    type="text"
                    name="hh_academicas"
                    id="input_hhAcademicas"
                    onChange={this.cambioValor}
                    value={ramosEdit.hh_academicas}
                />
                </div>
                <div>
                <input
                  type="submit"
                  className="btn_registrar"
                  value="Actualizar"
                />
              </div>
            </form>
            </div>

            {/* FORM REGISTRAR CURSO */}
            <div id="form_registrarCurso" className={toggle_formCurso ? "active" : "form_registrarCurso"}>
            <div className="btn_close" onClick={this.SwitchToggleCurso}><BsX /></div>
            <h3>Registro de cursos</h3>
            <form id="form_agregarCurso" onSubmit={this.sendDataCurso}>
              <input type="hidden" id="input_idCurso" />
              <div>
              <Select 
              options={listadoCuentas}
              placeholder="Elige una cuenta"
              onChange={this.cambioValorSelect}
              name="idCuenta"
              />
            </div>
              <div>
                <Select 
                placeholder="Elige un ramo"
                options={listadoRamos}
                onChange={this.cambioValorSelect}
                name="codigoRamo"
                />
              </div>  
              <div className="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="input_fechaInicio">Fecha Inicio: </label>
                <input 
                type="date" 
                id="input_fechaInicio" 
                name="input_fechaInicio"
                className="form-control"
                onChange={this.cambioValor}
                />
              </div>

              <div className="md-form md-outline input-with-post-icon datepicker">
                <label htmlFor="input_fechaFin">Fecha Fin: </label>
                <input
                  className="form-control"
                  type="date"
                  name="input_fechaFin"
                  id="input_fechaFin"
                  placeholder="yyyy-mm-dd"
                  onChange={this.cambioValor}
                />
              </div>  

              <div className="md-form md-outline">
                  <label htmlFor="input_horaInicio">Hora Inicio: </label>
                  <input 
                  type="time" 
                  name="input_horaInicio"
                  className="form-control" 
                  id="input_horaInicio"
                  onChange={this.cambioValor} />
              </div>

              <div className="md-form md-outline">
                  <label htmlFor="input_horaFin">Hora Fin: </label>
                  <input 
                  type="time" 
                  name="input_horaFin"
                  className="form-control" 
                  id="input_horaFin"
                  onChange={this.cambioValor} />
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
            </div>
        );
    }
}
 
export default ListadoRamos
