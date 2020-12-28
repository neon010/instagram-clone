import React from "react";

function Profile(){
    return (
        <div style={{maxWidth:"600px", margin:"0 auto"}}>
            <div
            style={{display:"flex", justifyContent:"space-around", margin:"18px 0px", borderBottom:"1px solid grey"}}>
                <div>
                    <img 
                    style={{width:"160px", height:"160px", borderRadius:"50%"}}
                    src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=736&q=80"
                    />
                </div>
                <div>
                    <h4>Priyanka</h4>
                    <div style={{display:"flex", justifyContent:"space-between", width:"108%"}}>
                        <h4>40 post</h4>
                        <h4>50 following</h4>
                        <h4>60 followers</h4>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
                <img className="item" src="https://images.unsplash.com/photo-1593270295777-32ad2bea0576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=704&q=80" />
            </div>
        </div>
    )
};

export default Profile