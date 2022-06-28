import React from "react";
import "./App.css";
import { useState } from "react";
import HomePage from "./components/homePage";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login";
import ListadoCursos from "./components/TASKS/ListadoCursos";
import ListadoRamos from "./components/TASKS/ListadoRamos";
import ListadoRelator from "./components/TASKS/ListadoRelator";
import ReporteGeneral from "./components/TASKS/ReporteGeneral";
import ListadoColaboradores from "./components/TASKS/ListadoColaboradores";
function App() {
  const [conectado, setConectado] = useState(false);

  const acceder = (estado) => {
    setConectado(estado);
  }

  return (
    <Router>


      <Route path="/home" component={HomePage}></Route>
      <Route exact path={"/login"} component={Login}></Route>
      <Route path="/Cursos" component={ListadoCursos}></Route>
      <Route path="/Ramos" component={ListadoRamos}></Route>
      <Route path="/Relator" component={ListadoRelator}></Route>
      <Route path="/reporteGeneral" component={ReporteGeneral}></Route>
      <Route path="/Colaboradores" component={ListadoColaboradores}></Route>
    </Router>
  );
}

export default App;
