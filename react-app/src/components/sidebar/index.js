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
        <div className='sidebar'>
            <div className='vendough-logos'>
                vendough
            </div>
            <div className='Profile-section'>
                <img className='avi-sidebar' src='https://www.koimoi.com/wp-content/new-galleries/2022/11/drake-recently-dropped-a-hoax-video-interview-of-himself-in-which-he-talked-about-his-prn-preferences-001.jpg'></img>
                <div className='name-username-sidebar'>
                    <div className='welcome-customer'>Hi, {session.first_name}</div>
                    <div className='username-sidebar'>@{session.username}</div>
                </div>
            </div>
            <div className='PayButton-sidebar-div'>
                <button className='PayButton-sidebar'>Pay</button>

            </div>




            <NavLink to={`/${session.id}/payment-methods`}>
                Payment Methods
            </NavLink>
            <LogoutButton onClick={history.push('/')} />
        </div>





    )


}
export default Sidebar
