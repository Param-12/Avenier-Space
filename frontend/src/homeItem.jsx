import "./homeItem.css";


function HomeItem(props){
    return(
        <div className="homeItem">
            <div className="homeItemImage">
                <img src={props.image} alt="" />
            </div>
            <div className="homeItemDetails">
                <p>{props.details}</p>
            </div>
        </div>
    )
}

export default HomeItem;