//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import Auth from "../../utils/authServices"; //  if singup worked, this should happen

//------------------------------------------------------------------------------
//-- PAGES
import PageNotFound from '../../pages/PageNotFound';

//------------------------------------------------------------------------------
//-- SUB COMPONENTS
import ProgressBar from '../../components/ProgressBar';
import Client from './components/Client';
import Business from './components/Business';
import Confirmation from './components/Confirmation';

//------------------------------------------------------------------------------
//-- ASSETS
//-- Hardcoded data used to simulate the Database
import {ADD_USER, ADD_BUSINESS} from '../../utils/mutations';
const DB_Business = require('../../assets/json/business.json'); //TODO:: 04/05/22 #EP|| Make GraphQL Connections here

//------------------------------------------------------------------------------
//-- Helpers
const { 
  capitalizeFirstLetter,
  dateGetMonths,
  dateFormat,
  dateTimeFull,
  dateDayOfWeek,
  dateHourOfDay,
  dateGetTimePassed,
  dateTimeFullLocal
} = require('../../utils/helpers');


//------------------------------------------------------------------------------
/* EXPORT FUNCTION - Signup */
export default function Signup() {

  //-- MUTATIONS
  const [addUser, { addUserError }] = useMutation(ADD_USER); 
  const [addBusiness, { addBusinessError }] = useMutation(ADD_BUSINESS);

  useEffect(() => { //-- updates the page title
    document.title = `Calendari - Signup`;
  },[]);

  //-- holds form submissions
  const [signupForm, setSignupForm] = useState({ //-- when form submission happens, stores here via the nextStep function
    "business": {},
    "user"  : {
      businessId: ''
    }
  })

  const [newAccount, setNewAccount] = useState({ //-- the user form payload
    "user"      : "",   //-- the users data
    "business"  : "",   //-- the business data for the client //TODO:: 04/12/22 #EP | Connect to GQL
  })

  // const [appointment_types,set_appointment_types] = useState({}); //-- types of appointments to be loaded on businessScheduler page
  const [appointment_template, setAppointment_template] = useState("test"); //-- when it's to be built, know what to do with it
  
  const [step, setStep] = useState(1);  //-- The current step for scheduling is always 1 by default  
  
  const [appointment_confirmation_id, setAppointment_confirmation_id] = useState(); //-- when finalized used to build appt
  // let appointment_confirmation_id = ""; //-- placeholder
  //-- Extract URL Parameters
  const {business_id_or_brand_name, appointment_type_id} = useParams();

  //-- Verifying if requests are made properly or not
  const [state, setState] = useState( false );

  //----------------------------------------------------------------------------
  /* VALIDATING PARAMS  */
  const validateParams = () => {  //-- Determine which params are sent in and route or re-route accordingly.
    let validRequest = true; //-- 04/10/22 #EP || ATM always true, but need to know if  offline
    setState(validRequest)
    return validRequest; //-- return results to update the title-bar accordingly
  }
  
  useEffect(() => {
    const validRequest = validateParams(); //-- 04/12/22 #EP|| Always valid until offline awareness.
    if(validRequest){ document.title = `Calendari - Signup`}; //-- IF valid request is TRUE, update title with business name. 
    if(!validRequest){ document.title = `Calendari - Invalid Request`}; //-- IF NOTE valid request is TRUE, update title with Invalid Request
  },[]);
  

  //----------------------------------------------------------------------------
  /* Page Location and Logic */

  const nextStep = nextStepButton => { //-- Move to the next step until LAST step

    nextStepButton.preventDefault();
    const results = nextStepButton.target;              //-- used to build dict for mutation
    const resultsLength = nextStepButton.target.length; //-- used to build the dict for mutation
    const nextStepButton_id = nextStepButton.target.id; //-- grab ID of selected button to verify submission
    
    //-----------------------------------
    //-- 1. Update state for submissions

    const formResults = {}  //--holds form submission results
    for(let i = 0; i < resultsLength-1; i++ ){ //-- iterates through all results excluding the button
      formResults[results[i].id] = results[i].value; //-- adds to dictionary
    }
    
    //---------------------------------
    //-- 2. form for business submitted
    if(nextStepButton.target.id == "business"){
      setNewAccount({...newAccount, "business"  : formResults })
    }

    //------------------------------
    //-- 3.  form for user submitted
    if(nextStepButton.target.id == "user"){
      setNewAccount({...newAccount, "user"  : formResults })
    }
    
    //------------------------------------------
    //-- 4. Final Form to submit so actual last step,here
    if(nextStepButton_id === "confirmation-submit"){ //-- if the contact-submit ( final button ) do API call
      // setAppointment_confirmation_id(nextStepButton_id); //TODO:: 04/10/22 #EP || Get form data here
      createAppointment(); //-- runs the mutations
    }

    //-- 5. move to next step
    else {
      setStep(step+1);
    }
  };
  
  const formerStep = formerStepButton => { //-- Go back a step
    formerStepButton.preventDefault();
    setStep(step-1);
  };


  const createAppointment = async params => {// TODO 04/10/22 #EP || to run the API REQUEST from form submit
    //-- When client information verified and submitted, update database with appointment data
    //-- mutations -> for reference
                      //--  const [addUser, { addUserError }] = useMutation(ADD_USER); 
                      // const [addBusiness, { addBusinessError }] = useMutation(ADD_BUSINESS);

    
    //- -try to create new business, then new user
    try {
      
      //--      ATTEMPT TO CREATE BUSINESS

      console.log("//-- creating business", newAccount.business)
      console.log(newAccount.busines)

      const { businessData } = await addBusiness({
        variables: { ...newAccount.business },
      });
      console.log("//-- creating business completed!")
      console.log(businessData)
      
      //TODO 04/14/22 #EP || Get Business ID here from response to send in with user
      const businessId = { 
        "businessID" : businessData._id  //-- extract business ID from response
      }
      setNewAccount({...newAccount, "user"  : businessId }) //-- update user to post


      //--      ATTEMPT TO CREATE USER

      console.log("//-- creating user...")
      console.log(newAccount.user)
      const { userData } = await addUser({
        variables: { ...newAccount.user },
      });
      console.log("//-- creating user completed!")
      console.log(userData)


      //-- LOGIN SUCCESS, UPDATE JWT WITH AUTH AND RE-ROUTE
      Auth.login(userData.login);
    }
    

    //-- FAILED TO CREATE
    catch (error) { //-- Failure could be related to bad data, already used values, or no db connection
      const databaseErrors = { //- hold errors to send down
        'addBusinessErorr' : addBusinessError,
        'addUserError'     : addUserError
      }
      
      //-- PRINTING ERRORS
      console.log(`Catch Error: ${error}` )
      console.log(`Database Errors:`)
      console.log(databaseErrors)
      errorPopup(error,databaseErrors) //-- THIS HAPPENS IN THE COMPONENT CONFIRMATION
    }
    // return response;
  }


  //TODO:: 04/14/22 #EP || Make this appear
  const errorPopup = (error, databaseErrors) => {  //-- if error, show msg
     //-- Sends this to component Confirmation, and is used to notify on screen if database error
     
    // if ((error.toString()).includes('Incorrect credentials')) {
      
    document.getElementById("login-form-message").style.opacity="1";
    document.getElementById("login-form-message").classList.remove('fade-out');
    document.getElementById("login-form-message").classList.add('fade-in');
    // //-- blank out error
    // document.getElementById("signup-form-message").classList.add('fade-out');
    // document.getElementById("signup-form-message").style.opacity="0";
    // document.getElementById("signup-form-message").classList.remove('fade-in')
    // };
  }
  
  //----------------------------------------------------------------------------
  //-- PAGE LOCATION / INDEX 
  const signupPages = { //-- INDEX of Each Page, which is a step of scheduler
    1: <Business nextStep={nextStep} />,
    2: <Client nextStep={nextStep}  />,
    3: <Confirmation nextStep={nextStep} errorPopup={errorPopup} />
  };

  const [maxSteps, setMaxSteps] = useState( //-- Get the number of keys in the pages ( needs to be down here to function )
    Object.keys(signupPages).length
  );

  //----------------------------------------------------------------------------
  /*TODO:: Browser Local Storage State checking - Should it load anything from local-storage vs default */
  //----------------------------------------------------------------------------
  //-- RETURN STATEMENTS
  return (
    <section className="page signup">
      
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
        {(() => {
          switch(state) {    
            case true:  return (
              <section>
                  <section>
                    {signupPages[step]} {/* The current step / page in the scheduler */}
                  </section>
                  <ProgressBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} /> {/* The bottom status bar */}
              </section>
            );
            case false: return <PageNotFound />; //-- Shouldn't happen put here just in case, maybe server error
            default:    return "Loading..."; //TODO:: 04/10/22 #EP || Add component for loading
          }
        })()}
    </section>
  )
};

