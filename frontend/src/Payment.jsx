import GooglePay from "./googlePay";
import PaymentItem from "./paymentItem";


function Payment(props){

    return(
        <div>
            <h1>Payment Page</h1>
            <div className="paymentItemAttributes">
                <h2>Name of Product</h2>
                <h2>Quantity</h2>
                <h2>Price</h2>
                <h2>Total Price</h2>
            </div>
            {props.buyItems.map((item, index)=><PaymentItem key={index} item = {item}/>)}
            <GooglePay/>
        </div>
    )
}

export default Payment;