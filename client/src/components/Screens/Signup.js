import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom"
import M from 'materialize-css'

function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const postData = () => {
        fetch("/signup", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
          .then(data=> {
            if(data.error){
                console.log(data);
                M.toast({html: data.error.message, classes:"#c62828 red darken-3"})
             }else{
                M.toast({html:data.message, classes:"#43a047 green darken-1"})
                history.push('/signin');
            }
          }).catch((error)=> console.log(error));
          
    }
   
    return (
        <div className="signup-card">
            <div className="card auth-card">
                <h1 className="login-title">Instagram</h1>
                <input 
                required
                type="text" 
                placeholder="username"
                value={name}
                onChange={(event)=>setName(event.target.value)}
                />
                <input 
                required
                type="text" 
                placeholder="email or username"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                />
                <input 
                required
                type="password" 
                placeholder="password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                />
                <button 
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=> postData()}
                >
                Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
};

export default Signup;