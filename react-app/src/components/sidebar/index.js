import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {

    const userId = useSelector(state => state.session.user.id)


    // if (!user) return null


    return (
        <div>
            <NavLink to={`/${userId}/payment-methods`}>

                hrl
            </NavLink>
        </div>
    )


}
export default Sidebar
