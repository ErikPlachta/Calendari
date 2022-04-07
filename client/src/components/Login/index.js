import React from 'react'
import {Link} from 'react-router'
import { validateEmail } from '../../utils/helpers';
import {capitalizeFirstLetter} from '../../utils/helpers';
import Signup from "../Signup";

export default function Login(props) {
  const {} = props;

  const errorPopup = (e) => {
    if (e.target.naame === 'email') {
      const isEmail = validateEmail(e.target.value);
      if (!isEmail) {
        setErrorMessagae("Your email isn't valid");
      } else {
        setErrorMessagae('');
      }
    } else {
      if (!e.target.value.length) {
        setErrorMessagae(`${e.target.password} is required`);
      } else {
        setErrorMessagae('')
      }
    }
  }

  return (
      <section> 
          <h2 alt="please login">Please login to continue</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" defaultValue={email} onBlur={errorPopup}/>
          </div>
          <div>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" defaultValue={password} onBlur={errorPopup}/>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            <li><Link to={"/Signup"} state={{from: Login}}>Don't have an account? Please Sign up to continue</Link></li>
          </div>
      </section>
  )
}
