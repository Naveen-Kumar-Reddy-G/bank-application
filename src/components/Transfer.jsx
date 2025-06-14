import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Transfer() {
    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState();
    const [amount, setAmount] = useState();

    const location = useLocation();
    const { userData }= location.state;

    const [error, setError] = useState({
        amount : "",
        accountNumber : "",
    });
    let status = true;
    
    const handleAmount = ()=> {
        const regEx = /^[0-9]*\.[0-9]{2}$/
        if(!(regEx.test(amount))) {
            setError((prev)=>({...prev, amount:"Enter Amount Correctly"}));
            status = false;
        }

        const accountNumberRegEx = /^[0-9]{12}$/
        if(!(accountNumberRegEx.test(accountNumber))) {
            setError((prev)=>({...prev, accountNumber:"Enter Valid Account Number"}));
            status = false;
        }
    }

    const Transfer = async(e)=> {
        e.preventDefault();
        handleAmount();
        if(status) {
            if(amount>userData.balance){
                alert('Insufficient balance...');
                navigate('/transfer', { state : { userData}})
                setAmount("");
            } else {
                try {
                    const response = await 
                    axios.put(`http://localhost:8080/user/transfer?accNumber1=${userData.accountNumber}&accNumber2=${accountNumber}&amount=${amount}`);
                    alert('Amount Transfered Successfully...');
                    navigate('/userhome', {state : { userData }})
                } catch(error) {
                    console.log("Transfer Failed " + error);
                }
            }
        }
    }

    return (
        <>
            <h1 style={{textAlign:'center'}}>Transfer Page</h1>
            <div className="deposit-container">
                <form onSubmit={Transfer} className="form">
                    <table>
                        <tr>
                            <td><label className="label">Receiver's Account Number</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    className='inputfield'
                                    name='accountNumber'
                                    value={accountNumber}
                                    onChange={(e)=>setAccountNumber(e.target.value)}
                                    placeholder="Enter Receiver's Account Number"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{color:'red',paddingLeft:'30px'}}>{error.accountNumber}</td>
                        </tr>
                        <tr>
                            <td><label className="label">Amount To Transfer</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    className='inputfield'
                                    name='amount'
                                    value={amount}
                                    onChange={(e)=>setAmount(e.target.value)}
                                    placeholder="Enter Amount"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{color:'red',paddingLeft:'30px'}}>{error.amount}</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value='Transfer' className="sbmt" />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </>
    )
}

export default Transfer