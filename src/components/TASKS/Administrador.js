import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Administrador.css'
import ToggleSwitch from "../templates/ToggleSwitch";
class Administrador extends Component {
    state = {loadedData: false, cursos: [], isActive: true, ramos : [], relatores: [], colaboradores: [], clientes: [] } 

    loadDataCursos() {        
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-adminCursos.php?cursos"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, cursos: dataResponse });
            if(dataResponse.isActive === 0){
                this.setState({isActive : false})
            }   
          })
          .catch(console.log());
      }

       loadDataRamos() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-adminRamos.php?ramos"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, ramos: dataResponse });
          })
          .catch(console.log());
      }
      loadDataRelator() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-adminRelator.php?relator"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, relatores: dataResponse });
          })
          .catch(console.log());
      }

      loadDataColaborador() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-adminColaborador.php?colaborador"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, colaboradores: dataResponse });
          })
          .catch(console.log());
      }
      loadDataClientes() {
        fetch(
          "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-adminClientes.php?clientes"
        )
          .then((response) => response.json())
          .then((dataResponse) => {
            this.setState({ loadedData: true, clientes: dataResponse });
          })
          .catch(console.log());
      }
    componentDidMount(){
        this.loadDataCursos();
        this.loadDataRamos();
        this.loadDataRelator();
        this.loadDataColaborador();
        this.loadDataClientes();
    }

    toggleisActiveCursos = (ID) => {
       fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateState.php?updateStateCursos="+ID)
       .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          this.loadDataCursos();
        })
        .catch(console.log());
    }
    toggleisActiveRamos = (ID) => {
        fetch(
         "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateRamos.php?updateStateRamos="+ID)
        .then((response) => response.json())
         .then((dataResponse) => {
           console.log(dataResponse);
           this.loadDataRamos();
         })
         .catch(console.log());
     }  
     toggleisActiveRelator = (ID) => {
        fetch(
         "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateRelator.php?updateStateRelator="+ID)
        .then((response) => response.json())
         .then((dataResponse) => {
           console.log(dataResponse);
           this.loadDataRelator();
         })
         .catch(console.log());
     }
     toggleisActiveColaborador = (ID) => {
        fetch(
         "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateColaborador.php?updateStateColaborador="+ID)
        .then((response) => response.json())
         .then((dataResponse) => {
           console.log(dataResponse);
           this.loadDataColaborador();
         })
         .catch(console.log());
     }
     toggleisActiveClientes = (ID) => {
        fetch(
         "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateStateClientes.php?updateStateClientes="+ID)
        .then((response) => response.json())
         .then((dataResponse) => {
           console.log(dataResponse);
           this.loadDataClientes();
         })
         .catch(console.log());
     }
    render() { 
        const {loadedData, cursos, ramos, relatores, colaboradores, clientes} = this.state;

        if(!loadedData){
            return(
                <h1>Loading...</h1>
            );
        }
        return (
           <div>
            <Header />
                    <div className="container" id="container-curso">
                            <div className="card" >
                                    <div className="card-body">
                                    <h4 className="card-title">Cursos</h4>
                                    <table id="tabla-cursos" className="table table-striped table-inverse table-responsive">
                                        <thead className="thead-inverse">
                                            <tr>
                                                <th>ID</th>
                                                <th>Código Curso</th>
                                                <th>Código Ramo</th>
                                                <th>Fecha de modificación</th>
                                                <th id="th_switch">Habilitar o Deshabilitar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cursos.map((curso) => (
                                                <tr key={curso.ID}>
                                                    <td>{curso.ID}</td>
                                                    <td>{curso.codigoCurso}</td>
                                                    <td>{curso.codigoRamo}</td>
                                                    <td>{curso.date}</td>
                                                    <td onChange={() => this.toggleisActiveCursos(curso.ID)}><ToggleSwitch isActive={curso.isActive}/></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                               
                            <div className="card" >
                                    <div className="card-body">
                                    <h4 className="card-title">Ramos</h4>
                                    <table id="tabla-cursos" className="table table-striped table-inverse table-responsive">
                                        <thead className="thead-inverse">
                                            <tr>
                                                <th>ID</th>
                                                <th>Código Ramo</th>
                                                <th>Nombre del Ramo</th>
                                                <th>Fecha de modificación </th>
                                                <th id="th_switch">Habilitar o Deshabilitar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {ramos.map((ramo) => (
                                                <tr key={ramo.ID}>
                                                    <td>{ramo.ID}</td>
                                                    <td>{ramo.codigoRamo}</td>
                                                    <td>{ramo.nombreRamo}</td>
                                                    <td>{ramo.date}</td>
                                                    <td onChange={() => this.toggleisActiveRamos(ramo.ID)}><ToggleSwitch isActive={ramo.isActive}/></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                               
                            <div className="card" >
                                    <div className="card-body">
                                    <h4 className="card-title">Relatores</h4>
                                    <table id="tabla-cursos" className="table table-striped table-inverse table-responsive">
                                        <thead className="thead-inverse">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Área</th>
                                                <th>Fecha de modificación</th>
                                                <th id="th_switch">Habilitar o Deshabilitar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {relatores.map((relator) => (
                                                <tr key={relator.ID}>
                                                    <td>{relator.ID}</td>
                                                    <td>{relator.nombre}</td>
                                                    <td>{relator.area}</td>
                                                    <td>{relator.date}</td>
                                                    <td onChange={() => this.toggleisActiveRelator(relator.ID)}><ToggleSwitch isActive={relator.isActive}/></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card" >
                                    <div className="card-body">
                                    <h4 className="card-title">Colaboradores</h4>
                                    <table id="tabla-cursos" className="table table-striped table-inverse table-responsive">
                                        <thead className="thead-inverse">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Usuario</th>                                                
                                                <th>Área</th>                                                
                                                <th>Fecha de modificación</th>
                                                <th id="th_switch">Habilitar o Deshabilitar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {colaboradores.map((colaborador) => (
                                                <tr key={colaborador.ID}>
                                                    <td>{colaborador.ID}</td>
                                                    <td>{colaborador.nombre}</td>
                                                    <td>{colaborador.usuario}</td>
                                                    <td>{colaborador.area}</td>
                                                    <td>{colaborador.date}</td>
                                                    <td onChange={() => this.toggleisActiveColaborador(colaborador.ID)}><ToggleSwitch isActive={colaborador.isActive}/></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card" >
                                    <div className="card-body">
                                    <h4 className="card-title">Clientes</h4>
                                    <table id="tabla-cursos" className="table table-striped table-inverse table-responsive">
                                        <thead className="thead-inverse">
                                            <tr>
                                                <th>ID</th>
                                                <th>Tipo de cliente</th>
                                                <th>Nombre del cliente</th>                                                
                                                <th>Teléfono referente</th>                                                
                                                <th>Correo referente</th>
                                                <th>Fecha de modificación</th>
                                                <th id="th_switch">Habilitar o Deshabilitar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {clientes.map((cliente) => (
                                                <tr key={cliente.ID}>
                                                    <td>{cliente.ID}</td>
                                                    <td>{cliente.tipo_cliente}</td>
                                                    <td>{cliente.nombreCliente}</td>
                                                    <td>{cliente.telefonoReferente}</td>
                                                    <td>{cliente.correoReferente}</td>
                                                    <td>{cliente.date}</td>
                                                    <td onChange={() => this.toggleisActiveClientes(cliente.ID)}><ToggleSwitch isActive={cliente.isActive}/></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                               
                        </div>            
              </div>
        );
    }
}
 
export default Administrador;