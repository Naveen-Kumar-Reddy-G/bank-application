import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewCustomers() {

  const [users, setUsers] = useState([])
  const location = useLocation();
  const { userData } = location.state;

  const navigate = useNavigate();

  const ViewCustomers = async()=> {
    try {
      const response = await axios.get('http://localhost:8080/user/viewCustomers');
      setUsers(response.data);
      console.log(response.data);
    } catch(error) {
      console.log("Unable to fetch : " + error);
    }
  }

  useEffect(()=> {
    ViewCustomers();
  }, [])

  return (
    <>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Account Number</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=>(
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.accountNumber}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={()=>navigate('/adminhome', { state : { userData }})}>CLOSE</button>
        </div>
    </>
  )
}

export default ViewCustomers