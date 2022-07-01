import React, {Component} from "react";
import Header from "../templates/header";
import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";

class InfoCursos extends Component {
    state = {
        loadedData: false,
        cursos: [],
        paginador: [],
        num_boton: "",
        idCurso: "",
        horaInicio: "",
        horaFin: "",
        idUsuario: "",
        aprobacion: "",
        estado: ""}

    loadData() {
        const idCurso = this.props.match.params.idCurso
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-list_infoidCurso.php?idCurso="+idCurso
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, cursos: dataResponse });   
          })
          .catch(console.log());
      }
    componentDidMount(){
        this.loadData();
    }
     
    render() { 
        const { loadedData, cursos, paginador } = this.state;
    
        if(!loadedData){
            return(
                <h1>Loading...</h1>
            );
        }
        return (
            <div>
                <Header></Header>
                <div id="container_tabla">
          <div id="btn_container">
            <input type="text" id="search_cuenta" placeholder="Buscador" />
          </div>
          <table id="tabla_cuenta">
            <thead id="list_theadCuentas">
              <tr>
                <th>ID</th>
                <th>idCurso</th>
                <th>Hora de inicio</th>
                <th>Hora Fin</th>
                <th>idUsuario</th>
                <th>Porcentaje de Aprobación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody id="list_tbodyCuentas">
              {cursos.map((curso) => (
                <tr key={curso.ID}>
                  <td>{curso.ID}</td>
                  <td>{curso.idCurso}</td>
                  <td>{curso.horaInicio}</td>
                  <td>{curso.horaFin}</td>
                  <td><Link to={"/InfoColaboradores/"+curso.idUsuario}>{curso.idUsuario}</Link></td>
                  <td>{curso.aprobacion}</td>
                  <td>{curso.estado}</td>                                
                  <td>
                    <button
                      id="btn_delete"
                      onClick={() => this.deleteData(curso.ID)}
                    >
                      <BsTrash />
                    </button>
                    <button id="btn_edit_cuenta">
                      <BsPencilSquare />
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
            </div>
        );
    }
}
 
export default InfoCursos;