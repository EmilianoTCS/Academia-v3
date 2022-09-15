import React, {Component} from "react";
import Navigator from "./nav";
import tsoft_logo from '../img/LOGO-Tsoft-Alpha-FullColor.png'
import logoCoe from "../img/logo coe.png";
import {Link } from "react-router-dom";
import "../css/Header.css"
import {BsListNested} from "react-icons/bs";

class Header extends Component {
    state = { isActive: false  } 

    SwitchToggleSidebar = () =>{
        this.setState({isActive: !this.state.isActive})
    }

    render() { 
        const isActive = this.state.isActive
        return (
        <div className="container-fluid">
            <div id="header" className="container">
                <header>
                    <Link to={"/home"}><img src={tsoft_logo} alt="Logo tsoft" id="logoTsoft" /></Link>
                    <button id="toggle-btn" onClick={this.SwitchToggleSidebar}><span><BsListNested/></span></button> 
                    <h3 id="titulo_pagina" className="text">ACADEMIA DE FORMACIÓN TSOFT</h3>
                    <img style={{width: "150px", marginLeft: "5%", marginTop: "1%"}} src={logoCoe} alt="logoCoe"></img>
                </header>
                <Navigator isActive={isActive}/>
            </div>
        </div>
        );
    }
}
 
export default Header;