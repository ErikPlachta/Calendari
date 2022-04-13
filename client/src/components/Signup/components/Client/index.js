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
    userDetails.from_phone = formattedPhone;
    return null;
  }

  // console.log(appointment_template)
  return (
    <section className="page signupBusiness">
      <h3>Enter Your information</h3>
      <p>
        In this section you'll define your details, which will be used to login 
        and manage your scheduler.
      </p>
      <form id="clientContactForm" className="homeInformation" onSubmit={nextStep}>
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
