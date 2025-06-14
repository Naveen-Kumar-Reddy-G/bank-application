import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userData }= location.state;

    const [toggle, setToggle] = useState(false);
    const [balance, setBalance] = useState("");

    useEffect(()=> {
        const fetchBalance = async()=> {
            try {
                const respone = await axios.get(`http://localhost:8080/user/balance?accNumber=${userData.accountNumber}`);
                setBalance(respone.data);
            } catch(error) {
                console.log("Unable to fetch : " + error);
            }
        };
        fetchBalance();
    }, [userData]);

  return (
    <>
        <div>
            <h1 style={{textAlign:'center'}}>Welcome, {userData.firstName} {userData.lastName}</h1>
            <div className="bankinfo">
                <span>Account Number : {userData.accountNumber}</span>
                {toggle ? <button onClick={()=>setToggle(false)}>Hide Balance</button> : 
                    <button onClick={()=>setToggle(true)}>View Balance</button>}
                {toggle && balance}
            </div>
            <div className="actions-container">
                <ul className="actions">
                    <li onClick={()=>navigate('/withdraw', {state:{userData}})}>Withdraw</li>
                    <li onClick={()=>navigate('/deposit', {state:{userData}})}>Deposit</li>
                    <li onClick={()=>navigate('/transfer', {state:{userData}})}>Transfer</li>
                    <li onClick={()=>navigate('/logout', {state:{userData}})}>Logout</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default UserHome