import React, {Component} from "react";
import "../css/ToggleSwitch.css"


function SwitchToggle(props){
    var isChecked = false;

    if(props.isActive == 1){
       isChecked = true;
    }
    
    return(
        <div >
            <label className="switch">
            <input type="checkbox" defaultChecked={isChecked} />
            <span className="slider round"></span>
            </label> 
        </div>
    );
} 
 
export default SwitchToggle;