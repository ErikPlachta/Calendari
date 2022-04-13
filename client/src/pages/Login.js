//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react'
import { Redirect, Navigate } from 'react-router-dom';
import { emailValidate } from '../utils/helpers';
//------------------------------------------------------------------------------
//-- JWT LOGIN & AUTH 
import Auth from "../utils/authServices"
import ReCAPTCHA from "react-google-recaptcha";

//------------------------------------------------------------------------------
//-- RESOURCES

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
//-- TODO:: 04/12/22 #EP || Add Query to get business data based on the logged in user

//------------------------------------------------------------------------------
//-- MAIN FUNCTION -> Login
export default function Login() {

  const [user, setUser] = useState({ //-- Form data goes here when submit to make the login attempt
    "email"     : "",
    "password"  : "",
    "submitAttempts" : 0,
    'g-recaptcha-response': '',
  });
  
  const [login, { error }] = useMutation(LOGIN_USER); //-- When login pressed, attempt to login 
  
  //-- TODO:: 04/12/22 #EP || Add Query to get business data based on the logged in user
  
  
  const recaptchaRef = React.createRef(); //-- for for submission

  //----------------------------------------------------------------------------
  //-- FORM MAANGEMENT

  const handleChange = (event) => { //-- Update state based on user input
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

  //-- Attempted to Login
  const handleFormSubmit = async (event) => { //-- Take data from email/password, attempt to login with mutation
    event.preventDefault();
    //-- count every attempt
    setUser({...user, submitAttempts: user.submitAttempts+1});
    //-- Attempt to login with Auth
    try {
      const { data } = await login({
        variables: { ...user },
      });

      //-- LOGIN SUCCESS, UPDATE JWT WITH AUTH AND RE-ROUTE
      Auth.login(data.login);
    }
    //-- Otherwise failure so update UI somehow
    catch (error) { errorPopup(error)}
  };
  //-- The Error Message  to UI Manager
  const errorPopup = (error) => {
    //-- IF bad creds
    if ((error.toString()).includes('Incorrect credentials')) {   //-- Message for Incorrect Creds on UI
      document.getElementById("login-form-message").style.opacity="1";
      document.getElementById("login-form-message").classList.remove('fade-out');
      document.getElementById("login-form-message").classList.add('fade-in');
    };
  }

  //----------------------------------------------------------------------------
  //-- Use Effect to verify if logged in

  useEffect(() => { //-- Run once at load to verify if logged in already. If yes, re-routes
        
    if(Auth.isLoggedIn()){
      console.log("already logged in, redirecting to business page...")
      return (<Navigate replace to="/Business" />);
    }
  }, []);

  //----------------------------------------------------------------------------
  //-- Primary Return Function
  return (
    <section> 
      {(() => {
        //-- CHECK FOR JWT AUTH
        switch(Auth.isLoggedIn()) {    
          
          //-- IF EXISTS, REROUTE TO BUSINESS PAGE
          case true:   return <Navigate replace to="/Business" /> 
          
          //-- IF NOT, LOAD LOGIN PAGE CONTENT
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
          default:    return "Loading..."; //TODO::04/11/22 #EP | Add loading element
        }
        
      })()}
    </section>
  )
}