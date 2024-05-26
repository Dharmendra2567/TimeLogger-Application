import React, { useEffect, useId, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { addActivity, isAuthenticated } from '../api/UserApi'


const Home = () => {
    let { user, token } = isAuthenticated();
    const [clicked, setClicked] = useState(false)
    const handleClicked = e => {

        e.preventDefault()
        setClicked(true)

    }
    let [activity_info, setActivity_info] = useState({
        activityName: '',
        description: '',
        userId: '',
        error: '',
        success: false
    })
    let { success, error, activityName, description, userId } = activity_info

    useEffect(() => {
        const user = isAuthenticated().user;
        if (user) {
            setActivity_info({ ...activity_info, userId: user._id });
        }
    }, []);


    const handleActivity = e => {

        e.preventDefault()
        addActivity(activity_info)
            .then(data => {
                if (data.error) {
                    setActivity_info({ ...activity_info, error: data.error, success: false })
                }
                else {
                    console.log("data addded successfully")
                    setActivity_info({ ...activity_info, success: true ,error:''})

                    // setActivity_info({...activity_info,userId:isAuthenticated().user._id})
                    console.log(activity_info.userId)
                    console.log(activity_info)

                }
            })

    }

    return (
        <>
            <div className='container-fluid'>
                <Navbar />
                <div className='card mt-5 w-100'>
                    {success && (
                        <div className='alert alert-success'>Activity added successfully <Link to="/user/dashboard">Go to Dashboard</Link>.</div>
                    )}
                    {error && !success && (
                        <div className='alert alert-danger'>{error}<Link to=''> yes/no</Link></div>
                    )}
                </div>
                <div className='d-flex align-items-center justify-content-center mx-lg-5 px-lg-5'>
                    <div className='container-lg mx-lg-5 px-lg-5 ml-lg-5'>
                        <div className='card p-lg-5 p-3 w-100 border-2 shadow-lg'>
                            <div className='card-body d-block m-0 p-0'>
                                <h4>Know the Past, Plan The Future</h4>
                                <p><em>Get the track of all activities done within 24 hours</em></p>
                            </div>
                            <div className='d-block p-3 text-center'>
                                {user && user.role === 0 &&
                                    <>
                                        <p className='card-title fs-5' style={{ fontFamily: 'sans-serif' }}>Create New Activity</p>
                                        {clicked === false && (
                                            <>
                                                <button className='btn custom-bg' onClick={() => setClicked(true)}>Start Tracking</button><br></br>
                                            </>
                                        )}

                                        {clicked &&
                                            <>
                                                <div className='p-2  mt-2 d-block'>
                                                    <div>
                                                        <label htmlFor='activity' className='text-sm-start p-2'>Enter Activity</label>
                                                        <input type='text' id='activity' placeholder='enter activity name' className='p-2 w-50 mb-3'
                                                            onChange={e => { setActivity_info({ ...activity_info, activityName: e.target.value }) }} /><b></b>
                                                    </div>

                                                    <div>
                                                        <label htmlFor='description' className='text-sm-start p-2'>description</label>
                                                        <input type='text' id='description' placeholder='add description' className='p-2 w-50 mb-3'
                                                            onChange={e => { setActivity_info({ ...activity_info, description: e.target.value }) }} />
                                                    </div>

                                                    <button className='btn custom-bg p-2 my-sm-2 mx-2' onClick={handleActivity}>Submit</button>
                                                </div>
                                            </>
                                        }
                                    </>}

                                {!user &&
                                    <>
                                        <p className='card-title fs-5' style={{ fontFamily: 'sans-serif' }}>Login here to continue</p>
                                        <Link to="/login"><button className='btn custom-bg'>Login</button></Link>

                                    </>}
                                {user && user.role === 1 &&
                                    <>
                                        <p className='card-title fs-5' style={{ fontFamily: 'sans-serif' }}>Welcome {user.firstname},</p>
                                        <Link to="/admin/dashboard"><button className='btn custom-bg'>Go To Dashboard</button></Link>

                                    </>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home