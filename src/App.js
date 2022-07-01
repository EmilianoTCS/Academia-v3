import React from "react";
import "./App.css";
import { useState } from "react";
import HomePage from "./components/homePage";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
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
function App() {

  const [conectado, setConectado] = useState(false);

  const acceder = (estado) => {
    setConectado(estado);
  }
  
  return (
    <Router>
      {/* <Redirect to="/home" /> */}
      <Route path="/home" component={HomePage}></Route>
      <Route exact path="/" component={HomePage}></Route>
      <Route path={"/login"} component={Login}></Route>
      <Route path="/Cursos" component={ListadoCursos}></Route>
      <Route path="/Ramos" component={ListadoRamos}></Route>
      <Route path="/Relator" component={ListadoRelator}></Route>
      <Route path="/reporteGeneral" component={ReporteGeneral}></Route>
      <Route path="/Colaboradores" component={ListadoColaboradores}></Route>
      <Route path="/InfoColaboradores/:idUsuario" component={InfoColaboradores}></Route>
      <Route path="/InfoCursos/:idCurso" component={InfoCursos}></Route>
      <Route path="/EditarCursos/:ID" component={EditarCursos}></Route>
      <Route path="/EditarRamos/:ID" component={EditarRamos}></Route>
    </Router>
  );
  
}

export default App;
