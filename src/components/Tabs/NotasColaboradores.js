import React, { Component } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import { BiShowAlt } from "react-icons/bi";
import "../css/Forms.css";
import { Link } from "react-router-dom";
import Select from 'react-select';
import { SpinnerDotted } from 'spinners-react';
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
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/paginador/botones_Colaboradores.php"
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
    sendData = (e) => {
    const num_boton = 1;
    const idCursosSelected = this.state.idCursosSelected;
    const usuarioSelected = this.state.usuarioSelected;
    this.setState({ num_boton: num_boton });
    var NotasColaboradores = { num_boton: num_boton, idCursosSelected: idCursosSelected, usuarioSelected: usuarioSelected };

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
    // Detecta cambios de los valores ingresados en el input
    cambioValorRSelect = (e) => {
        const state = this.state
        state[e.name] = e.value;
        this.setState({state})
        this.sendData(e);
    }; 



    


    
  render() {
    const { loadedData, notas, paginador } = this.state;
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
                 



    if (!loadedData) {
      return (
      <div style={{margin: "auto"}}>
      <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
      </div>
      
      );
    }
    return (
        
      <div style={{paddingLeft: "0", paddingTop: "5px"}}className="container-fluid">
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
                  <button onClick={() => this.loadDataEdit(nota.ID)} title="Editar colaborador" id="btn_edit_cuenta"><BsPencilSquare /></button>
                  <button title="Examinar colaborador"id="btn_edit_cuenta"><Link style={{textDecoration: 'none', color: "black"}} to={"/InfoColaboradores/"+nota.usuario}><BiShowAlt /></Link></button>
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
            <div id="paginador">
            {paginador.map((pagina) => (
              <li>
                <button
                  onClick={this.sendData}
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
    );
  }
}

export default DetalleColaboradores;
