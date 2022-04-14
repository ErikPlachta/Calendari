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
  
  const [userDetails, setUserDetails] = useState({ //-- placeholder for emails later
    name_first: '',
    name_last: '',
    phone:  '',
    email: '',
    username: '',
    password: '',
    'g-recaptcha-response': '',
  });

  //-- phone validation
  function onKeyUpPhone(event){

    //-- if trying to erase, don't try to format
    if(event.key === "Backspace" || event.key === 'Delete'){ return null;}
     
    //-- extract value
     const phoneIn = event.target.value;
     
     //-- if nothing just exit
     if(!phoneIn) return;

    //-- clean it up  
    const digits = phoneIn.replace(/\D/g, '');

    //-- format it
    const formattedPhone = ('(' + digits.substring(0,3) + ')' + digits.substring(3,6) + '-' + digits.substring(6,10)); //-- without area-code
    
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

  //-- event listner on input
  const handleChange = (event) => {
    if(event.target.id != "phone_number"){ //-- this is controlled by the onKeyUpPhone functions
      setUserDetails({ ...userDetails, [event.target.name]: event.target.value,  });
    }
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
      <form id="user" className="signupCard" onSubmit={nextStep}>
        {/* {appointment_template} */}
        {(() => {
          switch("appointment_template"){
            // case "appointment_template": return "appointment_template";
            default: return (
                  <div className="clientContactForm">
                    
                    {/* CLIENT NAME */}
                    <span className="form-element">
                      <label htmlFor="name_first">First Name</label>
                      <input
                        name='name_first'
                        id="name_first"
                        type='text'
                        placeholder='First Name'
                        // required
                        autoComplete='given-name'
                        onChange={handleChange}
                        value={userDetails.name_first}
                      />
                    </span>

                    {/* CLIENT NAME */}
                    <span className="form-element">
                      <label htmlFor="name_last">Last Name</label>
                      <input
                        name='name_last'
                        id="name_last"
                        type='text'
                        placeholder='Last Name'
                        // required
                        autoComplete='family-name'
                        onChange={handleChange}
                        value={userDetails.name_last}
                      />
                    </span>

                   {/* User PHONE NUMBER */}
                   <span className="form-element">
                      <label htmlFor="phone_number">Phone Number:</label>
                      <input
                        name="phone_number"
                        id="phone_number"
                        type="tel"
                        aria-label="Please enter a valid phone number"
                        placeholder="ex. (111)-111-1111"
                        autoComplete='tel'
                        minLength="13"
                        maxLength="13"
                        // required
                        onKeyUp={onKeyUpPhone}
                        // value={userDetails.phone} //-- can't have this with how it's built throws error, but validation function requires it
                        // onChange={handleChange}
                      />
                    </span>
                    
                    {/* EMAIL ADDRESS */}
                    <span className="form-element">
                      <label htmlFor="email">Email Address</label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder='your@email.com'
                        // required
                        autoComplete="email"
                        onChange={handleChange}
                        value={userDetails.email}
                      />
                    </span>

                     {/* USERNAME */}
                     <span className="form-element">
                      <label htmlFor="username">Username</label>
                      <input
                        name='username'
                        id="username"
                        type='text'
                        placeholder='username'
                        // required
                        onChange={handleChange}
                        value={userDetails.username}
                      />
                    </span>

                    {/* USER PASSWORD */}
                    <span className="form-element">
                      <label htmlFor='password'>Password</label>
                      <input
                          placeholder="********"
                          name="password"
                          type="password"
                          id="password"
                          minLength="6"
                          autoComplete='current-password'
                          value={userDetails.password}
                          onChange={handleChange}
                      />
                    </span>

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
