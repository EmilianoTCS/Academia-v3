import React, {Component} from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import '../css/Tables.css'
import Header from "../templates/header";
import {Link } from "react-router-dom";
import '../css/Botones.css'

class ListadoRelator extends Component {
    state = { 
      loadedData: false, 
      relatores: [], 
      paginador: [],
      num_boton: "",
} 

    loadData() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listOrador.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, relatores: dataResponse });
          })
          .catch(console.log());
      }

      loadPaginador() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_Relator.php"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ paginador: dataResponse });
          })
          .catch(console.log());
      }
    
      sendNum = (e) => {
        e.preventDefault();
        const num_boton = e.target.value;
        this.setState({num_boton : num_boton})
        var sendNum = {num_boton : num_boton}
    
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listOrador.php?pagina",
          {
            method: "POST",
            body: JSON.stringify(sendNum),
          }
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ relatores: dataResponse });
            console.log(dataResponse);
            console.log(sendNum);
          })
          .catch(console.log());
      };

     componentDidMount() {
        this.loadData();
        this.loadPaginador();
      }
    
    //   deleteData = (idUsuario) =>{
    //     console.log(idUsuario);
    //     fetch(
    //       "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-deleteColaborador.php?idUsuario="+idUsuario)
    //      .then((response) => response.json())
    //       .then((dataResponse) => {
    //         console.log(dataResponse);
    //         this.loadData();
    //       })
    //       .catch(console.log());
    //  } 




    render() { 
        const { loadedData, relatores, paginador } = this.state;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
        return (
            <div>
                <Header></Header>
                <div id="container_tabla">
                  <div id="btn_container">
                    <Link id="href_asistencias" href="coe-asistencias.php">Asistencias</Link>
                    <button id="insert_orador" href="#">Registrar orador</button>
                    <Link id="action_href_colaboradores" href="#">Colaboradores</Link>
                    <button id="insert_colaborador" href="#">Registrar colaborador</button>
                    <input type="text" id="search_cuenta" placeholder="Buscador"/>
                    </div>
                    <table id="tabla_orador">
                        <thead id="list_theadOrador">
                            <tr>
                                <th>Relator</th>
                                <th>Cuenta</th>
                                <th>ID Ramo</th>
                                <th>Nombre del ramo</th>
                                <th>Estado</th>
                             </tr>
                        </thead>
                        <tbody id="list_tbodyOrador">
                        {relatores.map((relator) => (
                                <tr key={relator.idCuenta}>
                                    <td>{relator.relator}</td>
                                    <td>{relator.idCuenta}</td>
                                    <td>{relator.idRamo}</td>
                                    <td>{relator.nombreRamo}</td>
                                         <td>{relator.estado}</td>
                                    <td>
                                    <button id="btn_delete"><BsTrash/></button>
                                    <button id="btn_edit_cuenta"><BsPencilSquare/></button>
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
 
export default ListadoRelator
