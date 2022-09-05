import React, { Component } from "react";
import Header from "../templates/header";
import "../css/Cards.css"
import "../css/Charts.css"
import BarChart from "../Charts/Bar"
import PieChart from "../Charts/Pie"
import { SpinnerDotted } from 'spinners-react';
class ReporteGeneral extends Component {
  state = { cards: [] };

  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormaci%C3%B3n_V2/TASKS/Cards-General.php"
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, cards: dataResponse });
      })
      .catch(console.log());
  }

  componentDidMount() {
    this.loadData();
  }
  render() {
    const { loadedData, cards } = this.state;

    const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }
 
    if (!loadedData) {
      return (
        <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
        );
    }

    return (
      <div className="container-fluid">
        <Header />
        <h1 id="subtitulo_pagina">Reporte General de cursos</h1>
      {/* CONTENEDOR DE CARTAS */}
        <div id="container_cards">
            {cards.map((card) =>
            <><div id="coe_carta">
                    <div className="card-header">Cursos</div>
                    <div className="card-body">
                        <h2 className="card-title">{card.totalCursos}</h2>
                        <p className="card-text">Total</p>
                    </div>
                </div><div id="coe_carta">
                        <div className="card-header">Colaboradores</div>
                        <div className="card-body">
                            <h2 className="card-title">{card.totalColaboradores}</h2>
                            <p className="card-text">Total</p>
                        </div>
                    </div><div id="coe_carta">
                        <div className="card-header">Cursos</div>
                        <div className="card-body">
                            <h2 className="card-title">{card.totalFinalizados}</h2>
                            <p className="card-text">Finalizados</p>
                        </div>
                    </div><div id="coe_carta">
                        <div className="card-header">Porcentaje</div>
                        <div className="card-body">
                            <h2 className="card-title">{card.porcentajeFinalizados}</h2>
                            <p className="card-text">Finalizados</p>
                        </div>
                    </div><div id="coe_carta">
                        <div className="card-header">Cursos</div>
                        <div className="card-body">
                            <h2 className="card-title">{card.totalActivos}</h2>
                            <p className="card-text">Activos</p>
                        </div>
                    </div><div id="coe_carta">
                        <div className="card-header">Cursos</div>
                        <div className="card-body">
                            <h2 className="card-title">{card.totalPendientes}</h2>
                            <p className="card-text">Pendientes</p>
                        </div>
                    </div></>
                              )}                             
        </div>
        {/* CONTENEDOR DE GRÁFICOS  */}
        <div id="chartsContainer">
            <BarChart />
            <PieChart />
        </div>
      </div>
    );
  }
}

export default ReporteGeneral;
