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
} = require('../../../../utils/helpers');

//------------------------------------------------------------------------------
//-- EXPORT FUNCTION
export default function Client({nextStep}) {

  //-- reference variable for the captcha result response code
  const recaptchaRef = React.createRef();
  
  const [userDetails, setUserDetails] = useState({
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
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value,  });
  };

  // console.log(appointment_template)
  return (
    <section className="page signupBusiness">
      <header>
        <h3>Enter Your information</h3>
        <p>
          In this section you'll define your details, which will be used to login 
          and manage your scheduler.
        </p>
      </header>
      <form id="clientContactForm" className="signupCard" onSubmit={nextStep}>
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
                        // required
                        autoComplete='given-name'
                        onChange={handleChange}
                        value={userDetails.client_name}
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
                        // required
                        autoComplete="email"
                        onChange={handleChange}
                        value={userDetails.reply_to}
                      />
                    </span>

                    {/* SUBMIT BUTTON */}
                    <span class="form-element"> 
                      <button type="submit" id="contact-submit" value="Next">Next</button>
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
