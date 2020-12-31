import React, {useContext} from "react";
import {UserContext} from "../App"
import '../App.css';
import {Link, useHistory} from "react-router-dom"

function Navbar(){
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory()
    const renderList = () => {
      if (state) {
        return [
          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/createPost">createPost</Link></li>,
          <li>
          <button 
          className="btn waves-effect waves-light #64b5f6 red darken-1"
          onClick={()=>{
            localStorage.clear();
            dispatch({type:"CLEAR"})
            history.push("/signin");
          }}
          >Log Out</button>
        </li>
        ]
      } else {
        return [
          <li><Link to="/signin">Signin</Link></li>,
          <li><Link to="/signup">Signup</Link></li>
        ]
      }
    }
    return (
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
};

export default Navbar