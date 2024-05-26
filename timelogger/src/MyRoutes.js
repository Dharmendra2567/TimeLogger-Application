import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from './pages/Test'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EmailConfirmation from './pages/EmailConfirmation'
import { UserDashboard } from './pages/user/UserDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './selectiveRoutes/AdminRoute'
import UserRoute from './selectiveRoutes/UserRoute'
import UserSidebar from './pages/user/UserSidebar'

const MyRoutes = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
           <Route path='/test' element={<Test/>}/>
           <Route path='/' element={<Home/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/register' element={<Register/>}/>
           <Route path='/confirm/:token' element={<EmailConfirmation/>}/>

          <Route path='/' element={<UserRoute/>}>
             <Route path='/user/dashboard' element={<UserDashboard/>}/>

            <Route path='/sidebar' element={<UserSidebar/>}/>
          </Route>
          <Route path='/' element={<AdminRoute/>}>
            <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          </Route>
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default MyRoutes