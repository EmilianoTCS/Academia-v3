import React, { Component } from 'react';
import { SpinnerDotted } from "spinners-react";

class DetalleNotas extends Component {
    state = {
      notas: [],
      loadedData: false
      }

  componentDidMount(){
    this.loadData();
  }
  
  //Carga los datos de los cursos para introducirlos en la tabla
  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/Notas.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, notas: dataResponse });
      })
      .catch(console.log());
  }



    render() { 
      const {loadedData, notas } = this.state;
      const styleLoading = {
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: "-25px 0 0 -25px",
      };

      if (!loadedData) {
        return (
          <SpinnerDotted
            style={styleLoading}
            size={74}
            thickness={105}
            speed={96}
            color="rgba(172, 57, 59, 1)"
          />
        );
      }
        return (
            <div>
                <table className="table table-striped table-inverse table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th>CURSO</th>
                            <th>EXAMENES</th>
                            <th>NOTA</th>
                            <th>PROMEDIO</th>
                            <th>% APROBACIÓN</th>
                      </tr>
                        </thead>
                        <tbody>
                        {notas.map((nota) => (
                                <tr>
                                  <td>{nota.codigoCurso}</td>
                                  <td>{nota.num_evaluaciones}</td>
                                  <td>{nota.nota}</td>
                                  <td>{nota.promedio}</td>
                                  <td>{nota.porcentaje}</td>
                                </tr>
                        ))}
                         </tbody>
                </table>
            </div>
        );
    }
}
 
export default DetalleNotas;