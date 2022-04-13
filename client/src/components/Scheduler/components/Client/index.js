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

export default function Client({nextStep, createAppointment, appointment_template}) {

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
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value,  });
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
    <section className="page scheduleAppointment">
      <header>
        <h3>Enter your Contact Information</h3>
      </header>
      
      <form id="clientContactForm" className="appointmentCard" onSubmit={nextStep}>
        {/* {appointment_template} */}
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    {/* CLIENT NAME */}
                    <span className="form-element">
                      <label htmlFor="client-name">Your Name</label>
                      <input
                        name='from_name'
                        id="client-name"
                        type='text'
                        placeholder='Full Name'
                        required
                        autoComplete='given-name'
                        onChange={handleChange}
                        value={formDetails.client_name}
                      />
                    </span>
                    
                    {/* PHONE NUMBER */}
                    
                    <span className="form-element">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        name="phone"
                        id="contact-phone"
                        type="tel"
                        aria-label="Please enter your phone number"
                        placeholder="ex. (111)-111-1111"
                        autoComplete='tel'
                        onKeyUp={onKeyUpPhone}
                        // value={toSend.from_phone} //-- not needed, defined above in cleanup function.
                      />
                    </span>
                    
                    {/* EMAIL ADDRESS */}
                    <span className="form-element">
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        name="reply_to"
                        id="contact-email"
                        type="email"
                        placeholder='your@email.com'
                        required
                        autoComplete="email"
                        onChange={handleChange}
                        value={formDetails.reply_to}
                      />
                    </span>

                    {/* DESCRIPTION */}
                    <span>
                      <label htmlFor='contact-description'>Description</label>
                      <textarea  id='contact-description' rows="10" />
                    </span>

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
                      <input type="submit" className="button" id="contact-submit" value="Submit" />
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
