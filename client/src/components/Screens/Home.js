import React, { useState,useEffect } from "react";

function Home(){
    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch("/allpost", {
            headers:{
                "auth-token": localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{
                console.log(result);
                setData(result);
            })
    },[])

    return (
        <div className="home">
            {data.map(item=> {
                return (
                    <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img className="img" 
                                src={item.photo} alt="post image"/>
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{color: "red"}}> favorite</i>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            <input type="text" placeholder="Enter your comment"/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default Home