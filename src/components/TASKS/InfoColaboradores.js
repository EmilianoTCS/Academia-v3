import React, {Component} from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";
import { Link } from "react-router-dom";

class InfoColaboradores extends Component {
    state = {
        loadedData: false,
        colaboradores: [],
        paginador: [],
        num_boton: "",
        usuario: "",
        codigoCuenta: "",
        nombre_completo: "",
        area: "",
        subgerencia: "",
        correo: ""}

    loadData() {
        const usuario = this.props.match.params.usuario
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-list_infoUsuarios.php?usuario="+usuario
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, colaboradores: dataResponse });   
          })
          .catch(console.log());
      }
    componentDidMount(){
        this.loadData();
    }
     
    render() { 
        const { loadedData, colaboradores, paginador } = this.state;
        
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
                <th>usuario</th>
                <th>codigoRamo</th>
                <th>idCurso</th>
                <th>Porcentaje de Aprobación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody id="list_tbodyCuentas">
              {colaboradores.map((colaborador) => (
                <tr key={colaborador.ID}>
                  <td>{colaborador.ID}</td>
                  <td>{colaborador.usuario}</td>
                  <td>{colaborador.codigoRamo}</td>
                  <td><Link to={"/InfoCursos/"+colaborador.idCurso}>{colaborador.idCurso}</Link></td>
                  <td>{colaborador.aprobacion}</td>
                  <td>{colaborador.estado}</td>                                
                  <td>
                    <button
                      id="btn_delete"
                      onClick={() => this.deleteData(colaborador.ID)}
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
 
export default InfoColaboradores;