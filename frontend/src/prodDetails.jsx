import React from "react";
import "./prodDetails.css"

function ProdDetails(props){

    return <div className="details">
        <h3>Details</h3>
        <p>{props.details}</p>
</div>
}

export default ProdDetails;