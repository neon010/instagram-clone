import React, { useEffect, useState,useContext } from "react";
import {UserContext} from "../../App";
import {useParams} from  "react-router-dom"

function UserProfile(){
    const [userProfile,setProfile] = useState(null)
    const {userid} = useParams();

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Auth-token":localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{          
             setProfile(result)
        })
     },[])


    return (
        <>
        {userProfile ?
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80"
                    alt="profile pic"
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>40 followers</h6>
                        <h6>50 following</h6>
                    </div>
                </div>
            </div>
      
            <div className="gallery">
                {
                    userProfile.posts.map(item=>{
                        return(
                         <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                        )
                    })
                }
 
            
            </div>
        </div>
        
        
        : <h2>loading...!</h2>}
        
        </>
    )
};

export default UserProfile