import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router'
import { emailValidate } from '../utils/helpers';
// import {capitalizeFirstLetter} from '../../utils/helpers';
// import Signup from "../Signup";

//-- JWT LOGIN AUTH LOGIC
import Auth from "../utils/authServices"
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

export default function Login(props) {
  const {} = props; //-- placeholder maybe use?


  //-- 
  const [user, setUser] = useState("");
  //-- When login pressed, attempt to login 
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    //TODO:: 04/11/22 #EP || uncomment this
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...user },
      });
      Auth.login(data.login.token);
    }
    
    catch (e) {
        //TODO:: 04/11/22 #EP || Add UI msg here instead
        console.log(`Error: ${e}`);
        console.error(`${e}`);
    }

  };


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
        <h2 alt="please login">Please login to continue</h2>
        <div>
          <form onSubmit={handleFormSubmit}>
            {/* USER EMAIL */}
            <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                autoComplete='email'
                value={user.email}
                onChange={handleChange}
            />
            
            {/* USER PASSWORD */}
            <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                autoComplete='current-password'
                value={user.password}
                onChange={handleChange}
            />
            
            {/* SUBMIT BUTTON */}
            <button className="btn d-block w-100" type="submit">
                Submit
            </button>
          </form>
        </div>
    </section>
  )
}