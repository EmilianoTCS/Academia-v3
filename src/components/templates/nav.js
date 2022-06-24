import React, {Component} from "react";
import user_logo from '../img/User_logo.png';
import "../css/sidebar.css";
import {BsListNested} from "react-icons/bs";
import {Link, Redirect } from "react-router-dom";



class Navigator extends Component {
  constructor(props){
    super(props);
    this.state = { toggleSidebar: false, toggleAcademia : false, isLogged: true } 
    
  };



  userName = this.props.userName;
    SwitchToggleSidebar = () =>{
        this.setState({toggleSidebar: !this.state.toggleSidebar})
    }
    SwitchToggleAcademia = () =>{
        this.setState({toggleAcademia: !this.state.toggleAcademia})

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
        const toggleSidebar = this.state.toggleSidebar;
        const toggleAcademia = this.state.toggleAcademia;
        const isLogged = this.state.isLogged;

        if(isLogged){
        return (
        <div className="container">
        <section id="sidebar" className={toggleSidebar ? "active" : "sidebar"}>
          <ul>
            <li><img id="User_logo" src={user_logo} alt="User Logo"/></li>
            <h4>{this.userName}</h4>
            <li><a href="index.php">Home</a></li>
      
            <li id="li_Academia" onClick={this.SwitchToggleAcademia} >COE - ACADEMIA
              <ul id="COE_Academia" className={toggleAcademia ? "active" : " COE_Academia "}>
                <li><Link to={"/reporteGeneral"}>Reporte General</Link></li>
                <li><Link to={"/Cursos"}>Cursos</Link></li>
                <li><Link to={"/Ramos"}>Ramos</Link></li>
                <li><Link to={"/Relator"}>Relator</Link></li>
              </ul>
            </li>
            <li>CAPITAL HUMANO</li>
            <li>COLABORADORES</li>
            <Link id="logout" to={"/login"}>Logout</Link>
          </ul>
        </section>
        <button id="toggle-btn" onClick={this.SwitchToggleSidebar}>
          <span><BsListNested/></span>
        </button>        
        
      
      </div>);}else{
        return(
        <Redirect to={"/login"}></Redirect>
        
        );
      }
    }
}
 
export default Navigator;