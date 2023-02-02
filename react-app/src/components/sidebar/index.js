import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LogoutButton from '../auth/LogoutButton'
import { NavLink } from 'react-router-dom';
import './sidebar.css'
import { useHistory, Redirect } from "react-router-dom";






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



                <div className='payment-method-div-sidebar'>
                    <NavLink to={`/${session.id}/payment-methods`} className='paymentMethodsNavlink'>
                        Payment Methods
                    </NavLink>

                    <a href="https://www.linkedin.com/in/alim-hussain-a86b72249/" className='linkedINsNavlink'>
                        LinkedIn
                    </a>

                    <a href="https://github.com/aliimm" className='linkedINsNavlink'>
                        GitHub
                    </a>

                <div className='linkedINsNavlink'>
                <LogoutButton onClick={() => history.push('/')} />
                </div>
                </div>
            </div>



        </>

    )


}
export default Sidebar
