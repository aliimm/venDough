import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from '../auth/LogoutButton'
import { NavLink } from 'react-router-dom';
import './sidebar.css'
import { useHistory } from "react-router-dom";






const Sidebar = () => {

    const session = useSelector(state => state.session.user)
    const history = useHistory()


    if (!session) return null


    return (
        <>
            <div className='sidebar'>

                <div className='vendough-logos'>
                    <NavLink to='/home' className='navlink-home'>
                        vendough
                    </NavLink>
                </div>
                <div className='Profile-section'>
                    <img className='avi-sidebar' src={session.profile_photo}></img>
                    <div className='name-username-sidebar'>
                        <div className='welcome-customer'>Hi, {session.first_name}</div>
                        <div className='username-sidebar'>@{session.username}</div>
                    </div>
                </div>
                <div className='PayButton-sidebar-div'>
                    <button className='PayButton-sidebar'
                        onClick={() => history.push(`/${session.id}/send`)}
                    >Pay</button>

                </div>




                <NavLink to={`/${session.id}/payment-methods`}>
                    Payment Methods
                </NavLink>
                <LogoutButton onClick={() => history.push('/')} />
            </div>



        </>

    )


}
export default Sidebar
