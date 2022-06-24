import React, { Component } from "react";
import Header from "../templates/header";
import "../css/Cards.css"
import "../css/Charts.css"
import BarChart from "../Charts/Bar"
import PieChart from "../Charts/Pie"
class ReporteGeneral extends Component {
  state = { cards: [] };

  loadData() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/Cards-General.php"
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
 
    if (!loadedData) {
      return <div>Loading data...</div>;
    }

    return (
      <div>
        <Header />
        <h1 id="subtitulo_pagina">Reporte General del estado actual de cursos</h1>
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
        <div id="chartsContainer">
            <BarChart />
            <PieChart />
        </div>
      </div>
    );
  }
}

export default ReporteGeneral;
