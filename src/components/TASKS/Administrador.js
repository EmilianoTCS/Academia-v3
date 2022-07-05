import React, {Component} from "react";
import Header from "../templates/header";
import '../css/Administrador.css'
import ToggleSwitch from "../templates/ToggleSwitch";
class Administrador extends Component {
    state = {loadedData: false, cursos: [], isActive: true  } 

    loadData() {        
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
      
    componentDidMount(){
        this.loadData();
    }

    toggleisActive = (ID) => {
       fetch(
        "http://localhost/App_v2/AcademiaFormación_V2/TASKS/coe-updateState.php?updateState="+ID)
       .then((response) => response.json())
        .then((dataResponse) => {
          console.log(dataResponse);
          this.loadData();
        })
        .catch(console.log());
    }
    

    render() { 
        const {loadedData, cursos} = this.state;

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
                                                <th id="th_switch">Habilitar o Deshabilitar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cursos.map((curso) => (
                                                <tr key={curso.ID}>
                                                    <td>{curso.ID}</td>
                                                    <td>{curso.codigoCurso}</td>
                                                    <td>{curso.codigoRamo}</td>
                                                    <td onClick={() => this.toggleisActive(curso.ID)}><ToggleSwitch isActive={curso.isActive}/></td>
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