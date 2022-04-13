//------------------------------------------------------------------------------
//-- MODULES
import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

//------------------------------------------------------------------------------
//-- FUNCTION -> Recaptcha
export default function Recaptcha(formDetails) {
  
    //-- reference variable for the captcha result response code
    const recaptchaRef = React.createRef();  
    
    //--------------------------------------------------------------------------
    //-- return function
    return (
        <span className="form-element" id='recaptcha'>
            <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
            onChange={e => (formDetails['g-recaptcha-response']=e)}
            />
  </span>
  )
}
