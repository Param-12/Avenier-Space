import React from "react";
import "./prodImages.css";

function ProdImages(props){
    return(
        <div className="images">
            <h3>Images</h3>
            <div className="imageContainer">
                {props.images && props.images.map((image, index)=><img src={image} key={index} alt="abc"></img>)}
            </div>
        </div>
    )
}

export default ProdImages;