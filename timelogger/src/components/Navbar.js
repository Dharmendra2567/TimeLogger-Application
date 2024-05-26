import React from 'react'
import { isAuthenticated, signout } from '../api/UserApi'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let {user,token} = isAuthenticated();
    let navigate = useNavigate()
    const handleSignout=()=>{
        signout()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                navigate('/login')
            }
        })
    }
    return (
        <>
            <div className='row overflow-hidden custom-bg text-lg fixed-top'>
                <div className='col-lg-9 col-md-8 col-8 text-lg-center'>
                    <h2>TimeLogger</h2>
                </div>
                <div className='col-lg-3 col-md-4 col-4 d-flex justify-content-evenly align-items-center text-center'>
                    { user && user.role ===1 &&
                    <>
                     <Link to={'/admin/dashboard'} ><button className='btn border shadow'>Dashboard</button></Link>
                        <button className='btn border shadow-lg' onClick={handleSignout}>Logout</button>
                  </>}
                  { user && user.role ===0 &&
                    <>
                     <Link to={'/user/dashboard'} ><button className='btn border shadow'>Dashboard</button></Link>
                        <button className='btn border shadow-lg' onClick={handleSignout}>Logout</button>
                  </>}
                </div>
            </div>
        </>
    )
}

export default Navbar