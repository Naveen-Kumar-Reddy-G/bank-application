import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function AdminHome() {

  const navigate = useNavigate();
  const location = useLocation();
  const { userData }= location.state;
  
  const [toggle, setToggle] = useState(false);

  return (
    <>
       <div>
            <h1 style={{textAlign:'center'}}>Welcome, {userData.firstName} {userData.lastName}</h1>
            <div className="bankinfo">
                <span>Account Number : {userData.accountNumber}</span>
                {toggle ? <button onClick={()=>setToggle(false)}>Hide Balance</button> : 
                    <button onClick={()=>setToggle(true)}>View Balance</button>}
                {toggle && userData.balance}
            </div>
            <div className="actions-container">
                <ul className="actions">
                    <li onClick={()=>navigate('/users', {state:{userData}})}>View All Customers</li>
                    <li onClick={()=>navigate('/transactions', {state:{userData}})}>View All Transactions</li>
                    <li onClick={()=>navigate('/logout', {state:{userData}})}>Logout</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default AdminHome