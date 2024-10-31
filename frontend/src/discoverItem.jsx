import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./discoverItem.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function DiscoverItem(props){

    let navigate = useNavigate();

    let [likedProds, setLikedProds] = useState(props.likedProds);
    // eslint-disable-next-line
    let [liked, setLiked] = useState(likedProds[props.id]);
    let [showInfo, setShowInfo] = useState(false);

    function changeLiked(){
        if(likedProds[props.id]){
            setLiked(false);
            let newLiked = likedProds;
            delete newLiked[props.id];
            setLikedProds(newLiked);
            props.updateLiked(newLiked);
        }else{
            setLiked(true);
            let newLiked = likedProds;
            newLiked[props.id] = 1;
            setLikedProds(newLiked);
            props.updateLiked(newLiked);
        }
    }

    function changeShowInfo(){
        if(showInfo){
            setShowInfo(false);
        }else{
            setShowInfo(true);
        }
    }

    function itemClick(){
        navigate("/portfolio/"+props.id);
    }

    return(
        <div className="item">
            <img src={props.image} alt="" onClick={itemClick}/>
            {/* <div className="name">
                <p>Name</p>
                <p>Creator</p>
            </div> */}
            {showInfo && <div className="infoSlider">
                <p>{props.details}</p>
            </div>}
            <div className="imageFooter">
                {likedProds[props.id]?<FavoriteIcon className = "like" onClick = {changeLiked}/>:<FavoriteBorderIcon  onClick={changeLiked}/>}
                <ShareRoundedIcon/>
                <InfoOutlinedIcon onClick={changeShowInfo} />
            </div>
        </div>
    )
}

export default DiscoverItem;