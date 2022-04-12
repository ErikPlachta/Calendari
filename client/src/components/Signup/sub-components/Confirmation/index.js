import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

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
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value, });
  };

  //-- phone validation
  function onKeyUpPhone(event){

    //-- if trying to erase, don't try to format
    if(event.key === "Backspace" || event.key === 'Delete'){ return null;}
     
    //-- extract value
     const phoneIn = event.target.value;
     //-- get current stored value
    //  const phoneCurrent = toSend.from_phone;
     
     //-- if nothing just exit
     if(!phoneIn) return;

    //-- clean it up  
    const digits = phoneIn.replace(/\D/g, '');

    //-- format it
    // const formattedDigits = (digits.substring(0,1) + '(' + digits.substring(1,4) + ')' + digits.substring(4,7) + '-' + digits.substring(7,11)); //-- with area code
    const formattedPhone = ('(' + digits.substring(0,3) + ')' + digits.substring(3,6) + '-' + digits.substring(6,10)); //-- without area-code

    // console.log(formattedPhone.length)
    
    //-- inline styling so red border until good.
    var input = event.target;
    var isError = ( (formattedPhone.length) < 13 );
    var color =  (isError) ? "red" : "grey";
    var borderWidth =  (isError)? "3px" : "1px"; 
    input.style.borderColor = color;
    input.style.borderWidth = borderWidth;
   
    
    //-- update ui input
    event.target.value = formattedPhone;
    //-- update data to send
    formDetails.from_phone = formattedPhone;
    return null;
  }

  // console.log(appointment_template)
  return (
    <section className="page signupConfirmation">
      <h3>Please Review the Following Information</h3>
      <p>Review the following information and then click Create Account to finalize your account setup.</p>
      
      {/* SUBMISSION FORM */}
      <form id="confirmation-submit" className="containerResults" onSubmit={nextStep}>
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    <h4>TODO:: Add details from previous forms here</h4>

                    {/* RECAPTCHA */}
                    <span className="form-element" id='recaptcha'>
                      {/* Captcha*/}
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                        onChange={e => (formDetails['g-recaptcha-response']=e)}
                      />
                    </span>

                    {/* SUBMIT BUTTON */}
                    <span className="form-element"> 
                      <input type="submit" className="button" id="confirmation-submit" value="Create my Account!" />
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
