import React, {Component} from "react";
import Navigator from "./nav";
import tsoft_logo from '../img/LOGO-Tsoft-Alpha-FullColor.png'
import {Link } from "react-router-dom";
import "../css/Header.css"

class Header extends Component {
    state = {  } 
    render() { 
        return (
        <div>
            <div id="header" className="container">
                <header>
                    <Link to={"/home"}><img src={tsoft_logo} alt="Logo tsoft" id="logoTsoft" /></Link>
                    <h3 id="titulo_pagina" className="text">ACADEMIA DE FORMACIÓN TSOFT</h3>
                </header>
                <Navigator/>
            </div>
        </div>
        );
    }
}
 
export default Header;