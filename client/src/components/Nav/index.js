import React, { useEffect, useState } from 'react';
import {capitalizeFirstLetter} from '../../utils/helpers';
import Auth from '../../utils/authServices';
import { Link } from 'react-router-dom';

export default function Nav({ bobData, bob2 }) {

    //--------------------------------------------------------------------------
    //-- ASSETS
    const [bobs, setBobs] = useState({bobData});//-- Path to BOB SVG Icons //TODO:: 04/13/22 #EP|| Delete?

    //--------------------------------------------------------------------------
    //-- FUNCTIONS
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    
    //--------------------------------------------------------------------------
    //-- RETURN 
    return (
        <header className="navHeader"> 
            <div>  
                
                <Link to="/">
                    <img className="brandLogo" alt="Bob" src={bob2} width="50px"></img>
                </Link>
                <Link to="/">
                    <span className="brandNameSlogan">
                    <h2 className="brandName" alt="appointment scheduler">
                        Calendari
                    </h2>
                </span>
                </Link>
            </div>
            {/* NAVIGATION */}
            <nav>
                <ul>
                    {/*TODO:: 04/11/22 #EP || Add about pages  */}
                    {Auth.isLoggedIn() 
                        
                        //-- If logged in, show this
                        ? (<>
                            <li> <a href="/">Calendari</a> </li>
                            <li>
                                <Link 
                                    to={"/business/"+Auth.getBusinessId()}>
                                    Business
                                </Link>
                            </li>
                            <li> <Link to="/business">Scheduler</Link></li>
                            <li><a href="/" onClick={logout}> Logout </a> </li>
                            {/*TODO:: 04/11/22 #EP || Add Support page for if need help  */}
                            {/* <li>Support</li> */}
                        </>)
                        
                        //-- If not logged in, show this
                        : (<>
                            <li> <a href="/#whatIsThis">Calendari</a> </li>
                            <li> <a href="/#whyIsThisDifferent">About</a> </li>
                            <li> <a href="/#freeVsPremium">Features</a> </li>
                            <li> <Link to="/login">Login</Link> </li>
                            <li> <Link to="/signup">Signup</Link> </li>
                        </>)   
                    }  
                </ul>
            </nav>
        </header>
    )
};
