import React from 'react'
import { isAuthenticated } from '../api/UserApi'
import { Navigate, Outlet } from 'react-router-dom'

const UserRoute = () => {
  return (
    <>{
        isAuthenticated() && isAuthenticated().user.role ===0?
        <Outlet/>: <Navigate to={'/login'}/>
    }
    </>
  )
}

export default UserRoute