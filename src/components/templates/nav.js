import React, {Component} from "react";
import user_logo from '../img/User_logo.png';
import "../css/sidebar.css";
import {Link, Redirect } from "react-router-dom";



class Navigator extends Component {
  constructor(props){
    super(props);
    this.state = { 
      toggleAcademia : false, 
      toggleColaboradores: false,
      isLogged: true,
      toggleAsistencias: false } 
    
  };

    SwitchToggleAcademia = () =>{
        this.setState({toggleAcademia: !this.state.toggleAcademia})
    }
    SwitchToggleColaboradores = () =>{
      this.setState({toggleColaboradores: !this.state.toggleColaboradores})
     } 
     SwitchToggleAsistencias = () =>{
      this.setState({toggleAsistencias: !this.state.toggleAsistencias})
     }
    logout() {
      console.log("Session is closing..");
      fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/logout.php?logout"
      )
        .then((response) => response.json())
        .then((dataResponse) => {
          if(dataResponse === "Cierre exitoso"){
              this.setState({isLogged:false})
          }
        })
        .catch(console.log());
    }
    render() { 
        const toggleAcademia = this.state.toggleAcademia;
        const toggleColaboradores = this.state.toggleColaboradores;
        const toggleAsistencias = this.state.toggleAsistencias;
        const isLogged = this.state.isLogged;
        const isActive = this.props.isActive;

        if(isLogged){
        return (
        <div className="container-fluid">
        <section id="sidebar" className={isActive ? "active" : "sidebar"}>
          <ul >
            <li><img id="User_logo" src={user_logo} alt="User Logo"/></li>
            <h4>{this.userName}</h4>
            <li><Link to={"/home"}>HOME</Link></li>
      
            <li id="li_Academia" onClick={this.SwitchToggleAcademia} >COE - ACADEMIA
              <ul id="COE_Academia" className={toggleAcademia ? "active" : " COE_Academia "}>
                <li><Link to={"/reporteGeneral"}>Reporte General</Link></li>
                <li><Link to={"/Cursos"}>Cursos</Link></li>
                <li><Link to={"/Ramos"}>Ramos</Link></li>
                <li><Link to={"/Relator"}>Relator</Link></li>
                <li><Link to={"/Clientes"}>Clientes</Link></li>
                <li><Link to={"/Administrador"}>Administrador</Link></li>
                <li><Link to={"/Prerequisitos"}>Prerequisitos</Link></li>
              </ul>
            </li>
            <li id="li_Asistencias" onClick={this.SwitchToggleAsistencias}>ASISTENCIAS
              <ul id="Asistencias" className={toggleAsistencias ? "active" : " Asistencias "} >
              <li><Link to={"/Asistencias"}>Listado de Asistencias</Link></li>
              </ul>
            </li>
            <li id="li_Colaboradores" onClick={this.SwitchToggleColaboradores}>COLABORADORES
                <ul id="Colaboradores" className={toggleColaboradores ? "active" : " Colaboradores "} >
                    <li><Link to={"/Colaboradores"}>Listado de Colaboradores</Link></li>
                    <li><Link to={"/InscripcionCurso"}>Inscribirse a un curso</Link></li>
                </ul>
            </li>
            <Link id="logout" to={"/login"}>Logout</Link>
          </ul>
        </section>       
        
      
      </div>);
      }else{
        return(
        <Redirect to={"/login"}></Redirect>
        
        );
      }
    }
}
 
export default Navigator;