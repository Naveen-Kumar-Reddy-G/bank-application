import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Deposit() {
    // hello

    const navigate = useNavigate();
    const [amount, setAmount] =useState("");
    
    const location = useLocation();
    const { userData } = location.state;
    const [error, setError] = useState("");
    let status = true;

    const handleAmount = ()=> {
        const regex = /^[0-9]*\.[0-9]{2}$/
        if(!(regex.test(amount))) {
            setError("Enter Amount Correctly...");
            status = false;
        }
    }
    
    const Deposit = async(e)=> {
        e.preventDefault();
        handleAmount()
        if(status) {
            try {
                const response = await 
                axios.put(`http://localhost:8080/user/deposit?accountNumber=${userData.accountNumber}&amount=${amount}`);
                console.log(response.data);
                alert("Amount Deposit Successfully...");
                navigate('/userhome', {state : { userData }});
            } catch(error) {
                console.log("Unable to fetch " + error);
            };
        }
    }

  return (
    <>
        <h1 style={{textAlign:"center"}}>Deposit Page</h1>
        <div className="deposit-container">
            <form className="form" onSubmit={Deposit}>
                <table>
                    <tr>
                        <td>
                            <label className="label">Amount to Deposit</label>
                        </td>
                    </tr>
                    <tr>
                        <input 
                            className="inputfield" 
                            name='deposit' 
                            value={amount}
                            onChange={(e)=> {setAmount(e.target.value)}}
                            placeholder='Enter Amount'
                            required
                         />
                    </tr>
                    <tr>
                        <td style={{color:'red',paddingLeft:'30px'}}>{error}</td>
                    </tr>
                    <tr><input type='submit' value='Deposit' className="sbmt" /></tr>
                </table>
            </form>
        </div>
   
    </>
  )
}

export default Deposit