import React, { useEffect, useState } from "react";
import getData from "../services/getData";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const [data, setData] = useState([]);
  const url = "TASKS/Cards-General.php";

  useEffect(() => {
    getData(url).then((data) => setData(data));
  });

  const etiquetas = ["Finalizado", "En curso", "Pendiente"];
  var datos = {
    labels: etiquetas,
    datasets: [
      {
        label: `Cantidad`,
        data: [
          data.map((singleData) => singleData.totalFinalizados),
          data.map((singleData) => singleData.totalActivos),
          data.map((singleData) => singleData.totalPendientes),
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  var options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cantidad de cursos por estado",
      },
    },
  };

  return (
    <div>
      <div>
        <Bar data={datos} options={options} width={350} />
      </div>
    </div>
  );
}
