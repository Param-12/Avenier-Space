import React from "react";
import "./prodVideo.css"

function ProdVideo(props){

    return (
        <div className="videos">
            <h3>Videos</h3>
            <video controls preload="auto">
                {props.video && <source src={props.video} type="video/mp4"></source>}
            </video>
            {/* <iframe title="example" src="https://www.youtube.com/embed/CrymicX875M" frameborder="0"></iframe> */}
        </div>
        
    )
}

export default ProdVideo;