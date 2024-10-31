import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

function Signup(props){

    const navigate = useNavigate();

    let [details, setDetails] = useState({name: null,email:null, password:null});
    let [ConfirmPassword, setConfirmPassword] = useState(null);
    let [diffPass, setDiffPass] = useState(false);
    let [emailExist, setEmailExist] = useState(false);
    // eslint-disable-next-line
    let [nameExist, setNameExist] = useState(true);

    function getName(e){
        setDetails((prev)=>({name: e.target.value, email: prev.email, password: prev.password}));
        setNameExist(true);
    }

    function getEmail(e){
        setDetails((prev)=>{
            return {name: prev.name, email: e.target.value, password: prev.password}
        });
        setEmailExist(false);
    }

    function getPassword(e){
        setDetails((prev)=>({name: prev.name, email: prev.email, password: e.target.value}));
        setDiffPass(false);
    }

    function getConfirmPassword(e){
        setConfirmPassword(e.target.value);
        setDiffPass(false);
    }

    function handleClick(e){
        if(details.name === null){
            setDetails((prev)=>({name: "", email:prev.email, password: prev.password}))
        }
        else if(details.email === null){
            setDetails((prev)=>({name: prev.name, email:"", password: prev.password}))
        }else if(details.password === null){
            setDetails((prev)=>({name: prev.name, email:prev.email, password: ""}))
        }
        else if(ConfirmPassword !== details.password){
            setDiffPass(true);
        }else if(details.name.trim() === ""){
            setNameExist(false);
        }
        else{
            fetch('/signup',{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(details)
            }).then((response)=>response.json().then((data)=>{
                setEmailExist(data.exist);
                if (!data.exist){
                    props.getLoginInfo(details.email, data.id);
                    navigate("/");
                };
            }));
        }
    }

    return(
        <div>
            <div className='headingContainer'>
                <h1>STAXK</h1>
            </div>
            <div className="signupForm">
                <h1>Signup</h1>
                <input type="text" placeholder="Name" onChange={getName}/>
                {details.name === "" && <p style={{color:"red"}}>field can't be empty</p>}
                <input type="email" placeholder="Email" onChange={getEmail}/>
                {details.email === "" && <p style={{color:"red"}}>Email can't be empty</p>}
                {emailExist && <p style={{color: "red"}}>Email already in use</p>}
                <input type="password" placeholder="Password" onChange={getPassword}/>
                {details.password === "" && <p style={{color:"red"}}>Password can't be empty</p>}
                <input type="password" placeholder="Confirm Password" onChange={getConfirmPassword}/>
                {ConfirmPassword === "" && <p style={{color:"red"}}>Password can't be empty</p>}
                {diffPass && <p style={{color: "red"}}>Mismatch Passwords</p>}
                <button onClick={handleClick} className="button-17">Signup</button>
            </div>
        </div>
    )
}

export default Signup;
