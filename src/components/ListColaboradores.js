import React, { Component } from "react";
import "./css/Tables.css";
import { Link } from "react-router-dom";
class Listcolaboradores extends Component {
  constructor(props) {
    super(props);
    this.state = { loadedData: false, colaboradores: [] };
  }

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

  componentDidMount() {
    this.loadData();
  }

  deleteData = (idUsuario) =>{
    console.log(idUsuario);
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-deleteColaborador.php?idUsuario="+idUsuario)
     .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
        this.loadData();
      })
      .catch(console.log());
 } 

  

  render() {
    const { loadedData, colaboradores } = this.state;

    if (!loadedData) {
      return <div>Loading data...</div>;
    }

    return (
        <div>      
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Colaboradores</h4>
            <br />
            <Link className="btn btn-success" to={"/insertarColaborador"}>
              Agregar colaborador
            </Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre y Apellido</th>
                  <th>ID</th>
                  <th>Área</th>
                  <th>Cuenta</th>
                  <th>Subgerencia</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                {colaboradores.map((colaborador) => (
                  <tr key={colaborador.idUsuario}>
                    <td>{colaborador.nombre_completo}</td>
                    <td>{colaborador.idUsuario}</td>
                    <td>{colaborador.area}</td>
                    <td>{colaborador.idCuenta}</td>
                    <td>{colaborador.subgerencia}</td>
                    <td>{colaborador.correo}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="">
                        <Link to={'/EditarColaborador/'+colaborador.idUsuario} type="button" className="btn btn-primary">
                          Editar
                        </Link>
                        <button type="button" className="btn btn-danger" onClick={()=>this.deleteData(colaborador.idUsuario)}>
                          Eliminar
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        
    );
  }
}

export default Listcolaboradores;
