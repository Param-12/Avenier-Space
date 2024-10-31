import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import CartItem from "./cartItem";
import "./cart.css";

function Cart(props){

    const navigate = useNavigate();

    let [cartList, setCartList] = useState([]);
    let [updateCart, setUpdateCart] = useState(false);
    let [buyingItems, setBuyingItems] = useState([]);

    useEffect(()=>{
        fetch("/cart",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email})
        }).then((response)=>response.json()).then(data=>setCartList(data.cartList));
    },[props.loginInfo, updateCart]);

    function triggerCartUpdate(){
        setUpdateCart(prev=>!prev);
    }

    function proceedToPay(){

        props.setBuyItems(buyingItems);

        navigate("payment");
    }
    
    console.log(cartList);

    return(
        <div className="cart">
            <Header loginInfo={props.loginInfo}></Header>
            {cartList.map((cartItem, index)=><CartItem key={index} cartItem={cartItem} loginInfo={props.loginInfo} triggerCartUpdate={triggerCartUpdate} setBuyingItems={setBuyingItems}/>)}
            <button className="proceedButton" onClick={proceedToPay}>Proceed to Pay</button>
        </div>
    )
}

export default Cart;