import React, { Component } from "react";
import Header from "../templates/header";
import "../css/HomeColaboradores.css";
import Hexagon from "react-hexagon";
class HomeColaboradores extends Component {
  state = {
    datos: [],
    isLoaded: false,
  };

  // Recolecta los datos
  loadData() {
    fetch("http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/coe-listColaboradores.php")
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, colaboradores: dataResponse });
      })
      .catch(console.log());
  }
  
  render() {
    const styleHexGreen = {
      fill: "#548235",
      stroke: "black",
      strokeWidth: "2",
      width: "10%",
      height: "10%",
      filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
    };
    const styleHexOrange = {
        fill: "#c55a11",
        stroke: "black",
        strokeWidth: "2",
        width: "10%",
        height: "10%",
        filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
      };

    return (
      <div>
        <Header />
        <div id="cardContainer" className="container">
          <div id="containerAutomation" className="card w-50 m-1">
            <div className="card-body">
              <h4 className="card-title">Automation</h4>
              <div id="progressHex" className="card shadow-sm">
                <div className="card-body">
                  <Hexagon className="hexagono" style={styleHexGreen}>
                    <text
                      x="50%"
                      y="55%"
                      fill="white"
                      fontSize="180"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="Roboto Slab, serif"
                    >
                      80%
                    </text>
                    <text
                      x="50%"
                      y="75%"
                      fontSize="50"
                      fill="white"
                      textAnchor="middle"
                      fontFamily="Roboto Slab, serif"
                    >
                      FINALIZADO
                    </text>
                  </Hexagon>
                </div>
              </div>
              <div id="subCardsContainer">
                <div
                  id="subcards"
                  className="card text-center shadow-none bg-dark text-light"
                >
                  <div className="card-body">
                    <h4 className="card-title h6">Cursos pendientes</h4>
                    <p className="card-text display-2">5</p>
                  </div>
                </div>
                <div
                  id="subcards"
                  className="card text-center shadow-none bg-dark text-light"
                >
                  <div className="card-body">
                    <h4 className="card-title h6">Cursos finalizados</h4>
                    <p className="card-text display-2">5</p>
                  </div>
                </div>
                <div
                  id="subcards"
                  className="card text-center shadow-none bg-dark text-light"
                >
                  <div className="card-body">
                    <h4 className="card-title h6">Promedio general</h4>
                    <p className="card-text display-2">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="containerAutomation" className="card w-50 m-1">
            <div className="card-body">
              <h4 className="card-title">DevOps</h4>
              <div id="progressHex" className="card shadow-sm">
                <div className="card-body">
                  <Hexagon className="hexagono" style={styleHexOrange}>
                    <text
                      x="50%"
                      y="55%"
                      fill="white"
                      fontSize="180"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="Roboto Slab, serif"
                    >
                      40%
                    </text>
                    <text
                      x="50%"
                      y="75%"
                      fontSize="50"
                      fill="white"
                      textAnchor="middle"
                      fontFamily="Roboto Slab, serif"
                    >
                      FINALIZADO
                    </text>
                  </Hexagon>
                </div>
              </div>
              <div id="subCardsContainer">
                <div
                  id="subcards"
                  className="card text-center shadow-none bg-dark text-light"
                >
                  <div className="card-body">
                    <h4 className="card-title h6">Cursos pendientes</h4>
                    <p className="card-text display-2">5</p>
                  </div>
                </div>
                <div
                  id="subcards"
                  className="card text-center shadow-none bg-dark text-light"
                >
                  <div className="card-body">
                    <h4 className="card-title h6">Cursos finalizados</h4>
                    <p className="card-text display-2">5</p>
                  </div>
                </div>
                <div
                  id="subcards"
                  className="card text-center shadow-none bg-dark text-light"
                >
                  <div className="card-body">
                    <h4 className="card-title h6">Promedio general</h4>
                    <p className="card-text display-2">8</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeColaboradores;
