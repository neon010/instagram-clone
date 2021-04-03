import React, { useEffect, useState,useContext } from "react";
import {UserContext} from "../../App";

function Profile(){
    const [myPost, setMyPost] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    const [image, setImage] = useState("");

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

    useEffect(()=>{
        if(image){
         const data = new FormData();
         data.append("file",image);
         data.append("upload_preset","insta-clone");
         data.append("cloud_name","mycloud213");
         fetch("https://api.cloudinary.com/v1_1/mycloud213/image/upload",{
             method:"post",
             body:data
         })
         .then(res=>res.json())
         .then(data=>{             
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            }).then(res=>res.json())
            .then(result=>{
                localStorage.setItem("user", JSON.stringify({...state, pic:result.pic}));
                dispatch({type:"UPDATEPIC", payload:result.pic});
                window.location.reload();
            })        
         })
         .catch(err=>{
             console.log(err);
         })
        }
     },[image])

     const updatePhoto = (file)=>{
         setImage(file)
     }



    return (
        <div style={{maxWidth:"600px", margin:"0 auto"}}>
            <div
            style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img 
                    style={{width:"160px", height:"160px", borderRadius:"50%"}}
                    src= {state.pic ? state.pic:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vhv.rs%2Fviewpic%2FioJThwo_men-profile-icon-png-image-free-download-searchpng%2F&psig=AOvVaw0JbmizpXsi7SqKeNi3JvJO&ust=1611752590533000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIDL97fUue4CFQAAAAAdAAAAABAI"}
                    />
                    <div  className="file-field input-field" style={{margin:"10px"}}>
                        <div className="btn #64b5f6 blue darken-1">
                            <span>Update pic</span>
                            <input type="file" onChange={(e)=>updatePhoto(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <h4>{state ? state.email : "loading"}</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h6>{myPost.length} post</h6>
                        <h6>{state.followers === undefined || null ? 0 : state.followers.length} follower</h6>
                        <h6>{state.following === undefined || null ? 0 : state.following.length} following</h6>
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