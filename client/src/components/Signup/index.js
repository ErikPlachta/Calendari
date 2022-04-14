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
import User from './components/User';
import Business from './components/Business';
import Confirmation from './components/Confirmation';

//------------------------------------------------------------------------------
//-- ASSETS
//-- Hardcoded data used to simulate the Database
import {ADD_USER, ADD_BUSINESS, ADD_APPT_TYPE, LOGIN_USER } from '../../utils/mutations';
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
  const [addApptType, { addApptTypeError }] = useMutation(ADD_APPT_TYPE);

  const [login, { error }] = useMutation(LOGIN_USER); //-- When login pressed, attempt to login 

  useEffect(() => { //-- updates the page title
    document.title = `Calendari - Signup`;
  },[]);

  const [newBusiness, setNewBusiness] = useState({
    'name' :'',
    'brandName' :''
  })

  const [newAccount, setNewAccount] = useState({ //-- the user form payload
    "business": {
      'name' :'',
      'brandName' :''
    },
    "user"  : {
      "businessId"  : '',
      "brandName"   : '',
      "nameFirst" : '',
      "nameLast"  : '',
      "email" : '',
      "username"  : '',
      "password"  : '',
      "phoneNumber" : '',
    },
    "appointment_type" : {
      "businessId"  : "",
      "business_id"  : "",
      "apptTypeName": "General",
      "summary"     : "Schedule an appointment"
      // TODO:: Add more than 1 type
    }
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

    let formResults = {}  //--holds form submission results
    for(let i = 0; i < resultsLength-1; i++ ){ //-- iterates through all results excluding the button
      formResults[results[i].id] = results[i].value; //-- adds to dictionary
    }
    
    //---------------------------------
    //-- 2. form for business submitted
    if(nextStepButton.target.id == "business-form"){
      console.log(nextStepButton.target.id)
      setNewAccount({...newAccount, business: formResults })
      console.log(newAccount)
      console.log(formResults)
    }

    //------------------------------
    //-- 3.  form for user submitted
    if(nextStepButton.target.id == "user-form"){
      setNewAccount({...newAccount, user: formResults })
    }
    
    //------------------------------------------
    //-- 4. Final Form to submit so actual last step,here
    if(nextStepButton_id == "confirmation-submit"){ //-- if the contact-submit ( final button ) do API call
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


  //----------------------------------------------------------------------------
  /* Page Location and Logic */

  const createAppointment = async params => {// TODO 04/10/22 #EP || to run the API REQUEST from form submit
    //-- When user information verified and submitted, update database with appointment data

    //- -try to create new business, then new user
    try {
      var businessId= "NaN"; //-- to be defined at time of biz creation
      var brandName = 'NaN';
      

      console.log("//-- Creating New Account..", newAccount)
      
      
      //--      1. ATTEMPT TO CREATE BUSINESS
      console.log("//-- creating business...", newAccount.business)
      const create = await addBusiness({
        variables: { ...newAccount.business },
      })    
      
      //--      2. ADD businessId RESPONSE TO STATE
      .then(results=>{
        
        businessId = results.data.addBusiness._id;
        brandName = results.data.addBusiness.brandName;
        // const businessId = { 
        //   "businessId" : results.data.addBusiness._id  //-- extract business ID from response
        // }
        // setNewAccount({
        //   ...newAccount,
        //   [results] : results,
        // }); //-- update user to post
        // setNewAccount({...newAccount, user: businessId }) //-- update user to post
        // setNewAccount({...newAccount, appointment_type: businessId }) //-- update user to post
        setNewBusiness({ results });
        setNewAccount({...newAccount, business_id: [results.data] })
       
        // console.log("//-- results businessData..")
        // console.log(results)
        // console.log("//-- creating business completed!")
        // console.log(`businessId`)
        // console.log(businessId)
        // console.log("//-- completed business_id value!")
      });

      // console.log("//-- New Account with Business")
      // console.log(newAccount)
      // console.log(newBusiness)
      
      // var businessId = '6258512a827ae3493855de82'
      //--      3. ATTEMPT TO CREATE APPOINTMENT_TYPE 
      
      // newAccount.appointment_type['businessId'] = '6258512a827ae3493855de82';
      newAccount.appointment_type['businessId'] = businessId;
      
      const apptType = await addApptType({
        variables: { ...newAccount.appointment_type },
      })
      .then(results => {
        console.log(results)
      })
       
      
      //--      4. ATTEMPT TO CREATE USER
      // console.log("//-- creating user...")

      
      // newAccount.user['businessId'] = '6258512a827ae3493855de82';
      newAccount.user['businessId'] = businessId;
      newAccount.use['brandName'] = brandName;
      // console.log(newAccount.user)
      
      const userData  = await addUser({
        variables: { ...newAccount.user },
      })
      .then(results =>{
        
        console.log("//-- creating user completed!")
        


        console.log("attempt auth")
        console.log(results.data.addUser)
        
        const loginData={
          _id     : results.data.addUser._id,
          password : newAccount.user.password,
          email : newAccount.user.email
        }

        
        //-- LOGIN SUCCESS, UPDATE JWT WITH AUTH AND RE-ROUTE
        const userData = login({
            variables: { ...loginData },
        }).
        then(results =>{
          Auth.login(results.data.login);
        })

      })

      

      /*
        resultsfunction
      */
      
      // .then(()=>{

      //   console.log("//-- creating appointment types", newAccount.appointment_type)  
      //   const { apptType } = addApptType({
      //   variables: { ...newAccount.apptType },
      //   })
      //   return apptType;
      // })

      //--      4. ATTEMPT TO CREATE USER

      // console.log("//-- creating user...")
      // console.log(newAccount.user)
      // const { userData } = await addUser({
      //   variables: { ...newAccount.user },
      // });
      // console.log("//-- creating user completed!")
      // console.log(userData)


      //-- LOGIN SUCCESS, UPDATE JWT WITH AUTH AND RE-ROUTE
      // Auth.login(userData.login);
    }
    

    //-- FAILED TO CREATE
    catch (error) { //-- Failure could be related to bad data, already used values, or no db connection
      const databaseErrors = { //- hold errors to send down
        'addBusinessError'  : addBusinessError,
        'addUserError'      : addUserError,
        'addApptTypeError'  : addApptTypeError
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
    
    //TODO:: 02/14/22 #EP || Add Error awareness
     
    // if error E11000 duplicate key error collection: calendari
    
     // if ((error.toString()).includes('Incorrect credentials')) {
      
    // document.getElementById("login-form-message").style.opacity="1";
    // document.getElementById("login-form-message").classList.remove('fade-out');
    // document.getElementById("login-form-message").classList.add('fade-in');
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
    2: <User nextStep={nextStep}  />,
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

