import { useState, useEffect } from "react";
import Header from "./header";
import "./discover.css";
import Category from "./category";

function Discover(props){

    let[type, setType] = useState("all");

    let [softwareItems, setSoftwareItems] = useState([]);
    let [hardwareItems, setHardwareItems] = useState([]);
    let [allItems, setAllItems] = useState([...hardwareItems, ...softwareItems]);
    let [likedProds, setLikedProds] = useState(new Map());
    let [newLiked, setNewLiked] = useState("first load");

    useEffect(()=>{
        fetch('/discoverLikes',{
            method:"POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({email: props.loginInfo.email})
        }).then((response)=>response.json()).then((data)=>{
            
            console.log(data);
            setLikedProds(data.liked);

            setAllItems([...data.hardware, ...data.software].sort((a,b)=>{
                let t1 = new Date() - new Date(a.time);
                let t2 = new Date() - new Date(b.time);

                return t1 - t2;
            }));

            setHardwareItems(data.hardware.sort((a,b)=>{
                let t1 = new Date() - new Date(a.time);
                let t2 = new Date() - new Date(b.time);

                return t1 - t2;
            }));
            setSoftwareItems(data.software.sort((a,b)=>{
                let t1 = new Date() - new Date(a.time);
                let t2 = new Date() - new Date(b.time);

                return t1 - t2;
            }));
        });
    },[props.loginInfo.email]);


    function changeType(e){
        setType(e.target.value);
    }

    function changeFilter(e){
        if(e.target.value === "new"){
            setAllItems((prev)=>
                prev.toSorted((a,b)=>{
                    let t1 = new Date() - new Date(a.time);
                    let t2 = new Date() - new Date(b.time);

                    return t1 - t2;
                })
            );

            setHardwareItems((prev)=>
                prev.toSorted((a,b)=>{
                    let t1 = new Date() - new Date(a.time);
                    let t2 = new Date() - new Date(b.time);

                    return t1 - t2;
                })
            )

            setSoftwareItems((prev)=>
                prev.toSorted((a,b)=>{
                    let t1 = new Date() - new Date(a.time);
                    let t2 = new Date() - new Date(b.time);

                    return t1 - t2;
                })
            )
        }else if(e.target.value === "trending"){
            setAllItems((prev)=> prev.toSorted((a,b)=> b.likes - a.likes));
            setHardwareItems((prev)=> prev.toSorted((a,b)=> b.likes - a.likes));
            setSoftwareItems((prev)=> prev.toSorted((a,b)=> b.likes - a.likes));
        }else{
            setAllItems((prev)=> prev.toSorted((a,b)=> b.purchases - a.purchases));
            setHardwareItems((prev)=> prev.toSorted((a,b)=> b.purchases - a.purchases));
            setSoftwareItems((prev)=> prev.toSorted((a,b)=> b.purchases - a.purchases));
        }
    }

    function updateLiked(newLiked){
        setNewLiked(newLiked);
    }

    window.onbeforeunload = ()=>{
        if(newLiked !== "first load"){
            fetch('/discover',{
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({email: props.loginInfo.email, newLiked: newLiked})
            });
        }
    }

    return(
        <div>
            <Header loginInfo={props.loginInfo} newLiked={newLiked}></Header>
            <div className="categorySelector">
            <button onClick={changeType} className="allBtn" value="all" style={!(type === "all") ? {color:"rgba(0,0,0,0.3)"} : null}>ALL</button>
            <button onClick={changeType} className="hardwareBtn" value="hardware" style={!(type === "hardware") ? {color:"rgba(0,0,0,0.3)"} : null}>HARDWARE</button>
            <button onClick={changeType} className="softwareBtn" value="software" style={!(type === "software") ? {color:"rgba(0,0,0,0.3)"} : null}>SOFTWARE</button>
            <select name="filter" id="filter" onChange={changeFilter}>
                <option value="new">New</option>
                <option value="trending">Trending</option>
                <option value="mostBought">Most Bought</option>
            </select>
            </div>
            {type === "all" && <Category type={type} items={allItems} likedProds={likedProds} updateLiked={updateLiked}></Category>}
            {type === "software" && <Category type={type} items={softwareItems} likedProds={likedProds} updateLiked={updateLiked}></Category>}
            {type === "hardware" && <Category type={type} items={hardwareItems} likedProds={likedProds} updateLiked={updateLiked}></Category>}
        </div>
    )
}

export default Discover;