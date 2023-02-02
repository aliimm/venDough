import React from 'react'
import { NavLink } from 'react-router-dom'
import './homepage.css'

const HomePage = () => {





    return (
        <div>
            <div className='nav-bar-div-splash'>
                <div className='vendough-logo-splash'>vendough</div>
                <div className='built-with-tags'><p>React.JS</p></div>
                <div className='built-with-tags'><p>SQLAlchemy</p></div>
                <div className='built-with-tags'><p>Flask</p></div>


                {/* <div className='log-in-div-splash'> */}
                {/* </div> */}
                <div className='log-in-plus-sign-up'>
                    <NavLink className='log-in-navlink' to='/login'>Log In</NavLink>
                    <div className='Get-vendough-div'>
                        <NavLink className='get-vendough-text' to='/sign-up'>Get Vendough</NavLink>
                    </div>
                </div>


            </div>
            <div>
                <img className='img-spash' src='https://www.linkpicture.com/q/Screen-Shot-2023-02-02-at-2.46.11-AM.png'></img>

            </div>





        </div>
    )
}

export default HomePage
