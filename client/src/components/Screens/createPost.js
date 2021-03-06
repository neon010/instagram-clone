import React, { useState,useEffect } from "react"
import {useHistory} from "react-router-dom";
import M from 'materialize-css'

function CreatePost(){
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "auth-token": localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{   
           if(data.error){
              M.toast({html: data.error.message, classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","insta-clone")
       data.append("cloud_name","mycloud213")
       fetch("https://api.cloudinary.com/v1_1/mycloud213/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
          setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })    
   }


    return (
        <div className="card input-filed"   
        style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
        }}>
            <input 
            type="text"
            required
            placeholder="title"
            value={title}
            onChange={(event)=>{setTitle(event.target.value)}}
            />
           <input
            type="text"
            required
            placeholder="body"
            value={body}
            onChange={(event)=>{setBody(event.target.value)}}
             />
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input 
                type="file"
                required
                onChange={(event)=>{setImage(event.target.files[0])}}
                />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button 
            className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >
                Submit post
            </button>
        </div>
    )
};

export default CreatePost;