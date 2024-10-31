import { useEffect, useState } from "react";
import Header from "./header";
import "./home.css";
import HomeItem from "./homeItem";


function Home(props){

    let [newProds, setNewProds] = useState([]);
    let [trending, setTrending] = useState([]);

    useEffect(()=>{
        fetch("/home").then(response=>response.json()).then(data=>{
            setNewProds(data.newProds);
            setTrending(data.trending);
        });
    },[]);


    return(
        <div>
            <Header loginInfo = {props.loginInfo}></Header>
            <div className="aboutWebsite">
                <h1>Discover New Ideas, Support Bold Startups</h1>
                <h3>Explore a curated selection of innovative products from emerging brands. Find, like, and buy unique creations, and be part of their journey.</h3>
            </div>
            <div className="howItWorks">
                <div>
                    <h4>Discover Unique Products</h4>
                    <p>Browse a range of unique and creative products you won’t find elsewhere.</p>
                </div>
                <div>
                    <h4>Engage & Support</h4>
                    <p>Like and share products that inspire you, and connect with the creators behind the ideas.</p>
                </div>
                <div>
                    <h4>Shop with Confidence</h4>
                    <p>Purchase directly from startups, knowing you're supporting entrepreneurs at the ground level.</p>
                </div>
            </div>
            <div className="new">
                <div className="newItemContainer">   
                    {newProds.map((item, index)=><HomeItem key={index} image = {item.image} details = {item.details}/>)}
                </div>
            </div>
            <div className="trending">
                <div className="trendingItemContainer">
                    {trending.map((item, index)=><HomeItem key={index} image = {item.image} details = {item.details}/>)}
                </div>
            </div>
            <div className="listYourOwn">
                <h2>Bring Your Ideas to Life!</h2>
                <h3>Are you a startup looking to showcase your innovative products? Join our community of creators and entrepreneurs. Share your story, connect with potential customers, and take the first step in building your brand!</h3>
                <div className="listBenefits">
                    <div>
                        <h4>Reach New Customers</h4>
                        <p>Get your products in front of a community eager to discover new ideas.</p>
                    </div>
                    <div>
                        <h4>Supportive Community</h4>
                        <p>Join a network of fellow entrepreneurs who are passionate about innovation.</p>
                    </div>
                    <div>
                        <h4>User-Friendly Platform</h4>
                        <p>Our simple listing process makes it easy to showcase your product.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;