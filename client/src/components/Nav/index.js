import React, { useEffect } from 'react';
import {capitalizeFirstLetter} from '../../utils/helpers';

export default function Nav(props) {
    const {} = props;

    return (
        <header> 
            <h2 alt="appointment scheduler">Appointment Scheduler</h2>
            <nav>
                <ul>
                    <li>
                        <a href="#signup" alt="signup">Signup</a>
                    </li>
                    <li>
                        <a href="#login" alt="login">Login</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}