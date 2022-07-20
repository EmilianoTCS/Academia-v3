import React, {Component} from "react";
import Header from "../templates/header";
import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash} from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";

class InfoRamos extends Component {
    state = {
        loadedData: false,
        ramos: [],
       }

    loadData() {
        const codigoRamo = this.props.match.params.codigoRamo
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-list_infoidCurso.php?codigoCurso="+codigoRamo
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, cursos: dataResponse });   
          })
          .catch(console.log());
      }
    componentDidMount(){
        this.loadData();
        this.loadPaginador();
    }
     
    loadPaginador() {
      fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/paginador/botones_infoCursos.php"
      )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({ paginador: dataResponse });
          console.log(dataResponse);
        })
        .catch(console.log());
    }


    sendNum = (e) => {
      e.preventDefault();
      console.log("Sending data..");
      const num_boton = e.target.value;
      this.setState({ num_boton: num_boton });
      var sendNum = { num_boton: num_boton };
  
      fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-listClientes.php?pagina",
        {
          method: "POST",
          body: JSON.stringify(sendNum),
        }
      )
        .then((response) => response.json())
        .then((dataResponse) => {
          this.setState({ clientes: dataResponse });
        })
        .catch(console.log());
    };



    render() { 
        const { loadedData, cursos, paginador } = this.state;
    
        if(!loadedData){
            return(
                <h1>Loading...</h1>
            );
        }
        return (
            <div className="container-fluid">
                <Header></Header>
                <table id="tablaClientes" className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
              <tr>
                <th>ID</th>
                <th>codigoCurso</th>
                <th>Hora de inicio</th>
                <th>Hora Fin</th>
                <th>usuario</th>
                <th>Porcentaje de Aprobación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr>
                  <td>{curso.ID}</td>
                  <td>{curso.codigoCurso}</td>
                  <td>{curso.horaInicio}</td>
                  <td>{curso.horaFin}</td>
                  <td><Link to={"/InfoColaboradores/"+curso.usuario}>{curso.usuario}</Link></td>
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
 
export default InfoRamos;