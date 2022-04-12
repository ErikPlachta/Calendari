import React, { useEffect } from 'react';
import {capitalizeFirstLetter} from '../../utils/helpers';
import Auth from '../../utils/authServices';
import { Link } from 'react-router-dom';

export default function Nav({ bob_static }) {
    

    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <header className="navHeader"> 
            <div>  
                <img className="brandLogo" alt="Bob" src={bob_static} width="50px"></img>
                <span className="brandNameSlogan">
                    <h2 className="brandName" alt="appointment scheduler">
                        Calendari
                    </h2>
                </span>
            </div>
            {/* NAVIGATION */}
            <nav>
                <ul>
                    {/*TODO:: 04/11/22 #EP || Add about pages  */}
                    {Auth.isLoggedIn() 
                        //-- If logged in, show this
                        ? (<>
                            <li> <a href="/">Calendari</a> </li>
                            <li><Link to="/business">My Business</Link></li>
                            <li> <Link to="/business">My Scheduler</Link></li>
                            <li><a href="/" onClick={logout}> Logout </a> </li>
                            {/*TODO:: 04/11/22 #EP || Add Support page for if need help  */}
                            <li>Support</li>
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
            
            {/*TODO:: 04/11/22 #EP|| Remove once done testing  */}
            <div style={{position: "absolute", top:"0", right: "0", display: "flex", margin: "auto", flexDirection: "row", justifyContent:"space-evenly", border: "2px solid red" }}>
                <h5>Placeholder Links for Testing 👉🏼</h5>
                <a href="/s/0000-AAAA" alt="scheduler">schedule/0000-AAAA</a>
                <a href="/b/0000-AAAA" alt="business">business/0000-AAAA</a>
            </div>
        </header>
    )
};
