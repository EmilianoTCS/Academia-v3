import React, { Component } from "react";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import { BiShowAlt } from "react-icons/bi";
import "../css/Forms.css";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { SpinnerDotted } from 'spinners-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
class DetalleColaboradores extends Component {
    state = {
    loadedData: false,
    usuario: [],
    usuarioSelected: "",
    idCursos: [],
    idCursosSelected: "",
    notas: [],
    paginador: [],
    num_boton: "",
    deleteFilters: false,
    notasEdit: [],
    toggle_formEdit: false,
    nota: "",
    porcentaje: ""

    };
    // Recolecta los datos del registro de clientes
    loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/NotasColaboradores.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, notas: dataResponse });
      })
      .catch(console.log());
    }
    // Recolecta los datos del paginador
    loadPaginador() {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/paginador/botones_Evaluaciones.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ paginador: dataResponse });
      })
      .catch(console.log());
    }
    // Carga el listado de cursos
    loadidCursos() {
    fetch(
    "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/idCurso.php?idCurso"
        )
    .then((response) => response.json())    
    .then((dataResponse) => {
    this.setState({ loadedData: true, idCursos: dataResponse });    
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
    // Envía el número seleccionado del paginador a la sentencia SQL para poder cambiar de página
    sendData = () => {
    const num_boton = this.state.num_boton;
    const idCursosSelected = this.state.idCursosSelected;
    const usuarioSelected = this.state.usuarioSelected;
    var NotasColaboradores = {num_boton: num_boton, idCursosSelected: idCursosSelected, usuarioSelected: usuarioSelected };
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/NotasColaboradores.php?NotasColaboradores",
      {
        method: "POST",
        body: JSON.stringify(NotasColaboradores)
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.setState({ notas: dataResponse });
      })
      .catch(console.log());
    };
    // Realiza la carga automática de funciones en el instante que se ingresó a la pantalla
    componentDidMount() {
    this.loadData();
    this.loadPaginador();
    this.loadidCursos();
    this.loadListadoUsuarios();
    };
    // Detecta cambios de los valores de los filtros
    cambioValorRSelect = (e) => {
        const state = this.state
        state[e.name] = e.value;
        this.setState({state})
      this.setState({deleteFilters: true, num_boton: 1})
      this.sendData();
    }; 
    //Detecta los botones del paginador
    cambioValor = (e) =>{
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState({state : state});
      this.sendData();
    }
    //Cambia los valores introducidos en el input
    cambioValorInputs = (e) => {
      const state = this.state.notasEdit;
      state[e.target.name] = e.target.value;
      this.setState({ notasEdit: state });
      };
    //Elimina los filtros seleccionados
    resetFilters = () => {
      this.setState({idCursosSelected: '', usuarioSelected: '', num_boton: '', 
      deleteFilters: false})
      this.loadData();
    }
      //Carga los datos del curso seleccionado
    loadDataEdit(ID) {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-selectNotasColaborador.php?ID="+ID
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, notasEdit: dataResponse[0], toggle_formEdit: true });  
        console.log(dataResponse[0]); 
        
      })
      .catch(console.log());
    }
     // Permite alternar la visibilidad del formulario de actualización de datos
    SwitchToggleFormEdit = () => {
      this.setState({ toggle_formEdit: false });
          };
    // Envía los datos ingresados para actualizar los registros
    sendDataNotasEdit = (e) =>{
      e.preventDefault();
      const ID = this.state.notasEdit.ID;
      const{ nota, porcentaje} = this.state.notasEdit;
      var datosEnviar = {ID: ID, nota : nota, porcentaje: porcentaje}
      fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-editNotasColaborador.php?editarNotasColaborador",{
      method: "POST",
      body: JSON.stringify(datosEnviar)
      })
      .then((response) => response.json())
      .then((dataResponse) => {
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
    // Muestra un mensaje de confirmación para eliminar
    alertDelete = (ID) => {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: "¿Deseas eliminar este examen?",
        text: "No podrás volver a habilitarlo",
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
    // Función para eliminar los exámenes seleccionados
    deleteData = (ID) =>{
      fetch(
        "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-deleteColaborador.php?delete="+ID)
      .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          this.loadData();
        })
        .catch(console.log());
      };


      
  render() {
    const { loadedData, notas, paginador, toggle_formEdit } = this.state;
    const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }
    const usuario= this.state.usuario.map((label => (
        {label: label.usuario,
         value: label.usuario,
         name: "usuarioSelected"
    })))
    const idCursos= this.state.idCursos.map((label => (
            {label: label.nombreRamo,
             value: label.ID,  
             name: "idCursosSelected"
    })))
    const colorStyles = {
    control: (styles) =>({...styles,
        backgroundColor:"white",
        padding: "0",
        display: "flex",
        flexDirection: "row",
        margin: "0",
        height: "30px",
        minHeight: "0"
    }),
    container: (styles) => ({...styles,
        width:"auto",
        position:"relative",
        padding: "0",
        height: "auto",
        fontFamily: "Roboto Slab, seriff",
        fontSize: "13pt",
        marginTop: "1%",
        marginRight: "1%"        
    }),
    placeholder: (styles) => ({...styles,
        position: "relative",
        marginTop: "1px",
        gridArea: "1/1/-2/3",
        color: "black",
        padding: "0 20px 0 0"
    }),
    indicatorsContainer: (styles) => ({...styles,
        height: "50px",
        minHeight: "0",
        marginTop: "-5%"
        
    }),
    indicatorSeparator: (styles) => ({...styles,
        height: "30px",
        minHeight: "0",
        marginTop: "10px"
        
    }),
    singleValue: (styles) => ({...styles,
        position: "relative",
        marginTop: "0",
        gridArea: "1/1/-2/3",
        color: "black",
        padding: "0 20px 0 0"
    }),
    };
    const deleteFilters = this.state.deleteFilters

    if (!loadedData) {
      return (
      <div style={{margin: "auto"}}>
      <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
      </div>
      
      );
    }
    return (
        
      <div style={{margin: "auto"}}className="container-fluid">
        <div className="row"> 
              <Select
              options={idCursos}
              styles={colorStyles}
              onChange={this.cambioValorRSelect}
              placeholder= "Selecciona un curso"
              />

              <Select
              options={usuario}
              styles={colorStyles}
              onChange={this.cambioValorRSelect}
              placeholder= "Selecciona un usuario"
              />              
              <button onClick={this.resetFilters} className={deleteFilters ? 'active': '' } title= 'Eliminar filtros' id="deleteFilters">X</button>

              <button id="btn_registrarColaborador" onClick={this.SwitchToggleColaboradores}>Registrar colaborador</button>
            </div>
            {/* LISTADO DE COLABORADORES */}
           <table style={{whiteSpace: "nowrap"}}id="tablaColaboradores" className="table table-striped table-inverse table-responsive">
            <thead className="thead-inverse">
              <tr>
                <th>Curso</th>
                <th>Usuario</th>
                <th>Examenes</th>
                <th>Nota</th>
                <th>Promedio</th>
                <th>% Aprobación</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota) => (
                <tr key={nota.ID}>
                  <td>{nota.codigoCurso}</td>
                  <td>{nota.usuario}</td>
                  <td>{nota.num_evaluaciones}</td>
                  <td>{nota.nota}</td>
                  <td>{nota.promedio}</td>
                  <td>{nota.porcentaje}</td>
                  <td>
                  <button onClick={() => this.loadDataEdit(nota.ID)} title="Editar nota" id="btn_edit_cuenta"><BsPencilSquare /></button>
                    <button
                    title="Eliminar colaborador"
                      id="btn_delete"
                      onClick={() => this.alertDelete(nota.ID)}
                    >
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
                 </table>
                 <div id="paginador">
            {paginador.map((pagina) => (
              <li>
                <button
                  onClick={this.cambioValor}
                  name="num_boton"
                  value={pagina.paginas}
                >
                  {pagina.paginas}
                </button>
              </li>
            ))}
          </div>
              
        {/* FORMULARIO EDICIÓN DE NOTAS */}
        <div id="form_registrarColaborador" className={ toggle_formEdit ? "active" : "form_registrarColaborador"}>
          <div onClick={this.SwitchToggleFormEdit} className="btn_close"> <BsX /></div>
          <h3>Actualización de Notas</h3>
          <form id="form_agregarColaborador" onSubmit={this.sendDataNotasEdit}>
            <input type="hidden" id="input_Usuario" />

            <div>
              <label htmlFor="input_numEvaluaciones">Número de examen: </label>
              <input type="text" value={this.state.notasEdit.num_evaluaciones} name="num_evaluaciones" disabled id="input_numEvaluaciones" />
            </div>

            <div>
              <label htmlFor="input_Nota">Nota: </label>
              <input
                type="text"
                name="nota"
                onChange={this.cambioValorInputs}
                value={this.state.notasEdit.nota}
                id="input_Nota"
              />
            </div>
            <div>
              <label htmlFor="input_porcentaje">Porcentaje: </label>
              <input
                type="text"
                name="porcentaje"
                value={this.state.notasEdit.porcentaje}
                onChange={this.cambioValorInputs}
                id="input_porcentaje"
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

export default DetalleColaboradores;
