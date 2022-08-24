import React, { Component } from "react";
import { SpinnerDotted } from 'spinners-react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


class BarChart extends Component {
  state = { cards: [], loadedData: false };

  loadData() {
    fetch(
      "http://20.168.67.13/TASKS/Cards-General.php"
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
    const styleLoading = {position: "absolute", top: "50%", left: "50%", margin: "-25px 0 0 -25px" }
    const etiquetas = ['Finalizado', 'En curso', 'Pendiente'];
    const { loadedData, cards } = this.state;
    var data = {
        labels: etiquetas,
        datasets: [{
          label: `Cantidad`,
          data: [cards.map(card => card.totalFinalizados), cards.map(card => card.totalActivos), cards.map(card => card.totalPendientes)],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      };
      var options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Cantidad de cursos por estado',
          },
        },
      };

      if(!loadedData){
        return(
          <SpinnerDotted style={styleLoading} size={74} thickness={105} speed={96} color="rgba(172, 57, 59, 1)" />
          );
    } 

    return (
      <div>
        <div>
            <Bar data={data} options={options} width={350} />
        </div>
      </div>
    );
  }
}

export default BarChart;
