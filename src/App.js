import React from "react";
import "./App.css";

import HomePage from "./components/homePage";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login";
import ListadoCursos from "./components/TASKS/ListadoCursos";
import ListadoRamos from "./components/TASKS/ListadoRamos";
import ListadoRelator from "./components/TASKS/ListadoRelator";
import ReporteGeneral from "./components/TASKS/ReporteGeneral";
import ListadoColaboradores from "./components/TASKS/ListadoColaboradores";
import InfoColaboradores from "./components/TASKS/InfoColaboradores";
import InfoCursos from "./components/TASKS/InfoCursos";
import EditarCursos from "./components/TASKS/EditarCursos";
import EditarRamos from "./components/TASKS/EditarRamos";
import EditarColaboradores from "./components/TASKS/EditarColaboradores";
import Administrador from "./components/TASKS/Administrador";
import ListadoClientes from "./components/TASKS/ListadoClientes";
import EditarClientes from "./components/TASKS/EditarClientes";
import InscripcionCurso from "./components/TASKS/InscripcionCurso";
import Prerequisitos from "./components/TASKS/Prerequisitos";
function App() {
  
  return (
    <Router>
      <Route path="/home" component={HomePage}></Route>
      <Route exact path="/" component={HomePage}></Route>
      <Route path={"/login"} component={Login}></Route>
      <Route path="/Cursos" component={ListadoCursos}></Route>
      <Route path="/Ramos" component={ListadoRamos}></Route>
      <Route path="/Relator" component={ListadoRelator}></Route>
      <Route path="/reporteGeneral" component={ReporteGeneral}></Route>
      <Route path="/Colaboradores" component={ListadoColaboradores}></Route>
      <Route path="/InfoColaboradores/:usuario" component={InfoColaboradores}></Route>
      <Route path="/InfoCursos/:codigoCurso" component={InfoCursos}></Route>
      <Route path="/EditarCursos/:ID" component={EditarCursos}></Route>
      <Route path="/EditarRamos/:ID" component={EditarRamos}></Route>
      <Route path="/EditarColaboradores/:ID" component={EditarColaboradores}></Route>
      <Route path="/Administrador" component={Administrador}></Route>
      <Route path="/Clientes" component={ListadoClientes}></Route>
      <Route path="/EditarClientes/:ID" component={EditarClientes}></Route>
      <Route path="/InscripcionCurso" component={InscripcionCurso}></Route>
      <Route path="/Prerequisitos" component={Prerequisitos}></Route>
    </Router>
  );
  
}

export default App;
