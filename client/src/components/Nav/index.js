import React, { useEffect } from 'react';
import {capitalizeFirstLetter} from '../../utils/helpers';

export default function Nav(props) {
    const { bob1 } = props;

    return (
        <header className="navHeader"> 
            <div>
                
                <img className="brandLogo" alt="Bob" src={bob1} width="50px"></img>
                
                <span className="brandNameSlogan">
                    <h2 className="brandName" alt="appointment scheduler">
                        Calendari
                    </h2>
                    <span>Your schedule -- untangled</span>
                </span>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="/signup" alt="signup">Signup</a>
                    </li>
                    <li>
                        <a href="/login" alt="login">Login</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}