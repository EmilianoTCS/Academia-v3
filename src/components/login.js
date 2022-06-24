import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './css/Login.css'
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      Usuario:"",
      password:"",
      isLogged: false   
    };
  }

  
  sendData = (e) =>{
    e.preventDefault();
    console.log("Sending data..");
    const{Usuario, password} = this.state;
    var datosEnviar = {Usuario: Usuario, password: password}
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/login.php?login",{
        method: "POST",
        body: JSON.stringify(datosEnviar)
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.props.acceder(dataResponse)
      })
      .catch(console.log());
  }

cambioValor = (e) =>{
  const state = this.state;
  state[e.target.name] = e.target.value;
  this.setState({state});
}


 render() {
    const{Usuario, password, isLogged} = this.state
    if(!isLogged){
    return (
        <div className="container">
         <div id="background">
                    <form id="form_login" onSubmit={this.sendData}>
                        <h3>Login</h3>
                        <div>
                            <h4 htmlFor="input_Usuario">Usuario:</h4>
                            <input type="text" name="Usuario" id="input_Usuario" onChange={this.cambioValor} value={Usuario} placeholder="Usuario"/>
                        </div>
                        <div>
                             <h4 htmlFor="input_Usuario">Contraseña:</h4>
                             <input type="password" name="password" id="input_password" onChange={this.cambioValor} value={password} placeholder="Contraseña"/>
                        </div>
                        <div>
                            <button type="submit" id="btn_acceder" className="btn btn-primary">Acceder</button>
                            <a id="forgot_password" className="small" href="password.html">Olvidaste la contraseña?</a>
                        </div>
                 </form>
            </div>
        </div>
         
    );
    }else{
        return(
            <Redirect to={"/"}></Redirect>
        )
    }
  }
}

export default Login;
