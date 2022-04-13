//------------------------------------------------------------------------------
//-- IMPORTS
import React, { useState, useEffect } from 'react'
import { Redirect, Navigate } from 'react-router-dom';
import { emailValidate } from '../utils/helpers';

//------------------------------------------------------------------------------
//-- JWT LOGIN & AUTH 
import ReCAPTCHA from "../components/ReCAPTCHA";
import Auth from "../utils/authServices"

//------------------------------------------------------------------------------
//-- ASSETS / API
import { useMutation } from '@apollo/client';

// import { SUBMIT_SUPPORT_TICKET } from '../utils/mutations'; //-- TODO:: 04/13/22 #EP || Add ability to submit support tickets

//------------------------------------------------------------------------------
//-- FUNCTION -> Support
export default function Support() {
    //-- Standard "Support Form" Page
    const [formDetails, setFormDetails] = useState({ //-- Form data goes here when submit to make the login attempt
        "category"     : "",         //-- Account, Scheduler, Other
        "details"  : "",            //-- Need to knows of problem
        "submitAttempts" : 0,       //-- Tracking attempts //TODO:: 04/13/22 #EP | Future
        'g-recaptcha-response': '', //-- Hold response from Google
    });
    
    //-- PLACEHOLDER
    const [submitSupportTicket] = ("SUBMIT_SUPPORT_TICKET"); //-- When login pressed, attempt to login // const [submitSupportTicket, { error }] = useMutation(SUBMIT_SUPPORT_TICKET); //-- When login pressed, attempt to login 

    //--------------------------------------------------------------------------
    //-- Event handlers

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

    const handleFormSubmit = async (event) => { //-- Take data from email/password, attempt to login with mutation //TODO:: 04/13/22 #EP || build this out
        event.preventDefault();

        //-- count every attempt
        setFormDetails({...formDetails, submitAttempts: formDetails.submitAttempts+1});
        //-- Attempt to login with Auth
        // try {
        //   const { data } = await submitSupportTicket({
        //     variables: { ...user },
        //   });
        //   Auth.login(data.login);
        // }
        // catch (error) {//-- Otherwise failure so update UI somehow
        //   errorPopup(error)
        // }

    };
  
    const errorPopup = (error) => { //-- if error, show msg   //TODO:: 04/11/22 #EP || Onboard to
        
        if ((error.toString()).includes('Incorrect credentials')) { //-- Message for Incorrect Creds
            document.getElementById("login-form-message").style.opacity="1";
            document.getElementById("login-form-message").classList.remove('fade-out');
            document.getElementById("login-form-message").classList.add('fade-in');
        }

        else { //-- Universal Error Catching //TODO:: 04/13/22 #EP || Add better err-popup
            console.log(`
                //-- Error at   : ${window.location}
                        Error   : ${error}
                        Check your network connection or see admin.
            `)
        }
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
            switch(!Auth.isLoggedIn()) {    
            
            //-- if already logged in, route to busienss page
            case true:   return <Navigate replace to="/Business" />
            // "Already Logged In Placeholder (TODO:: 04/11/22 #EP || Route to Business page)"
            
            //-- if NOT logged in, prompt login screen
            case false:    return (
                <div className="signupInformation">
                <h2 alt="please login">Submit Support Ticket</h2>
                <form onSubmit={handleFormSubmit}>
                    {/*CATEGORY - The reason for the support ticket */}
                    <span className="form-element">
                        <label htmlFor="category">Category</label>
                        <select 
                            className="select"
                            id="category"
                            name="category" 
                            onChange={handleChange} 
                        >
                            <option  value="please select" selected>Choose a Category..</option>
                            <option  value="business">Business Account</option>
                            <option value="user">User Account</option>
                            <option value="scheduler">Scheduler</option>
                            <option value="other">Other</option>
                        </select>
                    </span>
                    
                    {/* DETAILS - Notes for the support ticket */}
                    <span className='form-element'>
                        <label htmlFor='details'>Summary of Issue</label>
                        <textarea
                            name='details'
                            type="textarea"
                            rows='10'
                            placeholder="I'm reaching out for support because..."
                            required
                            value={formDetails.details}
                            onChange={handleChange}
                        ></textarea>
                    </span>
                    
                    {/* reCAPTCHA */}
                    <ReCAPTCHA formDetails={formDetails} />
                    {/* SUBMIT BUTTON */}
                    <button>Login</button>
                </form>
                

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
};
