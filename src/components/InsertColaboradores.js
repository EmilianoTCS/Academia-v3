import React, { Component } from "react";
import { Link } from "react-router-dom";

class InsertColaborador extends Component {
  constructor(props){
    super(props);
    this.state = {
      idCuenta:"",
      nombre_completo:"",
      idUsuario:"",
      area:"",
      subgerencia:"",
      correo:""      
    };
  }
  sendData = (e) =>{
    e.preventDefault();
    console.log("Sending data..");
    const{idCuenta, nombre_completo, idUsuario, area, subgerencia, correo} = this.state;
    
    var datosEnviar = {idCuenta: idCuenta, nombre_completo: nombre_completo, idUsuario:idUsuario, area:area, subgerencia:subgerencia, correo: correo}
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-insertarColaborador.php?insertarColaborador",{
        method: "POST",
        body: JSON.stringify(datosEnviar)
      }
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        console.log(dataResponse);
      })
      .catch(console.log());
  }

cambioValor = (e) =>{
  const state = this.state;
  state[e.target.name] = e.target.value;
  this.setState({state});
}


 render() {
    const{idCuenta, nombre_completo, idUsuario, area, subgerencia, correo} = this.state;
    
    return (
      <div>
        <div className="card w-50 p-3">
          <div className="card-header">
            <h4>Insertar nuevo colaborador</h4>
              </div>
                  <div className="card-body">
                      <form onSubmit={this.sendData}>
                          <div className="form-group">
                              <label htmlFor="input_idCuenta_Colaborador">Seleccione su cuenta</label>
                              <select className="form-control" name="idCuenta" onChange={this.cambioValor} value={idCuenta} id="input_idCuenta_Colaborador">
                                <option>Elige una opción</option>
                                <option value={"fondo_esperanza"}>Fondo Esperanza</option>
                                <option value={"BCI"}>BCI</option>
                                <option>Transbank</option>
                                <option>Bantotal</option>
                              </select>
                              <small id="helpId" className="form-text text-muted">Cuenta a la que perteneces</small><label htmlFor="input_idCuenta_Colaborador"></label>

                              <br />
                              <br />
                            
                              <label htmlFor="input_nombreCompleto">Nombre Completo:</label>
                              <input type="text"
                              className="form-control" name="nombre_completo" onChange={this.cambioValor} value={nombre_completo} id="input_nombreCompleto" aria-describedby="helpId" placeholder=""/>
                              <br />

                              <label htmlFor="input_idUsuario">Escriba su idUsuario</label>
                              <input type="text"
                              className="form-control" name="idUsuario" onChange={this.cambioValor} value={idUsuario} id="input_idUsuario" aria-describedby="helpId" placeholder=""/>

                              <br />

                              <label htmlFor="input_areaColaborador">Área al que pertenece:</label>
                            <input type="text"
                              className="form-control" name="area" value={area} onChange={this.cambioValor} id="input_areaColaborador" aria-describedby="helpId" placeholder=""/>

                              <br />
                              <label htmlFor="input_subgerenciaColaborador">Subgerencia al que pertenece:</label>
                              <input type="text"
                              className="form-control" name="subgerencia" onChange={this.cambioValor} value={subgerencia} id="input_subgerenciaColaborador" aria-describedby="helpId" placeholder=""/>

                              <br />
                              <label htmlFor="input_correoColaborador">Escriba su correo empresarial:</label>
                              <input type="text"
                              className="form-control" name="correo" onChange={this.cambioValor} value={correo} id="input_correoColaborador" aria-describedby="helpId" placeholder=""/>
                              <br />
                              <button type="submit" className="btn btn-primary">Submit</button>
                              <Link className="btn btn-danger m-3" to={"/"}>Cancelar</Link>
                          </div>
                      </form>
                  </div>
              </div>
      </div>
    );
  }
}

export default InsertColaborador;
