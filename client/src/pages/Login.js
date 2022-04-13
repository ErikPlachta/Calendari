//-- IMPORTS
import React, { useState, useEffect } from 'react'
// import {Link} from 'react-router'
import { Redirect, Navigate } from 'react-router-dom';
import { emailValidate } from '../utils/helpers';
// import {capitalizeFirstLetter} from '../../utils/helpers';
// import Signup from "../Signup";

//-- JWT LOGIN & AUTH 
import Auth from "../utils/authServices"
import ReCAPTCHA from "react-google-recaptcha";


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

export default function Login() {

  //-- Form data goes here when submit to make the login attempt
  const [user, setUser] = useState({
    "email"     : "",
    "password"  : "",
    "submitAttempts" : 0,
    'g-recaptcha-response': '',
  });
  //-- When login pressed, attempt to login 
  const [login, { error }] = useMutation(LOGIN_USER);

  const recaptchaRef = React.createRef();

  //-- Update state based on user input
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setUser({ //-- update useState value
      ...user,
      [name]: value,
    });
    
    //-- If a username, password are in form and tried to submit, run this otherwise don't.
    if(user.email && user.password && user.submitAttempts>0 ){
      //-- blank out error if there was one
      document.getElementById("login-form-message").classList.add('fade-out');
      document.getElementById("login-form-message").style.opacity="0";
      document.getElementById("login-form-message").classList.remove('fade-in');
    }
  };

  //-- Take data from email/password, attempt to login with mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //-- count every attempt
    setUser({...user, submitAttempts: user.submitAttempts+1});
    //-- Attempt to login with Auth
    try {
      const { data } = await login({
        variables: { ...user },
      });
      Auth.login(data.login);
    }
    catch (error) {//-- Otherwise failure so update UI somehow
      errorPopup(error)
    }

  };

  //TODO:: 04/11/22 #EP || Onboard error message to UI
  const errorPopup = (error) => {
    if ((error.toString()).includes('Incorrect credentials')) {
      
      //-- Message for Incorrect Creds
      document.getElementById("login-form-message").style.opacity="1";
      document.getElementById("login-form-message").classList.remove('fade-out');
      document.getElementById("login-form-message").classList.add('fade-in');
    };
  }

  //-- Run once at load to verify if logged in already. If yes, re-routes
  useEffect(() => {
        
    if(Auth.isLoggedIn()){
      console.log("already logged in, redirecting to business page...")
      return (<Navigate replace to="/Business" />);
    }
  }, []);

  return (

    <section> 

      {(() => {
        //TODO:: 04/11/22 #EP || switch to not have !
        switch(Auth.isLoggedIn()) {    
          
          //-- if already logged in, route to busienss page
          case true:   return <Navigate replace to="/Business" />
          // "Already Logged In Placeholder (TODO:: 04/11/22 #EP || Route to Business page)"
          
          //-- if NOT logged in, prompt login screen
          case false:    return (
            <div className="signupInformation">
              <h2 alt="please login">Get Logged In</h2>
              <form onSubmit={handleFormSubmit}>
                {/* USER EMAIL */}
                <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    id="email"
                    minLength="8"
                    autoComplete='email'
                    value={user.email}
                    onChange={handleChange}
                />
                <br></br>
                {/* USER PASSWORD */}
                <input
                    placeholder="********"
                    name="password"
                    type="password"
                    id="password"
                    minlength="6"
                    autoComplete='current-password'
                    value={user.password}
                    onChange={handleChange}
                />
                <br></br>
                {/* SUBMIT BUTTON */}
                <button>Login</button>
              </form>
              {/* RECAPTCHA */}
              <span className="form-element" id='recaptcha'>
                {/* Captcha*/}
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                  onChange={e => (user['g-recaptcha-response']=e)}
                />
              </span>
              <p id="login-form-signup-message" style={{opacity: "1"}}>
                <a href='/signup'>Don't have an account yet? Get Signed Up, here!</a>
              </p>

              {/* Used to notify if login event failure */}
              <h5 id="login-form-message" style={{opacity: "0"}}>
                Invalid Credentials, please try again
              </h5>
              
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