import React, {Component} from "react";
import Header from "../templates/header";
import BuildingIMG from "../img/Recurso-3.png"
class ListadoAsistencias extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                 <Header />
                 <div style={{position: "absolute", display: "flex", justifyContent: "row", transform: "translate(-50%, -50%)", top : "50%", left: "50%" }}>
                 <img src={BuildingIMG} style={{width: "400px"}}></img>
                    <p style={{fontFamily: "Roboto Slab, serif", fontWeight: 700, fontSize: "20pt", textAlign: "center", marginLeft: "2%", marginTop: "15%", color: "#e10b1c"}}>
                        Proximamente...
                        <p>Sitio en construcción</p>
                    </p>
                 </div>
            </div>
        );
    }
}
 
export default ListadoAsistencias;