import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import UserHome from './UserHome'
import Deposit from './Deposit'
import Withdraw from './Withdraw'
import Transfer from './Transfer'
import Logout from './Logout'
import AdminHome from './AdminHome'
import ViewCustomers from './ViewCustomers'

function Navigation() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Registration />} />
                <Route path='/userhome' element={<UserHome />} />
                <Route path='adminhome' element={<AdminHome />} />
                <Route path='/deposit' element={<Deposit />} />
                <Route path='/withdraw' element={<Withdraw />} />
                <Route path='/transfer' element={<Transfer />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='users' element={<ViewCustomers />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Navigation