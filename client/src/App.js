import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Screens/Home";
import Signin from "./components/Screens/Signin";
import Signup from "./components/Screens/Signup";
import Profile from "./components/Screens/Profile";
import CreatePost from "./components/Screens/createPost";

function App() {
  return (
    <Router>
        <Navbar/>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/createPost" exact component={CreatePost}/>
        </Switch>
    </Router>
  );
}

export default App;
