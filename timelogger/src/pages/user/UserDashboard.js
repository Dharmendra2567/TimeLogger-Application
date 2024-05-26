import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import UserSidebar from './UserSidebar'
import DashboardCards from './DashboardCards'
import { addActivity, isAuthenticated } from '../../api/UserApi'

export const UserDashboard = () => {
  let [col1, setCol1] = useState('')
  let [col2, setCol2] = useState('')
  let [pad, setPad] = useState('4rem')
  let [activityToAdd, setActivityToAdd] = useState(false)


  useEffect(() => {
    if (window.innerWidth < 1100) {
      setCol1('col-0')
      setCol2('col-12')
      setPad('1rem')
    } else {
      setCol1('col-3')
      setCol2('col-9')
      setPad('6rem')
    }
    const initialSet = () => {
      if (window.innerWidth < 1100) {
        setCol1('col-0')
        setCol2('col-12')
        setPad('1rem')
      } else {
        setCol1('col-3')
        setCol2('col-9')
        setPad('6rem')
      }
    }
    initialSet()
    window.addEventListener('resize', initialSet)
    return () => {
      window.removeEventListener('resize', initialSet)
    }
  }, [])

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
          setActivity_info({ ...activity_info, success: true, error: '' })

          // setActivity_info({...activity_info,userId:isAuthenticated().user._id})
          console.log(activity_info.userId)
          console.log(activity_info)

        }
      })

  }
  return (
    <>
      <div className='container-fluid ' style={{ marginLeft: 0, padding: 0 }}>
        <Navbar />
        <div className=' mt-5 row ' style={{ margin: 0, padding: 0 }}>
          <div className={col1}></div>
          <div className={col2} style={{ paddingLeft: `${pad}` }}>

            <div className='d-flex text-center'>
              <UserSidebar />
              <h4 className=' p-2 mx-lg-3 mt text-center'>Dashboard</h4>
            </div>
            <div className='row text-center justify-content-center '>
              <div className='col-8 justify-content-center'>
                <h4 className='text-muted'>No Running Activity</h4>
                {!activityToAdd &&
                  <button type='button' onClick={()=>{setActivityToAdd(true)}} className='btn btn-primary w-100' style={{ whiteSpace: 'nowrap' }}>Add Activity</button>

                }
                {activityToAdd &&
                  <>
                    <div className='p-2  mt-2 d-block'>
                      <div className='d-lg-flex d-sm-block'>
                      <div className='d-flex'>
                        <label htmlFor='activity' className='text-sm-start p-2'>Activity</label>
                        <input type='text' id='activity' placeholder='enter activity name' className='p-2 w-100 mb-3'
                          onChange={e => { setActivity_info({ ...activity_info, activityName: e.target.value }) }} /><b></b>
                      </div>

                      <div className='d-flex'>
                        <label htmlFor='description' className='text-sm-start p-2'>description</label>
                        <input type='text' id='description' placeholder='add description' className='p-2 w-100 mb-3'
                          onChange={e => { setActivity_info({ ...activity_info, description: e.target.value }) }} />
                      </div>
                      </div>
                        <div className='d-flex'>
                        <button className='btn custom-bg p-2 my-sm-2 mx-2' onClick={handleActivity}>Submit</button>
                      <button className='btn custom-bg p-2 my-sm-2 mx-2' onClick={()=>{setActivityToAdd(false)}}>Cancel</button>
                  
                        </div>
                       </div>
                  </>}
              </div>
            </div>
            <hr className='shadow mb-3'></hr>
            <DashboardCards />
          </div>
        </div>
        <hr></hr>

      </div>
    </>
  )
}
export default UserDashboard;
