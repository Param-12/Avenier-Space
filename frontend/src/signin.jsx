import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

function Signin(props){

    const navigate = useNavigate();

    let [details, setDetails] = useState({email:null, password: null});
    let [incorrect, setIncorrect] = useState(false);


    function getEmail(e){
        setDetails((prev)=>({email: e.target.value, password: prev.password}));
        setIncorrect(false);
    }

    function getPassword(e){
        setDetails((prev)=>({email: prev.email, password: e.target.value}));
        setIncorrect(false);
    }

    function handleClick(){
        if(details.email === null){
            setDetails((prev)=>({email: "", password:prev.password}));
        }else if(details.password === null){
            setDetails((prev)=>({email: prev.email, password: ""}));
        }else if(details.email === "" || details.password === ""){
            console.log("do nothing");
        }else{
            fetch("/signin",{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(details)
            }).then((response)=>response.json()).then((data)=>{
                setIncorrect(data.incorrect);
                if(!data.incorrect){
                    props.getLoginInfo(details.email, data.id);
                    navigate("/");
                };
            });
        }
    }

    return(
        <div>
            <div className='headingContainer'>
                <h1>STAXK</h1>
            </div>
            <div className="signinForm">
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" onChange={getEmail}/>
                {details.email === "" && <p style={{color:"red"}}>field can't be empty</p>}
                <input type="password" placeholder="Password" onChange={getPassword}/>
                {details.password === "" && <p style={{color:"red"}}>field can't be empty</p>}
                {incorrect && <p style={{color:"red"}}>Incorrect email or password</p>}
                <button onClick={handleClick} className="button-17">Login</button>
            </div>
        </div>
    )
}

export default Signin;