import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Registration() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName : "",
        lastName : "",
        email : "",
        mobileNumber : "",
        password : "",
        role : "",
        accountNumber : ""
    })

    const [error, setError] = useState({
        firstName : "",
        lastName : "",
        email : "",
        mobileNumber : "",
        password : "",
        role : "",
        accountNumber : ""
    })

    let status = true;

    const [accNumber, setAccounNumber] = useState(0);
    const [toggle, setToggle] = useState(false);
    const URL = 'http://localhost:8080/user/save';

    const handleError = ()=> {
        const mobileRegex = /^[6-9][0-9]{9}$/
        if(!(mobileRegex.test(user.mobileNumber))) {
            setError({...error, mobileNumber : "Invalid Mobile Number" });
            status = false;
        }

        const nameRegex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-z]$)/
        if(!(nameRegex.test(user.firstName) && nameRegex.test(user.lastName))) {
            setError({...error, firstName : "Invalid First Name", lastName : "Invalid Last Name" });
            status = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(!(emailRegex.test(user.email))) {
            setError({...error, email : "Invalid Email" });
            status = false;
        }

        // const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\s+$).{8,}$/
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;

        if(!passwordRegex.test(user.password)) {
            setError({...error, password : "Password must be at least 8 characters & strong"});
            status = false;
        }
    }

    const saveUser = async(e)=> {
        e.preventDefault();
        handleError();
        if(status) {
            try {
                const response = await axios.post(URL, user);
                console.log(response.data);
                alert('Registered Successfully....');
                navigate('/');
                return response.data;
            } catch(error) {
                console.log("Error fetching data : " + error);
            }
        }
    }

    const generateAccountNumber = async()=> {
        try {
            const response = await axios.get('http://localhost:8080/user/generateAccNumber');
            setAccounNumber(response.data);
            setUser(prev=>({...prev, accountNumber: response.data}));
            return response.data;
        } catch(error) {
            console.log("Unable to generate account number : " + error);
        }
    }

    const handleChange = (e) => {
        setUser(prev=>({...prev, [e.target.name] : e.target.value}));
    }

  return (
    <>
        <div className="register-container">
            <form className="register-form" onSubmit={saveUser}>
                <h2>Register</h2>
                <table>
                    <tr>
                        <td><label className="label">First Name</label></td>
                        <td><label className="label">Last Name</label></td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                className="inputfield"
                                value={user.firstName}
                                name='firstName'
                                placeholder='Enter First Name'
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <input 
                                className="inputfield"
                                value={user.lastName}
                                name='lastName'
                                placeholder='Enter Last Name'
                                onChange={handleChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{color:'red', paddingLeft:'30px'}}>{error.firstName}</td>
                        <td style={{color:'red', paddingLeft:'30px'}}>{error.lastName}</td>
                    </tr>
                    <tr>
                        <td><label className="label">Mobile Number</label></td>
                        <td><label className="label">Email</label></td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                className="inputfield"
                                value={user.mobileNumber}
                                name='mobileNumber'
                                placeholder='Enter Mobile Number'
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <input 
                                className="inputfield"
                                value={user.email}
                                name='email'
                                placeholder='Enter Email'
                                onChange={handleChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{color:'red', paddingLeft:'30px'}}>{error.mobileNumber}</td>
                        <td style={{color:'red', paddingLeft:'30px'}}>{error.email}</td>
                    </tr>
                    <tr>
                        <td><label className="label">Password</label></td>
                        <td><label className="label">Select Role</label></td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                className="inputfield"
                                value={user.password}
                                name='password'
                                placeholder='Enter Password'
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <select required className='inputfield' name='role' value={user.role} onChange={handleChange}>
                                <option value={"Select"} selected disable>SELECT</option>
                                <option value={"ADMIN"}>ADMIN</option>
                                <option value={"USER"}>USER</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{color:'red', paddingLeft:'30px'}}>{error.password}</td>
                    </tr>
                    <tr>
                            <input type="checkbox" style={{marginLeft:'200px'}} required />
                            <span>Agree Terms & Conditions</span>
                            {toggle ? <p>Your Account Number: {accNumber}</p> 
                                : <button onClick={()=>{setToggle(true); generateAccountNumber()}}>Generate Account Number</button>}
                    </tr>
                    <tr>
                        <td><input type="submit" className="register-sbmt" value='Submit' /></td>
                    </tr>
                    <tr>
                        <td><p style={{marginLeft:'100px'}}>If already a User, <Link to='/'>Login</Link></p></td>
                    </tr>
                </table>
            </form>
        </div>
    </>
  )
}

export default Registration