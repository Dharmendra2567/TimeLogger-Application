import React from 'react'
import { isAuthenticated } from '../api/UserApi'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoute = () => {
  return (
    <>
        {
            isAuthenticated() && isAuthenticated().user.role ===1?
            <Outlet/>:<Navigate to={'/login'}/>
            
        }
    </>
  )
}

export default AdminRoute