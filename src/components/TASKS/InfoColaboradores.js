import React, {Component} from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";
import { SpinnerDotted } from 'spinners-react';

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
        correo: "",
        }

    loadData() {
        const usuario = this.props.match.params.usuario
        fetch(
          "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-list_infoUsuarios.php?usuario="+usuario
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
        const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }

        if(!loadedData){
            return(
              <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
              );
        }
        return (
            <div>
                <Header></Header>
                    <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                      <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Nombre del curso</th>
                        <th>% de aprobación</th>
                        <th>% de asistencia</th>
                        <th>Estado</th>
                        <th>Operaciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {colaboradores.map((colaborador) => (
                        <tr key={colaborador.ID}>
                          <td>{colaborador.ID}</td>
                          <td>{colaborador.usuario}</td>
                          <td>{colaborador.nombreRamo}</td>
                          <td>{colaborador.aprobacion}</td>
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

        );
    }
}
 
export default InfoColaboradores;