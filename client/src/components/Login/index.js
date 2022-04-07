import React from 'react'
import {capitalizeFirstLetter} from '../../utils/helpers';

export default function Login(props) {
  const {} = props;

  return (
      <header> 
          <h2 alt="appointment scheduler">Appointment Scheduler</h2>
          <nav>
              <ul>
                  <li>
                      <a href="#signup">Signup</a>
                  </li>
                  <li>
                      <a href="#signup">Login</a>
                  </li>
              </ul>
          </nav>
      </header>
  )
}
