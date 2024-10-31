import React, {useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import Header from "./header.jsx"
import Footer from "./footer.jsx"
import ProdDetails from "./prodDetails.jsx";
import ProdImages from "./prodImages.jsx";
import ProdVideo from "./prodVideo.jsx";
import "./portfolio.css";


function Portfolio(props){

    let {itemID} = useParams();

    console.log(itemID);

    let [edit, setEdit] = useState(false);
    let [info, setInfo] = useState("");
    let [newAbout, setNewAbout] = useState(info.about);
    let [newDetails, setNewDetails] = useState(info.details);
    let [newImage, setNewImage] = useState("");
    let [newVideo, setNewVideo] = useState("");
    let [newLinks, setNewLinks] = useState(info.links);

    function getNewVideo(e){
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = ()=>{
            setNewVideo(reader.result);
        }
    }

    function getNewImage(e){
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = ()=>{
            setNewImage(reader.result);
        }
    }

    function changeDetails(e){
        setNewDetails(e.target.value);
    }

    useEffect(()=>{
        fetch('/initPortfolio',{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({_id: itemID})
        }).then((response)=> response.json()).then((data)=>{
            if(data.exist){
                setInfo(data);
                setNewAbout(data.about);
                setNewLinks(data.links);
                setNewDetails(data.details);
            }else{
                setNewLinks({});
                setNewAbout("");
                setNewDetails("");
            }
            props.setPortfolioEmail(data.email);
        });
    }, [itemID,props]);

    function changeMode(){
        if(edit) setEdit(false);
        else setEdit(true);
    }

    function handleDone(e){
        e.preventDefault();
        
        fetch('/portfolio',{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email, newAbout:newAbout, details: newDetails, newImageLink: newImage, newVideoLink: newVideo, newLinks: newLinks})
        });

        setTimeout(()=>window.location.reload(),600);

    }

    if(edit) document.querySelector("body").style.overflow = "hidden";

    function changeAbout(e){
        setNewAbout(e.target.value);
    }

    function changeYoutubeLink(e){
        setNewLinks((prev)=>({youtube: e.target.value, X: prev.X, instagram: prev.instagram}));
    }

    function changeXLink(e){
        setNewLinks((prev)=>({youtube: prev.youtube, X: e.target.value, instagram: prev.instagram}));
    }

    function changeinstagramLink(e){
        setNewLinks((prev)=>({youtube: prev.youtube, X: prev.X, instagram: e.target.value}));
    }

    function handleAdd(e){
        
        fetch('/addPortfolio',{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email, about: newAbout, details: newDetails, images: newImage, video: newVideo, links: newLinks})
        });

        setTimeout(()=>window.location.reload(),600);
    }
    
    if (props.loginInfo.loggedIn && info.exist){
        return <div>
            <Header loginInfo={props.loginInfo}></Header>
            {info.email === props.loginInfo.email && <button className="edit" onClick={changeMode}>EDIT</button>}
            <div className="about">
                <h4 className="heading">About</h4>
                <p>{info.about}</p>
            </div>
            <div className="products">
                <ProdDetails details={info.details}></ProdDetails>
                <ProdImages images={info.images}></ProdImages>
                <ProdVideo video={info.video}></ProdVideo>
                <div className="bottom">
                    <Link to="/buy">Buy</Link>
                    <a href="protfolio/support">Support</a>
                </div>
                {info.links &&
                <div className="links">
                    {info.links.youtube && <a href={info.links.youtube}>YouTube</a>}
                    {info.links.X && <a href={info.links.X}>X</a>}
                    {info.links.instagram && <a href={info.links.instagram}>Instagram</a>}
                </div>}
            </div>
            {edit && 
            <div className="blurBackground">
                <button onClick={handleDone}>DONE</button>
                <div className="editPane"> 
                    <div className="newAbout">
                        <label htmlFor="aboutInput">About : </label>
                        <input type="text" id="aboutInput" value={newAbout} onChange={changeAbout}/>
                    </div>
                    <div className="newDetails">
                        <label htmlFor="detailsInput">Details : </label>
                        <textarea name="" id="detailsInput" value={newDetails} onChange={changeDetails}></textarea>
                    </div>
                    <div className="newImages">
                        <label htmlFor="imagesInput">Images : </label>
                        <input type="file" name="" id="imagesInput" onChange={getNewImage}/>
                    </div>
                    <div className="newVideo">
                        <label htmlFor="videoInput">Video : </label>
                        <input type="file" id="videoInput" onChange={getNewVideo} />
                    </div>
                    <div className="newLinks">
                        <label>Socials : </label>
                        <div className="inputLinks">
                            <input type="url" placeholder="YouTube" id="youtubeInput" value={newLinks.youtube} onChange={changeYoutubeLink}/>
                            <input type="url" placeholder="X" id="XInput" value={newLinks.X} onChange={changeXLink}/>
                            <input type="url" placeholder="Instagram" id="instagramInput" value={newLinks.instagram} onChange={changeinstagramLink}/>
                        </div>
                    </div>
                </div>   
            </div>}
            <Footer></Footer>
        </div>
    }else if(!props.loginInfo.loggedIn){
        return <h1>You are not logged In</h1>
    }else{
        return<div>
            <h1>CREATE YOUR OWN PORTFOLIO</h1>
            <button onClick={changeMode}>EDIT</button>
            {edit && 
            <div className="blurBackground">
                <button onClick={handleAdd}>ADD</button>
                <div className="editPane"> 
                    <div className="newAbout">
                        <label htmlFor="aboutInput">About : </label>
                        <input type="text" id="aboutInput" value={newAbout} onChange={changeAbout}/>
                    </div>
                    <div className="newDetails">
                        <label htmlFor="detailsInput">Details : </label>
                        <textarea name="" id="detailsInput" value={newDetails} onChange={changeDetails}></textarea>
                    </div>
                    <div className="newImages">
                        <label htmlFor="imagesInput">Images : </label>
                        <input type="file" name="" id="imagesInput" onChange={getNewImage}/>
                    </div>
                    <div className="newVideo">
                        <label htmlFor="videoInput">Video : </label>
                        <input type="file" id="videoInput" onChange={getNewVideo} />
                    </div>
                    <div className="newLinks">
                        <label>Socials : </label>
                        <div className="inputLinks">
                            <input type="url" placeholder="YouTube" id="youtubeInput" onChange={changeYoutubeLink}/>
                            <input type="url" placeholder="X" id="XInput" onChange={changeXLink}/>
                            <input type="url" placeholder="Instagram" id="instagramInput" onChange={changeinstagramLink}/>
                        </div>
                    </div>
                </div>   
            </div>}
        </div>
    }
}

export default Portfolio