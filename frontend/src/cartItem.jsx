import DeleteIcon from '@mui/icons-material/Delete';
import "./cartItem.css";
import { useEffect, useState } from 'react';

function CartItem(props){

    let [selected, setSelected] = useState(true);

    useEffect(()=>{
        let buyingItem = {_id: props.cartItem.productDetails._id, name: props.cartItem.productDetails.name, price: props.cartItem.productDetails.price, qty: props.cartItem.qty};
        if(selected) props.setBuyingItems((prev)=>([...prev,buyingItem]));
        else props.setBuyingItems(prev => {
            let newItems = prev.filter((item)=>item._id !== props.cartItem.productDetails._id);
            return newItems;
        });
        //eslint-disable-next-line
    },[selected, props.cartItem]);

    function deleteCartItem(){
        fetch("/deleteCartItem",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email, itemId: props.cartItem.productDetails._id})
        }).then(response=>response.json()).then(data=>{
            console.log("updated");
            props.triggerCartUpdate();
        });
    }

    function changeState(){
        setSelected(prev=> !prev);
    }

    return(
        <div>
        <div className="cartItemContainer">
            <div className="cartLeft">
                <input type="checkbox" onChange={changeState} checked={selected}/>
                <img src={props.cartItem.productDetails.image} alt="" />
            </div>
            <div className="cartCenter">
                <h4>{props.cartItem.productDetails.name}</h4>
                <p>{props.cartItem.productDetails.description}</p>
                <p>Quantity : {props.cartItem.qty}</p>
                {<DeleteIcon onClick={deleteCartItem}/>}
            </div>
            <div className="cartRight">
                <p>Price : ${props.cartItem.productDetails.price}</p>
            </div>
        </div>
        <hr />
        </div>
    )
}

export default CartItem;