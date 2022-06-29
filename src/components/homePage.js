import React, {Component} from "react";
import { Link } from "react-router-dom";
import Header from "./templates/header";
import './css/Modulos.css'
class HomePage extends Component {
    render() { 
        return (
        <div>
             <Header></Header>
            <div id="container_mods">
                <div className="cartas">
                    <div className="cuerpo-carta">
                        <h4 className="titulo-carta">Navegador</h4>
                        <p className="texto-carta"><Link style={{ textDecoration: 'none', color: 'white' }}to={"/reporteGeneral"}>Reporte General</Link></p>
                        <p className="texto-carta"><Link style={{ textDecoration: 'none', color: 'white' }}to={"/Cursos"}>Cursos</Link></p>
                        <p className="texto-carta"><Link style={{ textDecoration: 'none', color: 'white' }}to={"/Ramos"}>Ramos</Link></p>
                        <p className="texto-carta"><Link style={{ textDecoration: 'none', color: 'white' }}to={"/Relator"}>Relator</Link></p>
                    </div>
                </div>
                <div className="cartas">
                    <div className="cuerpo-carta">
                        <h4 className="titulo-carta">Temarios</h4>
                        <p className="texto-carta"><a style={{ textDecoration: 'none', color: 'white' }}href="https://github.com/EmilianoTCS/Academia-v3/raw/master/Temarios/Temario%20Capacitaci%C3%B3n%20Jira%202.1%20(1)%20(1).pdf">JIRA</a></p>
                        <p className="texto-carta"><a style={{ textDecoration: 'none', color: 'white' }}href="https://github.com/EmilianoTCS/Academia-v3/raw/master/Temarios/Temario%20Capacitaci%C3%B3n%20GIT.pdf">GIT</a></p>
                    </div>
                </div>


            </div>
        </div> 
          );
    }
}
 
export default HomePage;
