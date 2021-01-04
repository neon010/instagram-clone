import React, {useContext, useState, useRef, useEffect} from "react";
import {UserContext} from "../App"
import '../App.css';
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css";

function Navbar(){
    const {state, dispatch} = useContext(UserContext);
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
    const history = useHistory();
    const searchModal = useRef();

    useEffect(()=>{
      M.Modal.init(searchModal.current);
    }, []);

    const fetchUsers = (query)=>{
        setSearch(query);
        fetch('/search-users', {
          method:"post",
          headers:{
            "Content-Type":"application/json",
            "auth-token": localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            query
          })
        }).then(res=> res.json()).then(data => setUserDetails(data.user));
   }

    const renderList = () => {
      if (state) {
        return [
          <li key="1" style={{marginRight:"250px"}}><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
          <li key="hghmbjm"><Link to="/"><i className="large material-icons">home</i></Link></li>,
          <li key="2">
            <Link to="/profile">
              <img src={state ? state.pic: "https://res.cloudinary.com/mycloud213/image/upload/v1609481336/default_men_image_fvwyfl.png"} alt="profile-pic" className="avatar"/>
            </Link>
          </li>,
          <li key="3"><Link to="/createPost"><i className="large material-icons">add_to_photos</i></Link></li>,
          <li key="4"><Link to="/myfollowingpost"><i className="large material-icons">explore</i></Link></li>,
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
        <div className="nav-wrapper white nav-custom">
          <div style={{marginLeft:"150px"}}>
            <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
          </div>
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{marginRight:"30px"}}>
            {renderList()}
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
        <div className="modal-content">
          <input 
              type="text"
              placeholder="search user"
              value={search}
              onChange={(e)=>fetchUsers(e.target.value)}
          />
          <ul className="collection" style={{color:"black"}}>
            {userDetails.map(item =>{
              return <li key="item._id" className="collection-item">
                        <Link to={item._id !== state._id ? `/profile/${item._id}` : "/profile"}>
                          <img src={item.pic} alt="profile-pic" className="avatar"/><span style={{marginLeft:"10px"}}>{item.name}</span>
                        </Link>
                      </li>
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat">close</button>
        </div>
      </div>
      </nav>
    )
};

export default Navbar