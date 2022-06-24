import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

class EditColaboradores extends Component {
  constructor(props) {
    super(props);
    this.state = { loadedData: false, colaborador: [] };
  }

  componentDidMount() {
    fetch(
      "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-selectColaborador.php?idUsuario=" +
        this.props.match.params.idUsuario
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        this.setState({ loadedData: true, colaborador: dataResponse[0] });
      })
      .catch(console.log());
  }

  render() {
 const {loadedData, colaborador} = this.state;
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
                              <select className="form-control" name="idCuenta" onChange={this.cambioValor} value={colaborador.idCuenta} id="input_idCuenta_Colaborador">
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
                              className="form-control" name="nombre_completo" onChange={this.cambioValor} value={colaborador.nombre_completo} id="input_nombreCompleto" aria-describedby="helpId" placeholder=""/>
                              <br />

                              <label htmlFor="input_idUsuario">Escriba su idUsuario</label>
                              <input type="text"
                              className="form-control" name="idUsuario" onChange={this.cambioValor} value={colaborador.idUsuario} id="input_idUsuario" aria-describedby="helpId" placeholder=""/>

                              <br />

                              <label htmlFor="input_areaColaborador">Área al que pertenece:</label>
                            <input type="text"
                              className="form-control" name="area" value={colaborador.area} onChange={this.cambioValor} id="input_areaColaborador" aria-describedby="helpId" placeholder=""/>

                              <br />
                              <label htmlFor="input_subgerenciaColaborador">Subgerencia al que pertenece:</label>
                              <input type="text"
                              className="form-control" name="subgerencia" onChange={this.cambioValor} value={colaborador.subgerencia} id="input_subgerenciaColaborador" aria-describedby="helpId" placeholder=""/>

                              <br />
                              <label htmlFor="input_correoColaborador">Escriba su correo empresarial:</label>
                              <input type="text"
                              className="form-control" name="correo" onChange={this.cambioValor} value={colaborador.correo} id="input_correoColaborador" aria-describedby="helpId" placeholder=""/>
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

export default EditColaboradores;
