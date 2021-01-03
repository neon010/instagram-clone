import React, {useContext} from "react";
import {UserContext} from "../App"
import '../App.css';
import {Link, useHistory} from "react-router-dom"

function Navbar(){
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    console.log(state);
    const renderList = () => {
      if (state) {
        return [
          <li key="1"><Link to="/"> <i class="large material-icons">home</i></Link></li>,
          <li key="2">
            <Link to="/profile">
              <img src={state.pic} alt="profile-pic" className="avatar"/>
            </Link>
          </li>,
          <li key="3"><Link to="/createPost"><i class="large material-icons">add_to_photos</i></Link></li>,
          <li key="4"><Link to="/myfollowingpost"><i class="large material-icons">explore</i></Link></li>,
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
          <li key="5"><Link to="/signin">Signin</Link></li>,
          <li key="6"><Link to="/signup">Signup</Link></li>
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