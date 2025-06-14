import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [userDetail, setUserDetail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const handleClick = async(e)=> {
        e.preventDefault();
        try {
            const respone = await axios.get(`http://localhost:8080/user/login/${userDetail}/${password}`);
            console.log(respone.data);
            setUserData(respone.data);
            if(respone.data!=null) {
                if(respone.data.role=='ADMIN')
                    navigate('/adminhome', {state : {userData : respone.data}});
                else
                    navigate('/userhome', {state : {userData : respone.data}});
            }
            return respone.data;
        } catch(error) {
            console.log("Error fetching data : " + error);
        }
    }

  return (
    <>
        <div className="container">
            <form className="form">
                <h2>Login</h2>
                <table>
                    <tr>
                        <td><lable className="label">Email/MobileNumber</lable></td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                className="inputfield"
                                name='email'
                                value={userDetail}
                                onChange={(e)=> setUserDetail(e.target.value)}
                                placeholder='Enter Email / Mobile Numer'
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><lable className="label">Password</lable></td>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                className="inputfield"
                                type='password'
                                name='password'
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder='Enter Password'
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><input type="submit" className='sbmt' onClick={handleClick} /></td>
                    </tr>
                    <tr>
                        <td>
                            <p style={{marginLeft:'100px'}}>If not a User, <Link to='/register'>Register</Link></p>
                        </td>
                    </tr>
                </table>
            </form>
        </div>

    </>
  )
}

export default Login