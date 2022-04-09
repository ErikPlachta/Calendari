import React from 'react'



//------------------------------------------------------------------------------
//-- EXPORT FUNCTION

/* 
    Used to view an existing appointment


    ### @ErikPlachta Concept Notes 👇🏼


    #### Props `(business, appointment_id)`
    `export default function Appointment(business_id, appointment_id)`

    - `business`:       Takes business_id or business_name to validate the appointment ID
    - appointment_id:   Take appointment ID, to validate with business_id


    ---

    #### Logic _concept_

    1. **Take URL Params and run an API Call**
        1. Check for business in database
            1. business can be business_id or business_name 
        2. Check for an appointment_id in database
    2. **Evaluate Accordingly**

    ```javascript

    // if arguements not provided
      if(!business_id || !appointment_id){
        re-direct to page stating does not exist
      }

      // if business_id or business_name do not exist
      if(!business_id || !business_name) {
        re-direct to to business does not exist page
      }

      
      // if the busines_id or business_name contains the appointment ID, return page to manage
      if( ( business[business_id].appointments ) contains appointment_id || business[business_name].appointments ) contains appointment_id ){
          - return page with appointment to either verify, cancel, or re-schedule
      }
      
    //  if it got here somehow, re-route to app homepage

```
    
*/

export default function Appointment(business_id, appointment_id) {
  return (
    <div>Appointment</div>
  )
}
