import React, { Component } from 'react';
import {TbCertificate} from "react-icons/tb";
import '../css/Certificados.css'
class Certificados extends Component {
    state = {  } 
    render() { 

        
        return (
            <div>
                <div className="card text-white bg-light-gray w-50 shadow-none border-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="card">
                          <div id="CardContainer" className="card-body" style={{alignItems: "center", textAlign: "center", cursor: "pointer"}}>
                            <TbCertificate  style={{color: "#e10b1c", fontSize: "25pt"}}/>
                            <h1 id='styleText'>Certificados</h1>
                            <h1 id='styleSubText'>Puedes ver y descargar tus certificados</h1>
                          </div>
                        </div>
                      </div>
                      <div  className="col-sm-6">
                        <div className="card">
                          <div id="CardContainer" className="card-body" style={{alignItems: "center", textAlign: "center", cursor: "pointer"}}>
                            <TbCertificate  style={{color: "#e10b1c", fontSize: "25pt"}}/>
                            <h1 id='styleText'>Diplomas</h1>
                            <h1 id='styleSubText'>Puedes ver y descargar tus diplomas</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
 
export default Certificados;