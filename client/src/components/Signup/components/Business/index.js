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
export default function Business({nextStep}) {

  //-- reference variable for the captcha result response code
  const recaptchaRef = React.createRef();
  
  const [businessDetails, setBusinessDetails] = useState({
    business_name: '',
    brand_name: '',
    to_name: 'Calendari',
    from_phone: '',
    message: '',
    reply_to: '',
    subject: '',
    'g-recaptcha-response': '',
  });

  //-- event listner on input
  const handleChange = (event) => {
    setBusinessDetails({ ...businessDetails, [event.target.name]: event.target.value,  });
  };

  // console.log(appointment_template)
  return (
    <section className="signupBusiness">
      <header>
        <h3>Tell us about your Business</h3>
        <p>
          In this section you'll define your business details, some of which are
          displayed on your public scheduler link.
        </p>
      </header>
      <form id="business" className="signupCard" onSubmit={nextStep}>
        {/* {appointment_template} */}
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    {/* BUSINESS NAME */}
                    <span className="form-element">
                      <label htmlFor="business-name">Business Name:</label>
                      <input
                        name='business_name'
                        id="business-name"
                        type='text'
                        placeholder='Enter your business name'
                        required
                        onChange={handleChange}
                        value={businessDetails.name}
                      />
                    </span>
                    
                    {/* BRAND_NAME */}
                    <span className="form-element">
                      <label htmlFor="business-brand-name">Your URL Name:</label>
                      <input
                        name='brand_name'
                        id="business-brand-name"
                        type='text'
                        placeholder='Enter your business name'
                        // required
                        onChange={handleChange}
                        value={businessDetails.brand_name}
                      />
                      {/* <span>
                        https://calendari.day/s/<span id="brand-name-url"></span>
                      </span> */}
                    </span>
                    
                    {/* Welcome Message */}
                    {/* <span>
                      <label htmlFor='business-welcome'>Welcome Message:</label>
                      <textarea  id='business-welcome' rows="10" />
                    </span> */}

                    {/* SUBMIT BUTTON */}
                    <span className="form-element"> 
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
