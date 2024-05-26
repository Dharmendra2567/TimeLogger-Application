import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const UserSidebar = () => {
    const [toggle, setToggle] = useState(false);
    const [showCloseBtn, setShowCloseBtn] = useState(true);
    const [showIconbar,setShowIconbar] = useState(true)

    const closeBtnClicked = () => {
        setToggle(false);
    };
    const iconBtnClicked = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        // Check if the screen width is large enough
        if (window.innerWidth >= 1100) {
            setToggle(true);
            setShowCloseBtn(false); // Hide close button
            setShowIconbar(false)
        } else {
            setToggle(false);
            setShowCloseBtn(true); // Show close button
            setShowIconbar(true)
        }

        // Add event listener for window resize
        const handleResize = () => {
            // Update toggle state based on screen width
            if (window.innerWidth >= 1100) {
                setToggle(true);
                setShowCloseBtn(false); // Hide close button
                setShowIconbar(false)
            } else {
                setToggle(false);
                setShowCloseBtn(true); // Show close button
                setShowIconbar(true)
            }
        };
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {showIconbar &&(
                <span className='navbar-icon' onClick={iconBtnClicked}></span>
            )}
            {toggle &&(
                <div className="side-bar">
                    <div className='d-flex text-dark custom-bg p-2 justify-content-start px-4 align-items-top'>
                        <div>
                            <i className='bi bi-person-circle' style={{ fontSize: '40px' }}></i>
                        </div>
                        <div className='ms-3'>
                            <h5>Lakshya Purohit</h5>
                            <p>purohit@gmail.com</p>
                        </div>
                    </div>
                    {showCloseBtn && (
                        <span className="close-btn" type="button" onClick={closeBtnClicked}></span>
                    )}
                    <hr></hr>
                    <div className="list-in-side">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="#">About</Link>
                            </li>
                            <li>
                                <Link to="#">Services</Link>
                            </li>
                            <li>
                                <Link to="#">Contact</Link>
                            </li>
                            <li>
                                <Link to="#">Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className='text-dark'></hr>
                </div>
            )}
        </>
    );
}

export default UserSidebar;
