import React, { useEffect, useState } from 'react'
import { getAllActivies } from '../../api/UserApi'
import { act } from 'react-dom/test-utils'

const DashboardCards = () => {
    let [activities,setActivities] = useState([])
    let [success,setSuccess] = useState('')
    useEffect(()=>{
        getAllActivies()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setActivities(data)
                console.log(data)
            }
        })
    },[success])
    return (
        <>
        
         <div className='d-flex  flex-wrap align-items-center' >
            {activities.length > 0 &&
                activities.map((item, i) => (
                   
                        <div className='card mx-1 my-2 shadow-lg p-2' style={{ width: '30%' }}>
                            <p className='card-title'>Task: {item.activityName}</p>
                            <div className='d-flex flex-wrap justify-content-between align-items-center ' style={{ fontSize: '10px' }}>
                                <p className='flex-item'>Started at:{item.startedAt}</p>
                                <p className='flex-item'>Ended at: {item.endedAt}</p>
                            </div>
                            <div className='card-body m-0 p-0 '>
                                <div className='p-lg-2 text-start d-flex  justify-content-start align-items-center flex-wrap m-0'>
                                    <p className='card-text text-start ms-0' style={{ fontSize: '' }}>Duration:</p>
                                    <p className='ms-lg-2 fs-4'>02:30:40</p>
                                </div>
                                <p className='card-text text-start'>Status</p>
                            </div>
                        </div>
                    
                ))
            }
            </div>
        </>
    );
    
}

export default DashboardCards