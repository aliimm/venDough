import React from 'react'
import { NavLink } from 'react-router-dom'
import './homepage.css'
import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar();

const HomePage = () => {

    progress.start();

    setTimeout(() => {
        progress.finish();
      }, 1000);





    return (
        <div className='homepage-container-div'>
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
            <div className='img-container-splash'>
               <div>
                   <h1 className='fast-safe-message'>Fast, safe, social payments</h1>
                   <p className='p-tag-splash'>Pay. Get paid. Shop. Share. Join tens of millions of people on vendough.</p>
               </div>


               <img className='img-spash' src='https://images.ctfassets.net/gkyt4bl1j2fs/1lkW032LqzVC0G3hUHAXER/0698a44d0c6c360f99ee08025146891e/Homepage_Desktop_UI_Comp_01_Partial_A.png?w=1157&h=1387&q=50&fm=webp&bg=transparent'></img>
               <div className='github-icon'>
                   <a href="https://github.com/aliimm" className='linkedINsNavlink'>
                       <i class="fa-brands fa-github fa-3x"></i>
                   </a>
               </div>


               <div className='linkedin-icon'>
                   <a href="https://www.linkedin.com/in/alim-hussain-a86b72249/" className='linkedINsNavlink'>
                       <i class="fa-brands fa-linkedin fa-3x"></i>
                   </a>
               </div>
           </div>
        </div>
    )
}

export default HomePage
