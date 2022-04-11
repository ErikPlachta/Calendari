import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router'
import { emailValidate } from '../utils/helpers';
// import {capitalizeFirstLetter} from '../../utils/helpers';
// import Signup from "../Signup";

//-- JWT LOGIN AUTH LOGIC
import Auth from "../utils/authServices"
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

export default function Login() {

  //-- Form data goes here when submit to make the login attempt
  const [user, setUser] = useState({
    "email"     : "",
    "password"  : ""
  });
  //-- When login pressed, attempt to login 
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    
    //-- blank out error if there was one
    document.getElementById("login-form-message").innerText="";
    
  };

  //-- Take data from email/password, attempt to login with mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //-- Attempt to login with Auth
    try {
      const { data } = await login({
        variables: { ...user },
      });
      Auth.login(data.login.token);
    }
    
    //-- Otherwise failure so update UI somehow
    catch (e) {
      //TODO:: 04/11/22 #EP || Add UI msg here instead
      // console.log(`Error: ${e}`);
      // console.error(`${e}`);
      errorPopup(e)
    }

  };

  //TODO:: 04/11/22 #EP || Onboard error message to UI
  const errorPopup = (e) => {
    // console.log(e)
    if ((e.toString()).includes('Incorrect credentials')) {
      console.log("incorrect creds")
      document.getElementById("login-form-message")
        .innerText="Invalid Credentials, please try again."
    } 
    
    else {
      
    }
  }

  //-- Run once at load to verify if logged in already. If yes, re-routes
  useEffect(() => {
        
    console.log(Auth.isLoggedIn())
  }, []);

  return (

    <section> 

      {(() => {
        //TODO:: 04/11/22 #EP || switch to not have !
        switch(!Auth.isLoggedIn()) {    
          
          //-- if already logged in, route to busienss page
          case true:   return "Already Logged In Placeholder (TODO:: 04/11/22 #EP || Route to Business page)"
          
          //-- if NOT logged in, prompt login screen
          case false:    return (
            <div className="login-form containerResults">
              <h2 alt="please login">Please login to continue</h2>
              <form onSubmit={handleFormSubmit}>
                {/* USER EMAIL */}
                <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    id="email"
                    minlength="8"
                    autoComplete='email'
                    value={user.email}
                    onChange={handleChange}
                />
                
                {/* USER PASSWORD */}
                <input
                    className="form-input"
                    placeholder="********"
                    name="password"
                    type="password"
                    id="password"
                    minlength="8"
                    autoComplete='current-password'
                    value={user.password}
                    onChange={handleChange}
                />
                
                {/* SUBMIT BUTTON */}
                <input
                  type="submit"
                  value="Login"
                  id="login-form"
                />
              </form>

              {/* Used to notify if login event failure */}
              <span id="login-form-message"></span>
            </div>
          )

          //-- If waiting for element to load, indicate it.
          //TODO::04/11/22 #EP | Add loading element
          default:    return "Loading...";
        }
        
      })()}
    </section>
  )
}