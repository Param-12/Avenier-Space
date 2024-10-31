import "./paymentItem.css";

function PaymentItem(props){
    return(
        <div>
            <div className="paymentItemContainer">
                <h4>{props.item.name}</h4>
                <h4>{props.item.qty}</h4>
                <h4>{props.item.price}</h4>
                <h4>{props.item.price * props.item.qty}</h4>
            </div>
            <hr />
        </div>
    )
}

export default PaymentItem;