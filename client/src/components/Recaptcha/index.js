//------------------------------------------------------------------------------
//-- MODULES
import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";

//------------------------------------------------------------------------------
//-- FUNCTION -> Recaptcha
export default function Recaptcha(formDetails) {
    /*
        1. Takes in the specific form details state of parent
        2. Checks with Google to verify
        3. Updates the formDetails value "g-recaptcha-response" accordingly
    */
  
    //-- reference variable for the captcha result response code
    const recaptchaRef = React.createRef();  
    
    //--------------------------------------------------------------------------
    //-- return function
    return (
        <span className="form-element" id='recaptcha'>  
            <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
                value=''
                // onChange={e => (console.log(e))}
            />
    </span>
  )
};
