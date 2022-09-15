import React, { Component } from "react";
import Hexagon from "react-hexagon";
import "../css/Subcards.css";
import { SpinnerDotted } from "spinners-react";

class Automation extends Component {
  state = { cards: [], promedios: [], loadedData: false };

  componentDidMount() {
    this.loadData();
    // this.loadDataPromedios();
  }

  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/SubCards.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, cards: dataResponse });
      })
      .catch(console.log());
  }
  // loadDataPromedios() {
  //   fetch(
  //     "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/auxiliar/Promedios.php"
  //   )
  //     .then((response) => response.json())
  //     .then((dataResponse) => {
  //       this.setState({ loadedData: true, promedios: dataResponse });
  //       console.log(dataResponse);
  //     })
  //     .catch(console.log());
  // }

  render() {
    const styleHexGreen = {
      fill: "#548235",
      stroke: "white",
      strokeWidth: "5",
      filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
    };
    const styleHexRed = {
      fill: "red",
      stroke: "white",
      strokeWidth: "5",
      filter: "drop-shadow(10px 10px 5px rgb(0 0 0 / 0.4))",
    };
    const { cards, loadedData, promedios } = this.state;
    const styleLoading = {
      position: "absolute",
      top: "50%",
      left: "50%",
      margin: "-25px 0 0 -25px",
    };
    const styleActive = {color: 'green'}
    const styleInactive = {color: 'red'}

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
        <div className="card" style={{ width: "auto", border: "none", marginLeft: "-2%" }}>
          <div className="card-body p-0 ">
            <div className="row">
              {cards.map((card) => (
                <div className="col-sm-4" key={card.ID}>
                  <div
                    id="grayCard"
                    className="card shadow-none"
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="card-body ">
                      <h4
                        style={{
                          margin: "-13px 5px 1% -2px",
                          fontWeight: "600",
                          fontSize: "15pt",
                          fontFamily: "Roboto Slab, serif",
                          fontStyle: "italic",
                        }}
                        className="card-title"
                      >
                        {card.codigoRamo}
                      </h4>
                      <div id="CardsContent">
                        <Hexagon className="hexagon" style={card.promedio >= 6 ? styleHexGreen : styleHexRed }>
                          {/* {promedios.map((promedio) => ( */}
                          <text
                            x="50%"
                            y="50%"
                            fill="white"
                            fontSize="150"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="Roboto Slab, serif"
                          >
                            {card.promedio}
                          </text>
                          {/* ))} */}

                          <text
                            x="50%"
                            y="73%"
                            fontSize="70"
                            fill="white"
                            textAnchor="middle"
                            fontFamily="Roboto Slab, serif"
                          >
                            PROMEDIO
                          </text>
                        </Hexagon>
                        <div id="statsContent">
                          <div className="card text-center shadow-sm">
                            <div className="card-body p-0">
                              <h1>
                                Estado<h1 style={card.estado === 'Activo' ? styleActive : styleInactive}>{card.estado}</h1>
                              </h1>
                            </div>
                          </div>
                          <div className="card text-center shadow-none">
                            <div className="card-body p-0">
                              <h1>Periodo: {card.inicio}</h1>
                            </div>
                          </div>
                          <div className="card text-center shadow-none">
                            <div className="card-body p-0">
                              <h1>N° de clases: {card.totalClases}</h1>
                            </div>
                          </div>
                          <div>
                            <a
                              name=""
                              id=""
                              href=""
                              className="btn btn-dark p-0 mt-4 w-100"
                              role="button"
                            >
                              Inscribirse
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Automation;
