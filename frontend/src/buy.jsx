import { useEffect, useState } from "react";
import Header from "./header.jsx";
import BuyItem from "./buyItem.jsx";
import "./buy.css";
import EditBuy from "./editBuy.jsx";

function Buy(props){

    let [edit, setEdit] = useState(false);
    let [buyItems, setBuyItems] = useState([]);
    let [update, setUpdate] = useState(false);
    let [toCart, setToCart] = useState({});


    useEffect(()=>{
        fetch("/buy/getProducts",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.portfolioEmail})
        }).then((response)=>response.json()).then(data=>setBuyItems(data.buyItems));
    },[edit, props.loginInfo, update, props.portfolioEmail]);

    function changeEdit(){
        setEdit(true);
    }

    function cancel(){
        setEdit(false);
    }

    function addProduct(itemInfo){

        fetch("/buy/addProduct",{
            method: "POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({...itemInfo, email: props.loginInfo.email})
        });

        setEdit(false);
    }

    function triggerUpdate(){
        setUpdate(prev=>!prev);
    }


    function updateCartItems(newItem){
        setToCart(prev=>({...prev, ...newItem}));
    }

    function addToCart(){
        fetch("/addToCart",{
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email, toCart: toCart})
        });
    }

    return(
        <div className="buy">
            <h1>Buy Page</h1>
            <Header loginInfo={props.loginInfo}></Header>
            {buyItems.map((item,index)=><BuyItem key={index} item={item} loginInfo={props.loginInfo} triggerUpdate={triggerUpdate} updateCartItems={updateCartItems} portfolioEmail={props.portfolioEmail}/>)}
            <button className="addToCart" onClick={addToCart}>Add To Cart</button>
            {props.portfolioEmail === props.loginInfo.email && <button className="edit" onClick={changeEdit}>Add Product</button>}
            

            {edit && <EditBuy addProduct = {addProduct} cancel = {cancel} itemInfo={{}}/>}
        </div>
    )
}

export default Buy;