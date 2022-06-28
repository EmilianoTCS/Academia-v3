import React, {Component} from "react";
import Header from "../templates/header";
import { BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import '../css/Botones.css'
import "../css/Forms.css";
class Colaboradores extends Component {
    state = { 
        loadedData: false,
        colaboradores: [],
        paginador: [],
        num_boton: "",} 

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
            // console.log("Sending data..");
            const num_boton = e.target.value;
            this.setState({num_boton : num_boton})
            var sendNum = {num_boton : num_boton}
        
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


    render() { 
    const { loadedData, colaboradores, paginador } = this.state;

    if (!loadedData) {
        return <div>Loading data...</div>;
      }
        return (
            <div>
                <Header />
        <div id="container_tabla">
            <div id="btn_container">
                <button id="btn_registrar" onClick={this.SwitchToggleRamo}>
                    Registrar colaborador
                </button>

                <input type="text" id="search_cuenta" placeholder="Buscador" />
            </div>
            <table id="tabla_cuenta">
                <thead id="list_theadCuentas">
                <tr>
                    <th>ID</th>
                    <th>Nombre Completo</th>
                    <th>idUsuario</th>
                    <th>Área</th>
                    <th>idCuenta</th>
                    <th>Subgerencia</th>
                    <th>Correo</th>
                </tr>
                </thead>
                <tbody id="list_tbodyCuentas">
                {colaboradores.map((colaborador) => (
                    <tr key={colaborador.ID}>
                    <td>{colaborador.ID}</td>
                    <td>{colaborador.nombre_completo}</td>
                    <td>{colaborador.idUsuario}</td>
                    <td>{colaborador.area}</td>
                    <td>{colaborador.idCuenta}</td>
                    <td>{colaborador.subgerencia}</td>
                    <td>{colaborador.correo}</td>
                    <td>
                        <button id="btn_delete" onClick={()=>this.deleteData(colaborador.ID)}>
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
 
export default Colaboradores;