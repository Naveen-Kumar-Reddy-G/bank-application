import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Withdraw() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");

    const location = useLocation();
    const { userData }= location.state;

    const [error, setError] = useState("");
    let status = true;
    
    const handleAmount = ()=> {
        const regEx = /^[0-9]*\.[0-9]{2}$/
        if(!(regEx.test(amount))) {
            setError("Enter Amount Correctly...");
            status = false;
        }
    }
  
    const withdraw = async(e)=> {
        e.preventDefault();
        handleAmount();
        if(status) {
            if(userData.balance < amount) {
                alert('Insufficient Amount in Account...');
                navigate('/withdraw', { state : { userData }})
                setAmount("");
            } else {
                try {
                    const response = await axios.put(`http://localhost:8080/user/withdraw?accountNumber=${userData.accountNumber}&amount=${amount}`);
                    alert('Amount withdrawn successfully...');
                    navigate('/userhome', {state:{userData}})
                } catch(error) {
                    console.log('Withdraw failed ' + error);
                }
            }
        }
    }
    
    return (
        <>
            <h1>Withdraw Page</h1>
            <div className="deposit-container">
                <form onSubmit={withdraw} className="form">
                    <table>
                        <tr>
                            <td><label className="label">Amount to Withdraw</label></td>
                        </tr>
                        <tr>
                            <input
                                className='inputfield'
                                name='withdraw'
                                value={amount}
                                onChange={(e)=>setAmount(e.target.value)}
                                placeholder='Enter Amount'
                                required
                             />
                        </tr>
                        <tr>
                            <td style={{color:'red',paddingLeft:'30px'}}>{error}</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value='withdraw' className="sbmt" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </>
    )
}

export default Withdraw