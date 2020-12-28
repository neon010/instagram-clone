import React,{useState} from "react";
import {Link,useHistory} from "react-router-dom";
import M from 'materialize-css'

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const postData = () => {
        fetch("/signin", {
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
          .then(data=> {
            if(data.error){
                console.log(data);
                M.toast({html: data.error.message,classes:"#c62828 red darken-3"})
             }else{
                 console.log(data);
                M.toast({html:"signed successfully",classes:"#43a047 green darken-1"})
                history.push('/');
            }
          }).catch((error)=> console.log(error));          
    }


    return (
        <div className="login-card">
            <div className="card auth-card">
                <h1 className="login-title">Instagram</h1>
                <input 
                type="text" 
                placeholder="email or username"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                />
                <input 
                type="password" 
                placeholder="password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                />
                <button 
                className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>postData()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/home">Dont have an account?</Link>
                </h5>
            </div>
        </div>
    )
};

export default Signin