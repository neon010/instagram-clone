import React, { useEffect, useState,useContext } from "react";
import {UserContext} from "../../App";
import {useParams} from  "react-router-dom"

function UserProfile(){

    const {state,dispatch} = useContext(UserContext);
    const [userProfile,setProfile] = useState(null);
    const {userid} = useParams();
    const [showfollow,setShowFollow] = useState(state.following ? !state.following.includes(userid):true);
    
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "auth-token": localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{          
             setProfile(result)
        })
     },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{        
            dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
            setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "auth-token":localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true);             
        })
    }

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
                    />
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h5>{userProfile.user.email}</h5>
                    <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h6>{userProfile.posts.length} posts</h6>
                        <h6>{userProfile.user.followers.length} followers</h6>
                        <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {showfollow?
                    <button 
                    style={{margin:"10px"}} 
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                         Follow
                    </button>
                     : 
                     <button
                     style={{margin:"10px"}}
                     className="btn waves-effect waves-light #64b5f6 blue darken-1"
                     onClick={()=>unfollowUser()}
                     >
                    UnFollow
                     </button>
                     }
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