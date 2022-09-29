import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import ListadoCursos from "./components/TASKS/ListadoCursos";
import ListadoRamos from "./components/TASKS/ListadoRamos";
import ListadoRelator from "./components/TASKS/ListadoRelator";
import ReporteGeneral from "./components/TASKS/ReporteGeneral";
import ListadoColaboradores from "./components/TASKS/ListadoColaboradores";
import InfoColaboradores from "./components/TASKS/InfoColaboradores";
import InfoCursos from "./components/TASKS/InfoCursos";
import Administrador from "./components/TASKS/Administrador";
import ListadoClientes from "./components/TASKS/ListadoClientes";
import InscripcionCurso from "./components/TASKS/InscripcionCurso";
import Prerequisitos from "./components/TASKS/Prerequisitos";
import ListadoAsistencias from "./components/TASKS/ListadoAsistencias";
import HomeColaboradores from "./components/TASKS/HomeColaboradores";
import MisCursos from "./components/TASKS/MisCursos";
import Automation from "./components/Tabs/Automation";
import HomePage from "./components/homePage";

function App() {
  return (
    <Router>
      <Route path="/home" component={HomePage}></Route>
      <Route exact path="/" component={ReporteGeneral}></Route>
      <Route path={"/login"} component={Login}></Route>
      <Route path="/Cursos" component={ListadoCursos}></Route>
      <Route path="/Ramos" component={ListadoRamos}></Route>
      <Route path="/Relator" component={ListadoRelator}></Route>
      <Route path="/reporteGeneral" component={ReporteGeneral}></Route>
      <Route path="/Colaboradores" component={ListadoColaboradores}></Route>
      <Route
        path="/InfoColaboradores/:usuario"
        component={InfoColaboradores}
      ></Route>
      <Route path="/InfoCursos/:codigoCurso" component={InfoCursos}></Route>
      <Route path="/Administrador" component={Administrador}></Route>
      <Route path="/Clientes" component={ListadoClientes}></Route>
      <Route path="/InscripcionCurso" component={InscripcionCurso}></Route>
      <Route path="/Prerequisitos" component={Prerequisitos}></Route>
      <Route path="/Asistencias" component={ListadoAsistencias}></Route>
      <Route path="/HomeColaboradores" component={HomeColaboradores}></Route>
      <Route path="/MisCursos" component={MisCursos}></Route>
      <Route path="/Automation" component={Automation}></Route>
    </Router>
  );
}

export default App;
