import "./category.css";
import DiscoverItem from "./discoverItem";

function Category(props){

    return(
        <div className="category">
            <div className="itemHolder">
                {
                    props.items.map((item, index)=> <DiscoverItem key={index} id={item.id} email={item.email} image={item.image} likedProds={props.likedProds} details={item.details} updateLiked={props.updateLiked}/> )
                }
            </div>
        </div>
    ) 
}

export default Category;    