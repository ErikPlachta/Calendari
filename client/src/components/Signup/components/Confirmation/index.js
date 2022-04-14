//------------------------------------------------------------------------------
//-- MODULES
import React, { useState, useEffect } from 'react';

//------------------------------------------------------------------------------
//-- JWT LOGIN & AUTH
import Recaptcha from "../../../Recaptcha";         //-- Required for Signup
import Auth from "../../../../utils/authServices";  //-- When signup happens, used to perform a login

//------------------------------------------------------------------------------
//-- HELPERS
const { 
  capitalizeFirstLetter,
  dateGetMonths,
  dateFormat,
  dateTimeFull,
  dateDayOfWeek,
  dateHourOfDay,
  dateGetTimePassed,
  dateTimeFullLocal
} = require('../../../../utils/helpers');

//------------------------------------------------------------------------------
//-- ASSETS / API

//------------------------------------------------------------------------------
//-- EXPORT FUNCTION
export default function Confirmtion({nextStep}) {

  //-- reference variable for the captcha result response code
  const recaptchaRef = React.createRef();
  
  const [formDetails, setFormDetails] = useState({
    from_name: '',
    to_name: 'Calendari',
    from_phone: '',
    message: '',
    reply_to: '',
    subject: '',
    'g-recaptcha-response': '',
  });

  //-- event listner on input
  const handleChange = (event) => {
    //TODO:: Write this out
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value, });
  };

  // console.log(appointment_template)
  return (
    <section className="page signupBusiness">
      <header>
        <h3>Please Review the Following Information</h3>
        <p>Review the following information and then click Create Account to finalize your account setup.</p>
      </header>
      
      {/* SUBMISSION FORM */}
      <form id="confirmation-submit" className="signupCard" onSubmit={nextStep}>
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    {/* <h4>TODO:: Add details from previous forms here and add Create Account Functionality</h4> */}

                    {/* RECAPTCHA */}
                    <Recaptcha formDetails={formDetails}/>

                    {/* SUBMIT BUTTON */}
                    <span className="form-element"> 
                      <button type="submit" className="button" id="confirmation-submit" value="Create Account!">Create Account!</button>
                    </span>

                  </div>
            )}
        })()}
      {/* 
      {Object.keys(appointment_types).map( (appointment_type, index) => (        
        
        
      */}
      </form>
    </section>
    
  )
}
