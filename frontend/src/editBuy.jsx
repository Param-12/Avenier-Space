import { useState } from "react";
import "./editBuy.css";

function EditBuy(props){

    let [itemInfo, setItemInfo] = useState(props.itemInfo);

    function getName(e){
        setItemInfo((prev)=>({...prev, name:e.target.value}))
    }

    function getDescription(e){
        setItemInfo(prev=>({...prev, description: e.target.value}));
    }

    function getImage(e){
        const reader = new FileReader();
        
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = ()=>setItemInfo(prev=>({...prev, image: reader.result}));
    }

    function getPrice(e){
        setItemInfo(prev=>({...prev, price: e.target.value}));
    }

    function handleUpdate(){
        props.addProduct(itemInfo);
    }

    

    return(
        <div className="updateBackground">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={props.cancel}>Cancel</button>
            <div className="updatePane">
                <div className="updateLabels">
                    <label htmlFor="updateProductName">Name: </label>
                    <label htmlFor="updateProductDescription">Description: </label>
                    <label htmlFor="updateProductImage">Image: </label>
                    <label htmlFor="updateProductPrice">Price:</label>
                </div>
                <div className="updateInputs">
                    <input type="text" id="updateProductName" value={itemInfo.name} onChange={getName}/>
                    <input type="text" id="updateProductDescription" value={itemInfo.description} onChange={getDescription}/>
                    <input type="file" id="updateProductImage" onChange={getImage}/>
                    <input type="text" id="updateProductPrice" value={itemInfo.price} onChange={getPrice}/>
                </div>
            </div>
        </div>
    )
}

export default EditBuy;
