import React from 'react';
// import {Link} from 'react-router'
import { emailValidate } from '../utils/helpers';
// import {capitalizeFirstLetter} from '../../utils/helpers';
// import Login from "../Login";

export default function Signup(props) {
  const {} = props;

  const errorPopup = (e) => {
    if (e.target.naame === 'email') {
      const isEmail = emailValidate(e.target.value);
      if (!isEmail) {
        // setErrorMessagae("Your email isn't valid");
      } else {
        // setErrorMessagae('');
      }
    } else {
      if (!e.target.value.length) {
        // setErrorMessagae(`${e.target.password} is required`);
      } else {
        // setErrorMessagae('')
      }
    }
  }

  return (
    <section> 
      <h2 alt="please sign up" class="pinkh2">Please sign up to continue</h2>
      <div class="signupInformation">
        <div>
          <label htmlFor="email">Email:</label>
          {/* <input type="text" name="email" defaultValue={email} onBlur={errorPopup}/> */}
          <input type="text" name="email" defaultValue="{email}" onBlur={errorPopup}/>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" defaultValue="{password}"  onBlur={errorPopup}/>
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        <div>
          {/* <li><Link to={"/Login"} state={{from: Signup}}>Already have an account? Please Log in to continue</Link></li> */}
        </div>
      </div>

    </section>
  )
}
