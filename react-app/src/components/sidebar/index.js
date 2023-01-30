import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './sidebar.css'





const Sidebar = () => {

    const session = useSelector(state => state.session.user)



    // if (!user) return null


    return (
        <div className='sidebar'>
            <div className='Profile-section'>
                <div>Hi, {session.first_name}</div>
                <div>@{session.username}</div>


            </div>




            <NavLink to={`/${session.id}/payment-methods`}>
                Payment Methods
            </NavLink>
        </div>





    )


}
export default Sidebar
