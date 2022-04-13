//------------------------------------------------------------------------------
//-- IMPORTS
import React, { useState, useEffect } from 'react'
import { Redirect, Navigate } from 'react-router-dom';

//------------------------------------------------------------------------------
//-- JWT LOGIN & AUTH 
import ReCAPTCHA from '../components/Recaptcha';
import Auth from "../utils/authServices"

//------------------------------------------------------------------------------
//-- ASSETS / API
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';



//------------------------------------------------------------------------------
//-- FUNCTION -> Login
export default function Login() {
  //-- The App's login page
  
  const [formDetails, setFormDetails] = useState({ //-- Form data goes here when submit to make the login attempt
    "email"     : "",
    "password"  : "",
    "submitAttempts" : 0,
    'g-recaptcha-response': '',
  });

  const [login, { error }] = useMutation(LOGIN_USER); //-- When login pressed, attempt to login 
  
  //--
  const handleChange = (event) => { //-- Update state based on user input
    const { name, value } = event.target;
    
    setFormDetails({ //-- update useState value
      ...formDetails,
      [name]: value,
    });
    
    //-- If a username, password are in form and tried to submit, run this otherwise don't.
    if(formDetails.email && formDetails.password && formDetails.submitAttempts>0 ){
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
    setFormDetails({...formDetails, submitAttempts: formDetails.submitAttempts+1});
    //-- Attempt to login with Auth
    try {
      const { data } = await login({
        variables: { ...formDetails },
      });
      Auth.login(data.login);
    }
    catch (error) {//-- Otherwise failure so update UI somehow
      errorPopup(error)
    }

  };

  const errorPopup = (error) => {  //-- if error, show msg
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
                <span className="form-element">
                <label for='password'>Email</label>
                  <input
                      placeholder="your@email.com"
                      name="email"
                      type="email"
                      id="email"
                      minLength="8"
                      autoComplete='email'
                      value={formDetails.email}
                      onChange={handleChange}
                  />
                </span>
                {/* USER PASSWORD */}
                <span className="form-element">
                  <label for='password'>Password</label>
                  <input
                      placeholder="********"
                      name="password"
                      type="password"
                      id="password"
                      minlength="6"
                      autoComplete='current-password'
                      value={formDetails.password}
                      onChange={handleChange}
                  />
                </span>
                {/* RECAPTCHA */}
                <ReCAPTCHA formDetails={formDetails} />
                {/* SUBMIT BUTTON */}
                <button>Login</button>
              </form>
              
              
              {/* LINK TO SIGNUP */}
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