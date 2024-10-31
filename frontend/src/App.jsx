import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Portfolio from './portfolio';
import Home from './Home';
import Discover from './discover';
import Signup from './signup';
import Signin from './signin';
import Buy from './buy';
import Cart from './cart';
import Payment from './Payment';


function App() {

  let [loginInfo, setLoginInfo] = useState({loggedIn: false, email:"guest", id:"guestID"});
  let [buyItems, setBuyItems] = useState([]);
  let [portfolioEmail, setPortfolioEmail] = useState("");

  function getLoginInfo(email, id){
    setLoginInfo({loggedIn: true, email: email, id: id});
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home loginInfo={loginInfo}/>}></Route>
        <Route path='/signup' element={<Signup getLoginInfo = {getLoginInfo}/>}></Route>
        <Route path='/signin' element={<Signin getLoginInfo = {getLoginInfo}/>}></Route>
        <Route path={'/portfolio/:itemID'} element={<Portfolio loginInfo={loginInfo} setPortfolioEmail={setPortfolioEmail}/>}></Route>
        <Route path='/discover' element = {<Discover loginInfo={loginInfo}/>}></Route>
        <Route path="/buy" element = {<Buy loginInfo = {loginInfo} portfolioEmail={portfolioEmail}/>}></Route>
        <Route path='/cart' element = {<Cart loginInfo = {loginInfo} setBuyItems={setBuyItems}/>}></Route>
        <Route path="/cart/payment" element = {<Payment buyItems={buyItems}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
