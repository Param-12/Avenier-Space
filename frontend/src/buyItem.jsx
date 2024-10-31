import { useState } from "react";
import "./buyItem.css";
import EditBuy from "./editBuy";

function BuyItem(props){
    
    let [counter, setCounter] = useState(0);
    let [edit, setEdit] = useState(false);

    function incCounter(){
        setCounter((prev)=>{
            let cartItem = {};
            cartItem[props.item._id] = prev+1;
            props.updateCartItems(cartItem);
            return prev+1;
        });
    }

    function decCounter(){
        if(counter>0) setCounter((prev)=>{
            let cartItem = {};
            cartItem[props.item._id] = prev-1;
            props.updateCartItems(cartItem);
            return prev-1;
        });
    }

    function handleEdit(){
        setEdit(true);
    }

    function handleUpdate(updatedInfo){
        
        fetch("/buy/updateProduct",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email, ...updatedInfo})
        }).then(response=>response.json()).then(data=>{
            console.log("data:"+data.updated);
            props.triggerUpdate();
            setEdit(false);
        });
    }

    function cancel(){
        setEdit(false);
    }

    return(
        <div className="itemContainer">
            <div className="leftPart">
                <img src={props.item.image} alt="" />
                <p>{props.item.name}</p>
                <button onClick={incCounter}>+</button>
                <p className="counter">{counter}</p>
                <button onClick={decCounter}>-</button>
            </div>
            <div className="rightPart">
                <p>{props.item.description}</p>
                <p>Price : ${props.item.price}</p>
                <p>Stock : {props.item.stock}</p>
                {props.loginInfo.email === props.portfolioEmail && <button onClick={handleEdit}>Edit</button>}
            </div>



            {edit && <EditBuy addProduct = {handleUpdate} itemInfo = {props.item} cancel = {cancel}/>}
        </div>
    )
}

export default BuyItem;
