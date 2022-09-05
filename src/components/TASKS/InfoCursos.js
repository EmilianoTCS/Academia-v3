import React, {Component} from "react";
import Header from "../templates/header";
import { Link } from "react-router-dom";
import { BsPencilSquare, BsTrash} from "react-icons/bs";
import "../css/Tables.css";
import "../css/Paginador.css";
import "../css/Botones.css";
import "../css/Forms.css";
import { SpinnerDotted } from 'spinners-react';

class InfoCursos extends Component {
    state = {
        loadedData: false,
        cursos: [],
        paginador: [],
        num_boton: "",
        codigoCurso: "",
        horaInicio: "",
        horaFin: "",
        usuario: "",
        aprobacion: "",
        estado: ""}

    loadData() {
        const codigoCurso = this.props.match.params.codigoCurso
        fetch(
          "http://20.168.67.13/TASKS/coe-list_infoidCurso.php?codigoCurso="+codigoCurso
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
        "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/paginador/botones_infoCursos.php"
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
        const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }

        if(!loadedData){
            return(
              <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
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
 
export default InfoCursos;