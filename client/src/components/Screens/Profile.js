import React, { useEffect, useState,useContext } from "react";
import {UserContext} from "../../App";

function Profile(){
    const [myPost, setMyPost] = useState([]);
    const {state,dispatch} = useContext(UserContext)


    useEffect(()=>{
        fetch("/mypost", {
            headers:{
                "auth-token": localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{
                setMyPost(result);
            })
    },[]);


    return (
        <div style={{maxWidth:"600px", margin:"0 auto"}}>
            <div
            style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img 
                    style={{width:"160px", height:"160px", borderRadius:"50%"}}
                    src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80"
                    />
                </div>
                <div>
                    <h4>{state? state.name : "loading"}</h4>
                    <h4>{state? state.email : "loading"}</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{myPost.length} posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {myPost.map(item=>{
                    return (
                        <img className="item" alt={item.title} key={item._id} src={item.photo} />
                    )
                })}
            </div>
        </div>
    )
};

export default Profile