import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state;
    return (
        <>
            <div className="container">
                <div className="form">
                    <pre className="text">Are you sure, </pre>
                    <pre className="text">    You want to logout ?</pre>
                    <button className="button" onClick={()=>{navigate("/")}}>YES</button>
                    <button className="button" 
                    onClick={()=>{userData.role == 'USER' ? navigate("/userhome", {state : {userData}}):
                        navigate("/adminhome", {state : {userData}})}}>NO</button>
                </div>
            </div>
        </>
  )
}

export default Logout