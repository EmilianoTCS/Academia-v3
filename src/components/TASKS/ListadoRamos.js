import React, {Component} from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import '../css/Tables.css'
import '../css/Botones.css'
import Header from "../templates/header";


class ListadoRamos extends Component {
    state = { loadedData: false, ramos: [], paginador: [],
      num_boton: "", } 

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
        const { loadedData, ramos, paginador } = this.state;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }
        return (
            <div>
             <Header></Header> 
                <div id="container_tabla">
                <div id="btn_container">
                    <button id="btn_registrar">Registrar ramo</button>
                    <input type="text" id="search_cuenta" placeholder="Buscador"/>
                    </div>
                    <table id="tabla_curso">
                                              <thead id="list_theadCursos">
                            <tr>
                                <th>idCuenta</th>
                                <th>ID del ramo</th>
                                <th>Nombre del ramo</th>
                                <th>HH académicas</th>
                                <th>Pre-requisito</th>
                                <th>Relator</th>
                             </tr>
                        </thead>
                        <tbody id="list_tbodyCursos">
                        {ramos.map((ramo) => (
                                <tr key={ramo.idCuenta}>
                                    <td>{ramo.idCuenta}</td>
                                    <td>{ramo.idRamo}</td>
                                    <td>{ramo.nombreRamo}</td>
                                    <td>{ramo.hh_academicas}</td>
                                    <td>{ramo.pre_requisito}</td>
                                    <td>{ramo.relator}</td>
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
 
export default ListadoRamos
