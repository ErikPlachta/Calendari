//------------------------------------------------------------------------------
//-- MODULES
import React, { useEffect, useState } from 'react';
import PageNotFound from '../../../../pages/PageNotFound';



//------------------------------------------------------------------------------
/* EXPORT FUNCTION - User
  //TODO:: 04/10/22 #EP || Update this
*/
export default function BusinessSettings(businessData) {

  
  //TODO 04/10/22 #EP || Update with the logged in users data by grabbing ID from JWT and then build page with this
  const [business, setBusiness] = useState({ //-- the logged in users business
    // _id           : '',
    // name_first    : '',
    // name_last     : '',
    // email         : '',
    // date_created  : '',
    // date_login    : '',
    // business_id   : ''
  })

  const [state, setState] = useState( false );

  
  const validateParams = async (businessData) => {  //-- Determine which params are sent in and update state accordingly
    // console.log(appointmentData)
    let validRequest = false;

    //-- Grab ALL user data for business to store here
    if(businessData){ 
      setBusiness({...businessData.businessData})
    };

    //TODO:: 04/10/22 #EP || Add the logged-in users data to update the user state.
    validRequest = true;
    
    //04/10/22 #EP || Assuming valid load attempt, setting state of load as true
    setState(validRequest)
    
  }


  //-- Runs to set variables
  useEffect( () => {
    validateParams(businessData)
  },[]);

  //-- listen for changes in user values, auto-update state
  const handleChange = (event) => {
    setBusiness({ ...business, [event.target.name]: event.target.value, });
  };

  const updateUser = (event) => {
    event.preventDefault();

  }

  return (
    <section className="businessUser">  
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
      
        {/* { state()
              ? <StatusBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} /> 
              && schedulerPages[step]
              : <PageNotFound /> */}
              {(() => {
                switch(state) {    
                  case true:  return (
                    <div className="businessContainerResults">
                      <h3>
                        {business._id 
                            ? `${business.name} `
                            : <span>Empty User Value: <code>name_first</code></span>
                        }
                        - Business Settings
                      </h3>
                      {/* TODO:: 04/10/22 #EP || Map logged in user, fille in data below */}

                      <div className="businessUserStats">
                        <span>
                          Account Created:  { 
                                  business.date_created 
                                    ? business.date_created
                                    : <span>Empty User Value: <code>created_date</code> </span>
                          }
                        </span>
                        <span>
                          Last Login:  { 
                                  business.date_login
                                    ? business.date_login
                                    : <span>Empty User Value: <code>created_date</code> </span>
                          }
                        </span>
                        

                      </div>
                      
                      {/* for user to update their settings */}
                      <form id="businessSettingsForm" className="clientContactForm" onSubmit={updateUser}>
                        
                        {/* Name of the Business */}
                        <span className="form-element">
                          <label htmlFor="business-name">Business Name</label>
                          <input
                            name='name'
                            id="business-name"
                            type='text'
                            placeholder="Enter your Business Name"
                            required
                            onChange={handleChange}
                            value={business.name}
                          />
                        </span>

                        {/* Brand Name of the Business - used for URL */}
                        <span className="form-element">
                          <label htmlFor="business-brand_name">Business Brand Name</label>
                          <input
                            name='brand_name'
                            id="business-brand_name"
                            type='text'
                            placeholder="Enter your Business Brand Name"
                            required
                            onChange={handleChange}
                            value={business.brand_name}
                          />
                        </span>

                        {/* Business Welcome Message */}
                        <label htmlFor='message'>Business Scheduler Welcome Message</label>
                        <textarea
                          name='message'
                          type="textarea"
                          id='message'
                          rows='10'
                          placeholder="I'm reaching out because..."
                          required
                          value={business.welcome}
                          onChange={handleChange}
                        ></textarea>
                       
                       {/* SUBMIT BUTTON */}
                        <input
                          type="submit"
                          className="button"
                          id="contact-me-submit"
                          value="Submit"
                        />
                      </form>
                    </div>
                  )
                  case false: return <PageNotFound />;
                  //TODO::04/10/22 #EP | Add loading
                  default:    return <PageNotFound />;
                }
            })()}
    </section>
  )
}
