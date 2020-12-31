import React, {useEffect,createContext,useReducer,useContext} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Screens/Home";
import Signin from "./components/Screens/Signin";
import Signup from "./components/Screens/Signup";
import Profile from "./components/Screens/Profile";
import CreatePost from "./components/Screens/createPost";
import {reducer, initialState} from "./reducers/userReducer"
import UserProfile from "./components/Screens/UserProfile";


export const UserContext = createContext();

const Routing = () =>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type:"USER", payload:user});
    }else{
      history.push("/signin");
    }
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/signin" exact component={Signin}/>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/profile" exact component={Profile}/>
      <Route path="/createPost" exact component={CreatePost}/>
      <Route path="/profile/:userid"  component={UserProfile}/>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar/>
        <Routing />
      </Router>
    </UserContext.Provider>

  );
}

export default App;
