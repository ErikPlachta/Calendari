import React, { useState, useEffect } from 'react';


const { 
  capitalizeFirstLetter,
  dateGetMonths,
  dateFormat,
  dateTimeFull,
  dateDayOfWeek,
  dateHourOfDay,
  dateGetTimePassed,
  dateTimeFullLocal
} = require('../../../utils/helpers');






//------------------------------------------------------------------------------
//-- EXPORT FUNCTION

export default function Client({nextStep, appointment_template}) {
  
  const [formDetails, setFormDetails] = useState({
    from_name: '',
    to_name: 'Erik Plachta',
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

  console.log(appointment_template)
  return (
    <section className="page clientContact">
      <h3>Enter your Contact Information</h3>
      <form id="clientContactForm" className="containerResults">
        {/* {appointment_template} */}
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    {/* CLIENT NAME */}
                    <span>
                      <label htmlFor='contact-name'>Your Name</label>
                      <input typeof='text' id="contact-name" defaultValue="Your name here"></input>
                    </span>
                    
                    {/* PHONE NUMBER */}
                    <span>
                      <label htmlFor='contact-phone'>Phone</label>
                      <input typeof='phone' id='contact-phone'></input>
                    </span>
                    <span className="form-element">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        name="phone"
                        id="phone"
                        type="tel"
                        aria-label="Please enter your phone number"
                        placeholder="ex. (111)-111-1111"
                        autoComplete='tel'
                        onKeyUp={onKeyUpPhone}
                        // value={toSend.from_phone} //-- not needed, defined above in cleanup function.
                      />
                    </span>
                    
                    {/* EMAIL ADDRESS */}
                    <span>
                      <label htmlFor='contact-email'>Email</label>
                      <input typeof='email' id='contact-email'></input>
                    </span>

                    {/* DESCRIPTION */}
                    <span>
                      <label htmlFor='contact-description'>Description</label>
                      <textarea  id='contact-email' rows="10" />
                    </span>

                    {/* SUBMIT BUTTON */}
                    <span>
                      <label htmlFor='contact-submit'></label>
                      <button onClick={nextStep} id='contact-submit'>
                        Create my Appointment  
                      </button>
                    </span>

                  </div>
            );
          }
        })()}
      {/* 
      {Object.keys(appointment_types).map( (appointment_type, index) => (        
        
        
      */}
        abc
      </form>
    </section>
    
  )
}
